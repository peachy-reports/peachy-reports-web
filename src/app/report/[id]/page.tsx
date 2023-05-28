"use client"
import React from 'react';
import Report from "@/components/report";
import {Badge} from "@chakra-ui/react";

export default async function Page() {
    return <main>
        <React.Suspense fallback={<Badge variant='outline' colorScheme='green'>
            Loading the report...
        </Badge>}>
            {/* @ts-expect-error Server Component */}
            <Report />
        </React.Suspense>
    </main>;
}