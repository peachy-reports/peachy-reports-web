"use client"
import { useParams } from 'next/navigation';
import React, {useEffect, useState} from "react";

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
    // const { data, loading, error } = useFetch('/api/report/generate/123');
    const [data, setData] = useState(null);
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