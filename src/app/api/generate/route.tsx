import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";
import { supabase } from "../../../lib/supabaseClient";

export async function GET(request: Request) {
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-4' });
    const simpleModel = new OpenAI({ temperature: 0, modelName: 'gpt-4' });

    const questions = ["What does your company make?", "How old is your company?"];
    const inputs = ["shirts, socks, and shoes", "3 years old"];
    const promises = [];

    for (const i of Array.from(questions.keys())) {
        promises.push(getAnswer(model, questions[i], inputs[i]))
        console.log(i);
      }

    const answers = await Promise.all(promises);

    return NextResponse.json({ response: answers });
}

async function getAnswer(model: OpenAI, question: string, input: string): Promise<string> {
    const prompt = `Reword the following question, answer pair as a statement:
    Question: ${question}
    Answer: ${input}`;

    return await model.call(prompt);
}
