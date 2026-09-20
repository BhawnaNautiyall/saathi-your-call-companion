import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProblemInput, RecentCalls } from "@/components/saathi";
import { saveDraft } from "@/lib/saathi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saathi — Let Saathi handle the call" },
      {
        name: "description",
        content:
          "Tell Saathi what went wrong. It will call, wait on hold, and bring you in when needed.",
      },
      { property: "og:title", content: "Saathi — Let Saathi handle the call" },
      { property: "og:description", content: "A calm AI voice agent for customer-service calls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8 md:pt-24">
      <section className="mx-auto max-w-4xl">
        <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          Your call, handled
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">
          Let Saathi handle the call.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Tell us what went wrong. Saathi will call, wait on hold, and bring you in when you’re
          needed.
        </p>
        <div className="mt-10">
          <ProblemInput
            onContinue={(value) => {
              saveDraft("problem", value);
              navigate({ to: "/understanding" });
            }}
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="text-foreground">Try:</span> “My Zomato order was two hours late and I
          was charged the full price.”
        </p>
      </section>
      <section className="mx-auto mt-24 max-w-5xl" aria-labelledby="recent-heading">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              ACTIVITY
            </p>
            <h2 id="recent-heading" className="mt-2 text-2xl font-semibold">
              Recent calls
            </h2>
          </div>
          <a href="/calls" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>
        <RecentCalls limit={3} />
      </section>
    </main>
  );
}
