import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, MandateEditor, PageFrame } from "@/components/saathi";

export const Route = createFileRoute("/permission")({
  head: () => ({
    meta: [
      { title: "Set call permissions — Saathi" },
      {
        name: "description",
        content: "Set explicit limits for what Saathi may agree to on this call.",
      },
      { property: "og:title", content: "Set call permissions — Saathi" },
      { property: "og:description", content: "You decide exactly what Saathi may accept." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Permission,
});
function Permission() {
  return (
    <PageFrame narrow>
      <Eyebrow>Step 2 of 2 · Permission</Eyebrow>
      <h1 className="text-4xl font-semibold md:text-5xl">What can Saathi agree to?</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Give Saathi permission for this call. You stay in control.
      </p>
      <div className="mt-10">
        <MandateEditor initial="Accept a refund up to ₹500, or a redelivery if they can't refund." />
      </div>
    </PageFrame>
  );
}
