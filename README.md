# Saathi: Your Call Companion

Build a polished, production-quality web application called "Saathi".

Saathi is an AI voice agent that handles customer-service phone calls on behalf of a user.

CORE PRODUCT IDEA

The user should be able to type a natural-language problem such as:

"My Zomato order was two hours late and they charged me the full price."

Saathi understands the problem, determines the relevant company/problem playbook, asks the user what authority Saathi has to settle the issue, and then makes the call.

During the call Saathi:

- navigates IVR menus

- waits on hold

- detects when a real human representative answers

- informs the representative that it is an AI assistant calling for the customer

- can continue speaking while the user is away

- calls/summons the user when human interaction is needed

- allows the user to Listen, Join, or Take Over

- can accept an offer only if the user explicitly authorized that type of action

- must always hand the call to the user for sensitive authentication such as OTP, PIN, CVV, password, date of birth, card details, etc.

- provides a clear call summary at the end

IMPORTANT:

This is initially a frontend prototype. Do NOT implement real phone calls yet.

Use realistic simulated data and simulated call states, but structure the code so LiveKit can be integrated later.

DESIGN DIRECTION

Use the visual language of a premium modern voice-AI product.

Inspiration:

- dark interface

- large expressive typography

- minimal layout

- subtle blue accent

- glowing/animated voice visualization

- elegant glass/soft-border cards

- smooth but restrained animations

- strong visual hierarchy

- lots of breathing room

- premium rather than "cyberpunk"

- trustworthy rather than playful

The UI should feel like:

"Calm AI control center + premium voice assistant"

Avoid:

- generic admin dashboard layouts

- excessive charts

- excessive gradients

- excessive neon

- clutter

- overly rounded childish cards

- unnecessary animations

- generic ChatGPT clone styling

COLOR SYSTEM

Primary background:

near-black / very dark navy

Surface:

slightly lighter dark navy/black

Primary text:

off-white

Secondary text:

muted gray

Accent:

soft electric blue

Success:

subtle green

Warning:

amber

Danger:

red

Use the accent color sparingly.

TYPOGRAPHY

Use a modern clean sans-serif such as Inter, Geist, or a similar premium UI font.

Use large typography for major headings.

Keep body text highly readable.

APPLICATION STRUCTURE

Create these main screens/routes:

1. HOME

2. UNDERSTANDING

3. PERMISSION / MANDATE

4. CALL

5. HUMAN DETECTED / HANDOFF

6. VERIFICATION REQUIRED

7. CALL SUMMARY

8. CALL HISTORY

GLOBAL NAVIGATION

Keep navigation minimal.

Logo:

SAATHI

Navigation:

Home

Calls

User profile/settings on the right.

On mobile, use a compact navigation.

-----------------------------------

SCREEN 1 — HOME

-----------------------------------

The home screen should immediately communicate what Saathi does.

Hero heading:

"Let Saathi handle the call."

Supporting text:

"Tell us what went wrong. Saathi will call, wait on hold, and bring you in when you’re needed."

Main interaction:

A large natural-language input box.

Placeholder:

"Tell Saathi what you need help with..."

Example text beneath:

"My Zomato order was two hours late and I was charged the full price."

Primary CTA:

"Continue"

Do NOT make the user fill a long form.

The entire point is natural-language input.

Below the input, show a subtle section:

"Recent calls"

with a few example call cards.

Example:

Zomato

Delivery delay

Completed

Amazon

Refund not received

Needs you

ISP

Double charge

Completed

-----------------------------------

SCREEN 2 — UNDERSTANDING

-----------------------------------

After the user enters the problem, show:

"Here's what I understood"

Display a clean card:

Company

Zomato

Issue

Delivery arrived 2 hours late

Goal

Request compensation

Order

#4471

Add:

"Is this correct?"

Buttons:

"Edit"

"Looks good"

This screen should make the user confident that Saathi understood the request before calling.

-----------------------------------

SCREEN 3 — PERMISSION / MANDATE

-----------------------------------

This is one of the most important screens.

Heading:

"What can Saathi agree to?"

Explain:

"Give Saathi permission for this call. You stay in control."

Provide a natural-language permission input.

Example:

"Accept a refund up to ₹500, or a redelivery if they can't refund."

Then visually translate it into explicit permissions.

Example card:

SAATHI CAN AGREE TO

✓ Refund

  Up to ₹500

✓ Redelivery

✕ Store credit

✕ Anything else

Below:

"This permission applies only to this call."

Important UX:

Make it extremely clear that Saathi cannot expand these permissions itself.

If the user enters something vague such as:

"Accept whatever is reasonable"

show an error asking them to specify a clear limit/action.

Primary CTA:

"Confirm & Call"

Secondary:

"Back"

-----------------------------------

SCREEN 4 — CALL

-----------------------------------

This is the centerpiece of the application.

Create a beautiful immersive live-call interface.

Do NOT make this look like a normal phone dialer.

Center the page around a dynamic voice visualization / waveform / orb.

Top:

SAATHI

Zomato · Delivery issue

Live call timer:

04:37

Show the current state prominently.

Possible states:

CONNECTING

"Calling Zomato..."

NAVIGATING IVR

"Finding the right department"

ON HOLD

"Waiting for a representative"

"4 min 37 sec"

ASSESSING

"Checking who's on the line"

