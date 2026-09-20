import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFrame, VerificationCard } from "@/components/saathi";

export const Route = createFileRoute("/verification")({
  head: () => ({
    meta: [
      { title: "Verification required — Saathi" },
      { name: "description", content: "Securely take over when authentication is required." },
      { property: "og:title", content: "Saathi needs you" },
      {
        property: "og:description",
        content: "A representative requested sensitive authentication.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Verification,
});
function Verification() {
  return (
    <PageFrame narrow>
      <p className="text-xs font-semibold tracking-[0.18em] text-warning">SECURE HANDOFF</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Saathi needs you.</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The call is still connected. Take over when you’re ready.
      </p>
      <div className="mt-10">
        <VerificationCard />
      </div>
      <Button variant="premium" size="xl" className="mt-7 w-full" asChild>
        <Link to="/call">
          <PhoneCall />
          Take Over Call
        </Link>
      </Button>
    </PageFrame>
  );
}
