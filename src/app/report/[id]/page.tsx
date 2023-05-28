"use client"
import {Main} from "next/document";
import React from 'react';

export default async function Page() {
    return <main>
        <React.Suspense fallback={<p>Fast component loading...</p>}>
            <Main />
        </React.Suspense>
    </main>;
}