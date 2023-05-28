import {supabase} from "@/lib/supabaseClient";

import { NextResponse } from 'next/server';
import report from "@/mock/report";

export async function GET(request: Request) {
    let { data, error } = await supabase.from('sections').select('id, header, description, body').order('id', { ascending: true });
    if (error) console.error(error);
    console.log("data", data);

    return NextResponse.json({ response: data });
}