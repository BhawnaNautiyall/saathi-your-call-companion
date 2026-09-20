import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  CallControls,
  CallStatus,
  CallTimeline,
  CallVisualizer,
  PageFrame,
  useCallSimulation,
} from "@/components/saathi";

export const Route = createFileRoute("/call")({
  head: () => ({
    meta: [
      { title: "Live call with Zomato — Saathi" },
      { name: "description", content: "Follow Saathi's simulated live customer-service call." },
      { property: "og:title", content: "Live call — Saathi" },
      { property: "og:description", content: "See every call state and take control at any time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Call,
});
function Call() {
  const { state, setState, elapsed } = useCallSimulation();
  const human = state === "HUMAN_DETECTED";
  return (
    <PageFrame>
      <div className="grid min-h-[calc(100vh-12rem)] items-center gap-10 lg:grid-cols-[17rem_1fr_17rem]">
        <aside className="order-2 rounded-lg border border-border bg-surface-soft p-5 lg:order-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">CALLING</p>
          <p className="mt-3 font-semibold">Zomato</p>
          <p className="mt-1 text-sm text-muted-foreground">Delivery issue · Order #4471</p>
          <div className="my-5 h-px bg-border" />
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
            AUTHORIZED
          </p>
          <p className="mt-3 text-sm leading-relaxed">Refund up to ₹500, or redelivery.</p>
        </aside>
        <section className="order-1 flex flex-col items-center lg:order-2">
          <CallStatus state={state} elapsed={elapsed} />
          <CallVisualizer state={state} />
          <CallControls state={state} onState={setState} />
          {human && (
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Button variant="ghost" onClick={() => setState("IVR")}>
                Not a person
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/handoff">Open handoff view</Link>
              </Button>
            </div>
          )}
          <div className="mt-5 flex gap-2 text-xs text-muted-foreground">
            <Button variant="ghost" size="sm" onClick={() => setState("VERIFICATION_REQUIRED")}>
              Simulate OTP request
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setState("COMPLETED")}>
              End call
            </Button>
          </div>
        </section>
        <aside className="order-3 rounded-lg border border-border bg-surface-soft p-5">
          <p className="mb-5 text-xs font-semibold tracking-[0.16em] text-muted-foreground">
            LIVE ACTIVITY
          </p>
          <CallTimeline state={state} />
        </aside>
      </div>
    </PageFrame>
  );
}
