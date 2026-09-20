import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageFrame, UnderstandingCard } from "@/components/saathi";

export const Route = createFileRoute("/understanding")({
  head: () => ({ meta: [{ title: "Review request — Saathi" }, { name: "description", content: "Review what Saathi understood before the call." }, { property: "og:title", content: "Review request — Saathi" }, { property: "og:description", content: "Confirm the company, issue, and goal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: Understanding,
});
function Understanding() { return <PageFrame narrow><Eyebrow>Step 1 of 2 · Understanding</Eyebrow><h1 className="text-4xl font-semibold md:text-5xl">Here’s what I understood</h1><p className="mt-4 text-lg text-muted-foreground">Check the details before Saathi prepares the call.</p><div className="mt-10"><UnderstandingCard /></div><h2 className="mt-8 text-lg font-medium">Is this correct?</h2><div className="mt-4 flex gap-3"><Button variant="outline" size="xl" asChild><Link to="/">Edit</Link></Button><Button variant="premium" size="xl" className="flex-1" asChild><Link to="/permission">Looks good</Link></Button></div></PageFrame>; }