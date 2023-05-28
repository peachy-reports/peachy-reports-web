import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";
import { supabase } from "../../../lib/supabaseClient";

export async function GET(request: Request) {
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-4' });
    const quickModel = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });

    const questions = ["What does your company make?", "How old is your company?"];
    const inputs = ["shirts, socks, and shoes", "3 years old"];
    const promises = [];
    const section = { header: "Introduction", description: "Short summary of what the company makes, what the company does, where it's based." }

    let qq = await supabase.from('questions').select()
    console.log(qq);

    for (const i of Array.from(questions.keys())) {
        promises.push(getAnswer(quickModel, questions[i], inputs[i]))
        console.log(i);
      }

    const answers = await Promise.all(promises);

    const prompt = `You are a business executive with a fresh, breezy conversational but also professional tone.

    Please write a single section of a sustainability report.
    This section is called ${section.header}
    Here's what the section is about: ${section.description}

    Include the following information:
    ${answers}

    Write in the style of David Gelles
    `;
    const res =  await model.call(prompt);

    return NextResponse.json({ answers: answers, response: res });
}

async function getAnswer(model: OpenAI, question: string, input: string): Promise<string> {
    const prompt = `Reword the following question, answer pair as a statement:
    Question: ${question}
    Answer: ${input}`;

    return await model.call(prompt);
}
