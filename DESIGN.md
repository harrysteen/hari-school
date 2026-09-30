# bina

## Overview

**Product:** bina
**URL:** https://thebinaschool.com/education
**Surface type:** blog
**Audience:** General readers
**Brand character:** Content-first editorial layout with a balanced color system and 3 typefaces.

### Design Principles

- Readability above all — optimise for sustained reading, not scanning.
- Content is the interface — typography and whitespace do the heavy lifting.
- Minimal chrome — navigation and UI should fade behind the content.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-1 | `#000000` | Text Primary |
| color-2 | `#B38CFF` | Text Secondary |
| color-3 | `#06E1BD` | Accent |
| color-4 | `#67DEBF` | Accent |
| color-5 | `#F7D928` | Accent |

## Typography

**Font stack:** Rund Display, Rund Text, -apple-system

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 13px | Captions, metadata |
| text-sm | 16px | Labels, secondary text |
| text-base | 19px | Body text (default) |
| text-lg | 21px | Subheadings, emphasis |
| text-xl | 23px | Section headings |
| text-2xl | 48px | Section headings |

**Weight scale:** 400 · 500 · 700 · 900
**Line heights:** 48px · 28.1088px · 28.8px · 32.0256px · 26.9225px · 13px · 24px · 25.344px · 29.1163px

## Spacing

**Base unit:** 4px

`space-1: 6px` · `space-2: 7px` · `space-3: 9px` · `space-4: 11px` · `space-5: 12px` · `space-6: 14px` · `space-7: 16px` · `space-8: 18px` · `space-9: 20px` · `space-10: 21px` · `space-11: 24px` · `space-12: 28px` · `space-13: 32px` · `space-14: 38px` · `space-15: 40px` · `space-16: 48px` · `space-17: 56px` · `space-18: 61px` · `space-19: 72px` · `space-20: 107px` · `space-21: 272px`

## Shapes

**Border radius:** `radius-sm: 12.7488px` · `radius-md: 20px 0px 0px 20px` · `radius-lg: 24px` · `radius-full: 159984px`

## Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 4px 20px 0px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-base:** `opacity 0.2s`
- **duration-base:** `transform 0.2s cubic-bezier(0, 0, 0.2, 1), translate 0.2s cubic-bezier(0, 0, 0.2, 1), scale 0.2s cubic-bezier(0, 0, 0.2, 1), rotate 0.2s cubic-bezier(0, 0, 0.2, 1)`
- **duration-base:** `color 0.3s cubic-bezier(0, 0, 0.2, 1), background-color 0.3s cubic-bezier(0, 0, 0.2, 1), border-color 0.3s cubic-bezier(0, 0, 0.2, 1), outline-color 0.3s cubic-bezier(0, 0, 0.2, 1), text-decoration-color 0.3s cubic-bezier(0, 0, 0.2, 1), fill 0.3s cubic-bezier(0, 0, 0.2, 1), stroke 0.3s cubic-bezier(0, 0, 0.2, 1), --tw-gradient-from 0.3s cubic-bezier(0, 0, 0.2, 1), --tw-gradient-via 0.3s cubic-bezier(0, 0, 0.2, 1), --tw-gradient-to 0.3s cubic-bezier(0, 0, 0.2, 1)`
- **duration-slow:** `background-color 0.6s, border-color 0.6s, color 0.6s, opacity 0.2s`
- **duration-slow:** `opacity 0.6s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility linear`

## Components

- **Buttons:** 1 detected
- **Links:** 35 detected
- **Navigation:** 1 elements
- **Images:** 53 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (12.7488px, 20px 0px 0px 20px, 24px, 159984px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Informative, engaging, conversational. First person plural when appropriate.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 1 detected
- **Links:** 35 detected
- **Navigation:** 1 elements
- **Images:** 53 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
