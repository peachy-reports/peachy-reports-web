import { NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request: Request) {
  const inputs = await request.json();
  const model = new OpenAI({ temperature: 0.75, modelName: "gpt-4" });
  const quickModel = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

  let { data, error } = await supabase
    .from("sections")
    .select("id, header, description");
  if (error) console.error(error);

  const promises = [];

  for (let section of data || []) {
    promises.push(getSection(model, quickModel, section, inputs));
  }

  const sections = await Promise.all(promises);
  return NextResponse.json({ sections: sections });
}

async function getAnswer(
  model: OpenAI,
  question: string,
  input: string
): Promise<string> {
  const prompt = `Reword the following question, answer pair as a statement:
    Question: ${question}
    Answer: ${input}`;

  return await model.call(prompt);
}

function getCo2emissions(electricityUsedStr: string) {
  let electricityUsed = parseInt(electricityUsedStr);
  let co2emitted = electricityUsed * 2.21;
  return `${co2emitted}t CO2`;
}

async function getSection(
  model: OpenAI,
  quickModel: OpenAI,
  section: any,
  inputs: { [key: string]: string }
): Promise<string> {
  const { data: questionIds, error: error1 } = await supabase
    .from("sections_questions")
    .select("question_id")
    .eq("section_id", section.id);
  if (error1) console.error(error1);
  console.log("questionIds", questionIds);

  const { data: questions, error: error2 } = await supabase
    .from("questions")
    .select("id, question_text")
    .in("id", questionIds?.map((q) => q.question_id) || []);
  if (error2) console.error(error2);
  console.log("questions", questions);

  inputs = inputs || {
    1: "Greenie Fabrics",
    2: "shirts, socks, and shoes",
    3: "Las Vegas, NV",
    4: "faith and charity",
    5: "Biodegradable Fashion. There are a lot of child labor suppliers in the pipeline, need to avoid them. Materials extraction emits a lot of carbon into the atmosphere if not carefully sourced.",
    6: "Emit less co2",
    7: "Make sure providers are certified. Monitor facilities biannually",
    8: "12000 gallons",
    9: "propane 3k kg",
    10: "100000",
    11: "15 in Nevada, 3 in California",
    12: "All employees are encouraged with a stipend to bike to work to reduce co2",
    13: "we are the best in the west in 2022, and got the milan fashion choice award in 2021",
    14: "John Lithgow, Emma Stone, and AZ16",
    15: "Waste is handled by various local partners, sewing is by indiginous craftpeople",
  };
  const promises: Promise<string>[] = [];

  questions?.forEach((question: { id: string; question_text: string }) => {
    const id: string = question?.id;
    const input = inputs[id];
    promises.push(getAnswer(quickModel, question.question_text, input));
  });

  const answers = await Promise.all(promises);

  const prompt = `Please write a single paragragh about ${section.description}.
    This will be the entirety of the ${section.header} section in a brief sustainability report.

    Refer to the following information:
    ${answers}

    Be concise. Write simply and clearly.
    `;
  const res = await model.call(prompt);
  await supabase.from("sections").update({ body: res }).eq("id", section.id);
  return res;
}
