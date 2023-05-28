import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request: Request) {

    const inputs = await request.json();
    console.log("gangly");
    console.log(inputs)

    const quickModel = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });

    let { data: questions, error } = await supabase.from('questions').select('id, question_text');
    if (error) console.error(error);
    console.log("data", questions);

    const promises = [];

    for (let question of questions || []) {
        const input = inputs[question.id]
        promises.push(getAnswer(quickModel, question.question_text, input));
    }

    const answers = await Promise.all(promises);
    answers.push(getCo2emissions(inputs["10"]));
    return NextResponse.json({ answers: answers });
}

async function getAnswer(model: OpenAI, question: string, input: string): Promise<string> {
    const prompt = `Reword the following question, answer pair as a statement:
    Question: ${question}
    Answer: ${input}`;

    return await model.call(prompt);
}

function getCo2emissions(electricityUsedStr: string) {
    let electricityUsed = parseInt(electricityUsedStr)
    let co2emitted = electricityUsed * 2.21
    return `${co2emitted}t CO2`;
}