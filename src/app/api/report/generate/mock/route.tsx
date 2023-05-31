import { NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";

export async function GET(request: Request) {
  console.log("start");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("one");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("two");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("three");
  return NextResponse.json({ response: "ok" });
}
