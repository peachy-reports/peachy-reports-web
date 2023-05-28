"use client"
import React, {useEffect, useState} from "react";
import { useParams } from 'next/navigation';

async function Report() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    console.log(params, "for now");

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

export default Report;