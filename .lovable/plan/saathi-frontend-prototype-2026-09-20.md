# Saathi frontend prototype

## Build
- Establish a dark, premium design system with near-black navy surfaces, restrained blue accents, accessible focus states, and responsive typography.
- Add minimal shared navigation, a distinctive Saathi voice mark, and modular components for problems, understanding, permissions, live call state, timelines, controls, handoff, verification, summaries, and history.
- Create separate routes for Home, Understanding, Permission, Call, Human Handoff, Verification, Call Summary, and Call History.
- Connect the prototype flow using browser session data so the problem and permission follow the user through each screen without adding a backend.
- Add a typed mock call controller with all specified states and deterministic simulated transitions, structured so LiveKit events can replace the simulator later.

## Interaction details
- Validate vague mandates and require an explicit action or limit before calls can begin.
- Keep current activity, counterparty, speaking/listening state, authorization, elapsed time, and required user action visible during calls.
- Provide responsive Listen, Join, Take Over, and “Not a person” controls, with safe handoff into verification and final summary states.
- Respect reduced-motion preferences while using subtle state-driven waveform, pulse, and transition effects.

## Validation
- Check every route at desktop and mobile sizes.
- Exercise the complete prototype flow from problem entry through simulated call completion.
- Confirm keyboard focus, readable contrast, route metadata, and a clean production build.
