import {supabase} from "@/lib/supabaseClient";

import { NextResponse } from 'next/server';
import report from "@/mock/report";

export async function GET(request: Request) {
    const { error } = await supabase
        .from('sections')
        .update({ body: '' })
        .neq('body', null)
    if (error) console.error(error);
    const data = error || "OK"

    return NextResponse.json({ response: data });
}