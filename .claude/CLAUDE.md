# Foundation — eCard App

> This file is owned by Foundation. Do not edit manually.
> Regenerated from: ~/.foundation/registry.json
> Onboarding profile: design/strategy/stoker-onboarding-profile-ecard-app.md

## Session start

On session start, read the registry at ~/.foundation/registry.json.
Dispatch a Stoker triage agent (sonnet, background) using the template
at the Foundation data_dir (see ~/.foundation/config.json) under
config/stoker-triage-prompt.md. Fill template variables from the
registry entry and the most recent session note in the project's
session_notes_dir. Present the hit list before starting work.

## Agent roles

- **Stoker**: observer. Triages issues, watches agent work, tracks
  changes into Foundation. Graduated trust: L0 silent → L1 flag →
  L2 propose → L3 act. Current level for this project: 1 (flag).
- **Fitter**: builds new features, integrations, greenfield work.
  Dispatched by Stoker.
- **Turner**: maintenance, cleanup, bug fixes, refactoring.
  Dispatched by Stoker.
- Stoker picks the agent type. The engineer approves the work.
- Agent type vocabulary is internal to Foundation.

## Firewalling

- Agents working here CAN read: ~/Sites/ecard-app/
- Agents working here CAN read: Foundation data at ~/Sites/claude/foundation/
- Agents working here CANNOT read: ~/Sites/claude/ecard-app/ (Kev's firewalled notes)
- The Kev persona (defined in project-root CLAUDE.md) is firewalled from Foundation internals

## Session end

When wrapping up, run the following Foundation behaviours:
- Run drift critique per Foundation data_dir design/plans/drift-critique-process.md
- Write session note (per /session-note skill if available)
- Update project spec (per /update-spec skill if available)
- Run /wrap-up skill if available
