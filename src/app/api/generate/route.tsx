import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";

export async function GET(request: Request) {
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-4' });
    const res = await model.call(
        "What would be a good company name a company that makes colorful socks?"
      );
      console.log(res);
    return NextResponse.json({ response: res });
}