AI SPEAKING

"Saathi is speaking"

HUMAN DETECTED

"A representative is on the line"

The visualization should change subtly depending on state.

For example:

- connecting → subtle pulsing

- speaking → animated waveform

- listening → slower movement

- on hold → calm minimal animation

Below the visualization show a compact activity timeline:

✓ Call connected

✓ Navigated to order support

✓ Waiting on hold

● Listening for representative

Keep this visually minimal.

Bottom controls:

[ Listen ]

When a human is detected, show:

[ Listen ]

[ Join ]

[ Take Over ]

Also provide:

"Not a person"

as a secondary action.

-----------------------------------

SCREEN 5 — HUMAN DETECTED / HANDOFF

-----------------------------------

When a real representative is detected, create a strong but calm notification.

Heading:

"Someone is on the line."

Supporting text:

"Saathi detected a customer-service representative."

Show:

Zomato Customer Support

Representative detected

Then a prominent phone-style action:

"Listen to call"

and:

"Join call"

"Take over"

Important:

The user should understand that Saathi is still speaking unless they take control.

Show a small status:

"Saathi is continuing the conversation."

-----------------------------------

SCREEN 6 — VERIFICATION REQUIRED

-----------------------------------

This screen appears when the representative asks for sensitive authentication.

Example:

"Saathi needs you."

Message:

"The representative needs information that Saathi cannot access or provide."

Example:

"An OTP was requested."

Show a security explanation:

"Saathi never has access to your OTP, PIN, CVV, password, or other authentication credentials."

Primary button:

"Take Over Call"

This screen should feel secure and trustworthy, not alarming.

-----------------------------------

SCREEN 7 — CALL SUMMARY

-----------------------------------

After the call:

Heading:

"Call complete"

Show company:

Zomato

Problem:

Order arrived 2 hours late

Show:

What happened

What was offered

What was accepted

Reference number

Representative name

Next step

Example:

OFFERED

₹200 credit or redelivery

RESULT

Waiting for your decision

REFERENCE

ZOM-48291

REPRESENTATIVE

Rahul

Provide:

"View transcript"

and:

"Done"

The summary should be scannable.

-----------------------------------

SCREEN 8 — CALL HISTORY

-----------------------------------

Create a clean history page.

Each call card should show:

Company

Problem

Date/time

Status

Possible statuses:

Completed

Needs you

Waiting

Failed

Clicking a call opens its summary.

-----------------------------------

IMPORTANT INTERACTION DESIGN

-----------------------------------

The user should ALWAYS know:

1. What Saathi is doing

2. Who Saathi is talking to

3. Whether Saathi is speaking or listening

4. Whether the user needs to take action

5. What Saathi is authorized to do

6. How long the call has been running

Never leave the user wondering what is happening.

-----------------------------------

CALL STATE MODEL

-----------------------------------

Implement the frontend using clear call states:

DIALING

RINGING

IVR

HOLD

ASSESSING

HUMAN_DETECTED

AI_SPEAKING

USER_SUMMONED

USER_LISTENING

USER_IN_CONTROL

VERIFICATION_REQUIRED

COMPLETED

Use simulated state transitions for the prototype.

Create a small mock call controller/service so these states can later be replaced by LiveKit events.

-----------------------------------

RESPONSIVE DESIGN

-----------------------------------

The application must be fully responsive.

Desktop:

premium spacious interface.

Mobile:

the live call screen should feel like a native mobile voice experience.

Make the most important actions reachable with one hand.

On mobile, prioritize:

Take Over

Join

Listen

-----------------------------------

ACCESSIBILITY

-----------------------------------

Use:

- good contrast

- keyboard navigation

- visible focus states

- semantic buttons

- readable font sizes

- accessible labels

Do not rely only on color to communicate call state.

-----------------------------------

ANIMATION

-----------------------------------

Use Framer Motion or an equivalent animation library where appropriate.

Animations should communicate state, not exist only for decoration.

Use:

- subtle waveform movement

- smooth state transitions

- soft pulse when calling

- elegant card transitions

- smooth handoff transition

Avoid excessive animations.

-----------------------------------

TECHNICAL STRUCTURE

-----------------------------------

Use:

React / Next.js

TypeScript

Tailwind CSS

shadcn/ui where appropriate

Framer Motion for animations

Create reusable components such as:

SaathiLogo

ProblemInput

UnderstandingCard

MandateCard

PermissionBadge

CallVisualizer

CallStatus

CallTimeline

HumanDetectedCard

CallControls

VerificationCard

CallSummary

CallHistoryCard

Keep components modular.

Do not hardcode the entire application into one page.

Use mock data/services for now.

Prepare clean interfaces so that later we can connect:

- LiveKit Agents

- backend API

- authentication

- real call state

- real transcripts

- real call history

Do NOT implement backend functionality yet.

-----------------------------------

FINAL UX GOAL

-----------------------------------

The user should feel:

"I tell Saathi what went wrong, tell it what it is allowed to do, put my phone down, and Saathi handles the boring part — while I remain in control."

Build the interface around TRUST, CONTROL, CLARITY and REAL-TIME VOICE PRESENCE.

Do not make it look like a generic SaaS dashboard.

Make Saathi feel like a real premium voice-agent product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/de811e0f-36e6-52e4-8260-3d5e76bd0502).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
