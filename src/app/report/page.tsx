"use client"
import { useRouter } from 'next/navigation';
export default function Report() {
    const router = useRouter();
    console.log(router, "ricky");
  return (
    <main>
        <h1>Report</h1>
        <h2>Section 1</h2>
    </main>
  )
}
