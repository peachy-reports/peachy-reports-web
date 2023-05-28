import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";

export async function GET(request: Request) {
    const response = {
        meta: {
            name: "Adidas",
            year: 2023
        },
        section_1: {
            "name":"Intro",
            content: [
                {
                    type:"paragraph",
                    text: "Short summary of what the company does"
                },
                {
                    type:"list",
                    text: "bulleted list:-one-two-three"
                },
            ]

        },
        section_2: {
            "name":"Trends",
            content: [
                {
                    type:"paragraph",
                    text: "These are the trends"
                },
                {
                    type:"paragraph",
                    text: "this is a paragraph"
                },
            ]

        },
        section_3: {
            "name":"Scope 1",
            content: [
                {
                    type:"paragraph",
                    text: "These are the trends"
                },
                {
                    type:"paragraph",
                    text: "this is a paragraph"
                },
            ]

        },
        section_4: {
            "name":"Scope 2",
            content: [
                {
                    type:"paragraph",
                    text: "These are the trends"
                },
                {
                    type:"paragraph",
                    text: "this is a paragraph"
                },
            ]

        },
        section_5: {
            "name":"Scope 3",
            content: [
                {
                    type:"paragraph",
                    text: "These are the trends"
                },
                {
                    type:"paragraph",
                    text: "this is a paragraph"
                },
            ]

        },
        section_6: {
            "name":"Pillars",
            content: [
                {
                    type:"paragraph",
                    text: "These are the trends"
                },
                {
                    type:"paragraph",
                    text: "this is a paragraph"
                },
            ]

        },
    }
    return NextResponse.json({ response });
}