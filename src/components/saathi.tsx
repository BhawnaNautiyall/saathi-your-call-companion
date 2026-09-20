import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  Check,
  ChevronRight,
  CircleAlert,
  Ear,
  Mic,
  Phone,
  PhoneCall,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  callStateCopy,
  type CallRecord,
  type CallState,
  parseMandate,
  recentCalls,
  saveDraft,
  simulatedSequence,
} from "@/lib/saathi";

export function PageFrame({
  children,
  narrow = false,
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <main
      className={`mx-auto min-h-[calc(100vh-4rem)] w-full px-5 py-10 md:px-8 md:py-16 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}
    >
      {children}
    </main>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{children}</p>
  );
}

export function ProblemInput({
  initial = "",
  onContinue,
}: {
  initial?: string;
  onContinue: (value: string) => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="glass-panel rounded-lg p-3 md:p-4">
      <label htmlFor="problem" className="sr-only">
        Describe what you need help with
      </label>
      <Textarea
        id="problem"
        autoFocus
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Tell Saathi what you need help with..."
        className="min-h-36 resize-none border-0 bg-transparent p-3 text-lg shadow-none focus-visible:ring-0 md:min-h-40 md:p-5 md:text-xl"
      />
      <div className="flex items-center justify-between gap-4 border-t border-border px-2 pt-3 md:px-4">
        <span className="hidden text-xs text-muted-foreground sm:block">
          Describe it in your own words
        </span>
        <Button
          variant="premium"
          size="xl"
          disabled={!value.trim()}
          onClick={() => onContinue(value)}
          className="ml-auto"
        >
          Continue <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

const statusStyle: Record<CallRecord["status"], string> = {
  Completed: "bg-success/10 text-success border-success/20",
  "Needs you": "bg-warning/10 text-warning border-warning/20",
  Waiting: "bg-primary/10 text-primary border-primary/20",
  Failed: "bg-destructive/10 text-destructive border-destructive/20",
};

export function CallHistoryCard({ call }: { call: CallRecord }) {
  return (
    <Link
      to="/summary"
      aria-label={`Open ${call.company} call summary`}
      className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[1.2fr_1.5fr_1fr_auto]"
    >
      <div>
        <p className="font-semibold">{call.company}</p>
        <p className="mt-1 text-sm text-muted-foreground md:hidden">{call.problem}</p>
      </div>
      <p className="hidden text-sm text-muted-foreground md:block">{call.problem}</p>
      <p className="hidden text-sm text-muted-foreground md:block">{call.date}</p>
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle[call.status]}`}
        >
          {call.status}
        </span>
        <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function UnderstandingCard() {
  const rows = [
    ["Company", "Zomato"],
    ["Issue", "Delivery arrived 2 hours late"],
    ["Goal", "Request compensation"],
    ["Order", "#4471"],
  ];
  return (
    <Card className="glass-panel overflow-hidden">
      <div className="divide-y divide-border">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-5 py-5 sm:grid-cols-[9rem_1fr] md:px-7">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PermissionBadge({
  allowed,
  title,
  detail,
}: {
  allowed: boolean;
  title: string;
  detail?: string | undefined;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span
        className={`mt-0.5 flex size-5 items-center justify-center rounded-full ${allowed ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}
      >
        {allowed ? <Check className="size-3" /> : <X className="size-3" />}
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        {detail && <p className="mt-0.5 text-sm text-muted-foreground">{detail}</p>}
      </div>
    </div>
  );
}

export function MandateCard({ value }: { value: string }) {
  const mandate = parseMandate(value);
  return (
    <Card className="glass-panel p-5 md:p-6">
      <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground">
        SAATHI CAN AGREE TO
      </p>
      <PermissionBadge allowed={mandate.refund} title="Refund" detail={mandate.amount} />
      <PermissionBadge allowed={mandate.redelivery} title="Redelivery" />
      <PermissionBadge allowed={mandate.storeCredit} title="Store credit" />
      <PermissionBadge allowed={false} title="Anything else" />
    </Card>
  );
}

export function CallVisualizer({ state }: { state: CallState }) {
  const reduce = useReducedMotion();
  const mode = callStateCopy[state].mode;
  const bars = useMemo(
    () => Array.from({ length: 17 }, (_, index) => 24 + ((index * 19) % 62)),
    [],
  );
  return (
    <div
      className="relative flex aspect-square w-[min(66vw,22rem)] items-center justify-center"
      aria-hidden="true"
    >
      {mode === "pulse" && (
        <motion.div
          className="absolute inset-10 rounded-full border border-primary/40"
          animate={reduce ? false : { scale: [0.88, 1.13], opacity: [0.55, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div className="absolute inset-14 rounded-full border border-primary/20 bg-primary/5 shadow-[0_0_100px_var(--glow)]" />
      <div className="relative flex h-24 items-center gap-1.5">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            className="w-1 rounded-full bg-primary"
            style={{ height: `${height}%` }}
            animate={
              reduce
                ? false
                : {
                    scaleY: mode === "calm" ? [0.3, 0.5, 0.3] : [0.35, 1, 0.35],
                    opacity: [0.45, 1, 0.45],
                  }
            }
            transition={{
              duration: mode === "voice" ? 0.75 : 1.8,
              repeat: Infinity,
              delay: index * 0.045,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function CallStatus({ state, elapsed }: { state: CallState; elapsed: number }) {
  const copy = callStateCopy[state];
  const time = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  return (
    <div className="text-center" aria-live="polite">
      <p className="text-xs font-bold tracking-[0.2em] text-primary">{copy.label}</p>
      <h1 className="mt-3 text-2xl font-semibold md:text-3xl">{copy.detail}</h1>
      <p className="mt-3 font-mono text-sm tabular-nums text-muted-foreground">{time}</p>
    </div>
  );
}

export function CallTimeline({ state }: { state: CallState }) {
  const steps = [
    "Call connected",
    "Navigated to order support",
    "Waiting on hold",
    "Listening for representative",
  ];
  const active = Math.min(3, Math.max(0, simulatedSequence.indexOf(state) - 1));
  return (
    <ol className="space-y-3" aria-label="Call activity">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3 text-sm">
          <span
            className={`flex size-5 items-center justify-center rounded-full border ${index < active ? "border-success/40 bg-success/10 text-success" : index === active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
          >
            {index < active ? (
              <Check className="size-3" />
            ) : (
              <span className="size-1.5 rounded-full bg-current" />
            )}
          </span>
          <span className={index <= active ? "text-foreground" : "text-muted-foreground"}>
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function CallControls({
  state,
  onState,
}: {
  state: CallState;
  onState: (state: CallState) => void;
}) {
  const human = ["HUMAN_DETECTED", "AI_SPEAKING", "USER_LISTENING", "USER_IN_CONTROL"].includes(
    state,
  );
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button variant="call" size="call" onClick={() => onState("USER_LISTENING")}>
        <Ear />
        Listen
      </Button>
      {human && (
        <Button variant="call" size="call" onClick={() => onState("AI_SPEAKING")}>
          <Mic />
          Join
        </Button>
      )}
      {human && (
        <Button variant="premium" size="call" onClick={() => onState("USER_IN_CONTROL")}>
          <PhoneCall />
          Take Over
        </Button>
      )}
    </div>
  );
}

export function HumanDetectedCard() {
  return (
    <Card className="glass-panel p-6 md:p-8">
      <div className="mb-7 flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
        <UserRound />
      </div>
      <h2 className="text-2xl font-semibold">Someone is on the line.</h2>
      <p className="mt-2 text-muted-foreground">
        Saathi detected a customer-service representative.
      </p>
      <div className="my-7 border-y border-border py-5">
        <p className="font-medium">Zomato Customer Support</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-success">
          <span className="size-2 rounded-full bg-success" />
          Representative detected
        </p>
      </div>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="size-2 rounded-full bg-primary" />
        Saathi is continuing the conversation.
      </p>
    </Card>
  );
}

export function VerificationCard() {
  return (
    <Card className="glass-panel p-6 md:p-8">
      <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ShieldCheck />
      </div>
      <p className="text-xs font-semibold tracking-[0.18em] text-primary">AN OTP WAS REQUESTED</p>
      <h2 className="mt-3 text-2xl font-semibold">
        The representative needs information that Saathi cannot provide.
      </h2>
      <div className="mt-7 flex gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-warning" />
        <p>
          Saathi never has access to your OTP, PIN, CVV, password, date of birth, card details, or
          other authentication credentials.
        </p>
      </div>
    </Card>
  );
}

export function CallSummary() {
  const rows = [
    ["OFFERED", "₹200 credit or redelivery"],
    ["RESULT", "Waiting for your decision"],
    ["REFERENCE", "ZOM-48291"],
    ["REPRESENTATIVE", "Rahul"],
    ["NEXT STEP", "Choose between the credit and redelivery"],
  ];
  return (
    <Card className="glass-panel overflow-hidden">
      <div className="border-b border-border p-6 md:p-8">
        <p className="text-sm text-muted-foreground">Zomato</p>
        <h2 className="mt-2 text-xl font-semibold">Order arrived 2 hours late</h2>
      </div>
      <dl className="divide-y divide-border">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-2 px-6 py-5 sm:grid-cols-[10rem_1fr] md:px-8">
            <dt className="text-xs font-semibold tracking-[0.15em] text-muted-foreground">
              {label}
            </dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export function RecentCalls({ limit }: { limit?: number }) {
  const calls = typeof limit === "number" ? recentCalls.slice(0, limit) : recentCalls;
  return (
    <div>
      {calls.map((call) => (
        <CallHistoryCard key={call.id} call={call} />
      ))}
    </div>
  );
}

export function useCallSimulation() {
  const navigate = useNavigate();
  const [state, setState] = useState<CallState>("DIALING");
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((time) => time + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const index = simulatedSequence.indexOf(state);
    if (index < 0 || index === simulatedSequence.length - 1) return;
    const delay = state === "HOLD" ? 5000 : 2600;
    const nextState = simulatedSequence[index + 1];
    if (!nextState) return;
    const timer = window.setTimeout(() => setState(nextState), delay);
    return () => window.clearTimeout(timer);
  }, [state]);
  useEffect(() => {
    if (state === "VERIFICATION_REQUIRED") navigate({ to: "/verification" });
    if (state === "COMPLETED") navigate({ to: "/summary" });
  }, [navigate, state]);
  return { state, setState, elapsed };
}

export function MandateEditor({ initial }: { initial: string }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initial);
  const [attempted, setAttempted] = useState(false);
  const parsed = parseMandate(value);
  const submit = () => {
    setAttempted(true);
    if (parsed.valid) {
      saveDraft("mandate", value);
      navigate({ to: "/call" });
    }
  };
  return (
    <>
      <label htmlFor="mandate" className="mb-3 block text-sm font-medium">
        Your permission for this call
      </label>
      <Textarea
        id="mandate"
        autoFocus
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setAttempted(false);
        }}
        className="min-h-28 resize-none bg-surface-soft p-4 text-base"
      />
      {attempted && !parsed.valid && (
        <p role="alert" className="mt-3 flex gap-2 text-sm text-warning">
          <CircleAlert className="size-4 shrink-0" />
          Please name a specific action and, for refunds or credits, a clear limit.
        </p>
      )}
      <div className="mt-5">
        <MandateCard value={value} />
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" />
        This permission applies only to this call. Saathi cannot expand it.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" size="xl" asChild>
          <Link to="/understanding">Back</Link>
        </Button>
        <Button variant="premium" size="xl" className="flex-1" onClick={submit}>
          <Phone className="size-4" />
          Confirm & Call
        </Button>
      </div>
    </>
  );
}
