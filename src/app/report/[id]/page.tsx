"use client"
import { useParams } from 'next/navigation';
import React, {useEffect, useState} from "react";

async function Quote() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch('/api/report/generate/123', { cache: 'force-cache' })
            .then((res) => res.json())
            .then((data) => {
                console.log("once!");
                setError(data.error)
                setData(data.response)
                setLoading(false)
            })
    }, []);
    
    if (loading) return (
        <div>Starting Generation</div>
    )

    return (
        <div>
            {error && <div>Something bad happened</div>}
            {data && <div>
                {data?.meta?.name}
            </div>}
            <p>Sure!!!</p>
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