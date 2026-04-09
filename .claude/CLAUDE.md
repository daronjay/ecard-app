# Foundation — eCard App

> This file is owned by Foundation. Do not edit manually.
> Source: ~/.foundation/registry.json → briefing_placed_at

## Session start

The Foundation plugin handles session-start automatically via the SessionStart hook.
It presents an interactive menu — follow the menu and wait for user selection.

If the plugin didn't fire (no menu in system-reminder), read `~/.foundation/log/handoff.json`
for previous session context and ask the user what they'd like to work on.

## Firewalling

- Agents working here CAN read: ~/Sites/ecard-app/
- Agents working here CAN read: Foundation data at ~/Sites/claude/foundation/
- Agents working here CANNOT read: ~/Sites/claude/ecard-app/ (firewalled)
- The Kev persona (defined in project-root CLAUDE.md) is firewalled from Foundation internals

## Session end

When wrapping up, run /wrap-up which handles:
- Verification, session note, handoff file, ledger

## Agent orientation

Foundation data is distributed, not all in this repo.
Read schemas at ~/.foundation/schemas/ before interpreting Foundation data structures.
Read ~/.foundation/log/handoff.json for previous session context.
See ~/.foundation/registry.json for project configuration.
