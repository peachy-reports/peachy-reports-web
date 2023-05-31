"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// realtime subscriptions need to be set up client-side
// this component takes initial sections as props and automatically
// updates when new sections are updated in Supabase's `sections` table
export default function RealtimeSections({
  serverSections,
}: {
  serverSections: any;
}) {
  const [sections, setSections] = useState(serverSections);

  useEffect(() => {
    // this overwrites `sections` any time the `serverSections` prop changes
    // this happens when the parent Server Component is re-rendered
    setSections(serverSections);
  }, [serverSections]);

  useEffect(() => {
    // ensure you have enabled replication on the `sections` table
    // https://app.supabase.com/project/_/database/replication
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "sections" },
        (payload) =>
          setSections((sections: any) => {
            const otherSections = sections.filter(
              (section: any) => section.id !== payload.new.id
            );
            if (!payload.new.body) {
              return otherSections;
            } else {
              return [...otherSections, payload.new];
            }
          })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverSections]);

  return <pre>{JSON.stringify(sections, null, 2)}</pre>;
}
