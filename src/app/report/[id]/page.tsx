"use client"
import { useParams } from 'next/navigation';
import React from "react";
import useFetch from "@/app/report/[id]/hooks/useFetch";

async function getData() {
    const res = await fetch('/api/report/generate/123');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function Quote() {
    const { data, loading, error } = useFetch('/api/report/generate/123');

    if (loading) return (
        <div>Starting Generation</div>
    )

    return (
        <div>
            {error && <div>Something bad happened</div>}
            {data && <div>
                {data?.meta?.name}
            </div>}
            <p>done!!</p>
        </div>
    );
}

export default async function Page() {
    return <main>
        <React.Suspense fallback={<p>Fast component loading...</p>}>
            <Quote />
        </React.Suspense>
    </main>;
}