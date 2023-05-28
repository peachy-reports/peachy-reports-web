"use client"
import React from 'react';
import Report from "@/components/report";

export default async function Page() {
    return <main>
        <React.Suspense fallback={<p>Fast component loading...</p>}>
            {/* @ts-expect-error Server Component */}
            <Report />
        </React.Suspense>
    </main>;
}