
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState("");

    useEffect(() => {
        fetch(url, { cache: 'force-cache' })
            .then((res) => res.json())
            .then((data) => {
                seterror(data.error)
                setdata(data.response)
                setloading(false)
            })
    }, [url]);

    return { data, loading, error };
};

export default useFetch;