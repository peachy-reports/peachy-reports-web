import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";
import report from "@/mock/report";

export async function GET(request: Request) {

    return NextResponse.json({ response: report });
}