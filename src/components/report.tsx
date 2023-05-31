"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReportContent from "@/components/report.content";
import { Badge } from "@chakra-ui/react";

async function Report() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    fetch("/api/report/sections", { cache: "force-cache" })
      .then((res) => res.json())
      .then((data) => {
        setError(data.error);
        setData(data.response);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Badge variant="outline" colorScheme="purple">
        Loading Page...
      </Badge>
    );

  return (
    <div>
      {error && <div>Something bad happened</div>}
      {data && <ReportContent results={data} />}
    </div>
  );
}

export default Report;
