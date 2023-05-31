"use client";
import { useRouter } from "next/navigation";
export default function Report() {
  const router = useRouter();
  console.log(router, "ricky");
  return (
    <main>
      <h1>Sustainability Report</h1>
      <h2>hello faye</h2>
    </main>
  );
}
