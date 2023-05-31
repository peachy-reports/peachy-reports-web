"use client"
import { supabase } from "../../lib/supabaseClient";
import RealtimeSections from "./realtime-sections";

// do not cache this page
export const revalidate = 0;

// this component fetches the current sections server-side
// and subscribes to new sections client-side
export default async function Page() {
  const { data } = await supabase.from("sections").select("*").order("id", { ascending: true});

  // data can be passed from server components to client components
  // this allows us to fetch the initial sections before rendering the page
  // our <RealtimeSections /> component will then subscribe to new sections client-side
  return <RealtimeSections serverSections={data} />;
}
