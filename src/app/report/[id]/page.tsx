"use client"
import { useParams } from 'next/navigation';
export default function Report() {
    const params = useParams();
    console.log(params, "ricky");
  return (
    <main>
        <h1>Report</h1>
        <p>id: {params.id}</p>
        <h2>Section 1</h2>
    </main>
  )
}
