export type CallState =
  | "DIALING" | "RINGING" | "IVR" | "HOLD" | "ASSESSING"
  | "HUMAN_DETECTED" | "AI_SPEAKING" | "USER_SUMMONED"
  | "USER_LISTENING" | "USER_IN_CONTROL" | "VERIFICATION_REQUIRED" | "COMPLETED";

export interface CallRecord {
  id: string;
  company: string;
  problem: string;
  date: string;
  status: "Completed" | "Needs you" | "Waiting" | "Failed";
}

export const recentCalls: CallRecord[] = [
  { id: "zom-48291", company: "Zomato", problem: "Delivery delay", date: "Today, 11:42 AM", status: "Completed" },
  { id: "amz-17403", company: "Amazon", problem: "Refund not received", date: "Yesterday, 4:18 PM", status: "Needs you" },
  { id: "isp-90218", company: "Airtel", problem: "Double charge", date: "18 Sep, 9:10 AM", status: "Completed" },
  { id: "swg-11824", company: "Swiggy", problem: "Missing item", date: "16 Sep, 7:34 PM", status: "Waiting" },
  { id: "flt-66210", company: "IndiGo", problem: "Cancellation refund", date: "11 Sep, 2:06 PM", status: "Failed" },
];

export const callStateCopy: Record<CallState, { label: string; detail: string; mode: "pulse" | "calm" | "voice" | "listen" }> = {
  DIALING: { label: "CONNECTING", detail: "Calling Zomato…", mode: "pulse" },
  RINGING: { label: "RINGING", detail: "Waiting for Zomato to answer", mode: "pulse" },
  IVR: { label: "NAVIGATING IVR", detail: "Finding the right department", mode: "voice" },
  HOLD: { label: "ON HOLD", detail: "Waiting for a representative", mode: "calm" },
  ASSESSING: { label: "ASSESSING", detail: "Checking who’s on the line", mode: "listen" },
  HUMAN_DETECTED: { label: "HUMAN DETECTED", detail: "A representative is on the line", mode: "listen" },
  AI_SPEAKING: { label: "AI SPEAKING", detail: "Saathi is speaking", mode: "voice" },
  USER_SUMMONED: { label: "NEEDS YOU", detail: "Saathi is bringing you into the call", mode: "pulse" },
  USER_LISTENING: { label: "YOU’RE LISTENING", detail: "Saathi is continuing the conversation", mode: "listen" },
  USER_IN_CONTROL: { label: "YOU’RE IN CONTROL", detail: "Saathi is listening silently", mode: "voice" },
  VERIFICATION_REQUIRED: { label: "VERIFICATION REQUIRED", detail: "An OTP was requested", mode: "calm" },
  COMPLETED: { label: "CALL COMPLETE", detail: "The call has ended", mode: "calm" },
};

export const simulatedSequence: CallState[] = ["DIALING", "RINGING", "IVR", "HOLD", "ASSESSING", "HUMAN_DETECTED"];

export function parseMandate(value: string) {
  const lower = value.toLowerCase();
  const amount = value.match(/₹\s?([\d,]+)|(?:rs\.?|inr)\s?([\d,]+)/i)?.slice(1).find(Boolean);
  const vague = /whatever|anything|reasonable|best|as you see fit|up to you/i.test(value);
  return {
    valid: value.trim().length >= 12 && !vague && (/refund|redeliver|replacement|credit/i.test(lower)) && Boolean(amount || /redeliver|replacement/i.test(lower)),
    refund: /refund/i.test(lower),
    amount: amount ? `Up to ₹${amount}` : undefined,
    redelivery: /redeliver|redelivery|replacement/i.test(lower),
    storeCredit: /store credit|credit/i.test(lower),
  };
}

export function saveDraft(key: "problem" | "mandate", value: string) {
  if (typeof window !== "undefined") sessionStorage.setItem(`saathi:${key}`, value);
}

export function loadDraft(key: "problem" | "mandate", fallback: string) {
  if (typeof window === "undefined") return fallback;
  return sessionStorage.getItem(`saathi:${key}`) || fallback;
}