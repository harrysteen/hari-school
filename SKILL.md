---
name: design-system-bina
description: >
  Apply the bina design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for blog interfaces.
---

# bina — Design System Skill

## When to Use

- Building new UI components for bina.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for blog pages.
- Checking designs against the extracted token set.

## Context

- **Product:** bina — https://thebinaschool.com/education
- **Surface:** blog
- **Audience:** General readers
- **Character:** Content-first editorial layout with a balanced color system and 3 typefaces.

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| color-1 | `#000000` | Text Primary |
| color-2 | `#B38CFF` | Text Secondary |
| color-3 | `#06E1BD` | Accent |
| color-4 | `#67DEBF` | Accent |
| color-5 | `#F7D928` | Accent |

### Typography

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

### Spacing

**Base unit:** 4px

`space-1: 6px` · `space-2: 7px` · `space-3: 9px` · `space-4: 11px` · `space-5: 12px` · `space-6: 14px` · `space-7: 16px` · `space-8: 18px` · `space-9: 20px` · `space-10: 21px` · `space-11: 24px` · `space-12: 28px` · `space-13: 32px` · `space-14: 38px` · `space-15: 40px` · `space-16: 48px` · `space-17: 56px` · `space-18: 61px` · `space-19: 72px` · `space-20: 107px` · `space-21: 272px`

### Shapes

**Border radius:** `radius-sm: 12.7488px` · `radius-md: 20px 0px 0px 20px` · `radius-lg: 24px` · `radius-full: 159984px`

### Elevation

- **shadow-sm:** `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 4px 20px 0px`

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-base:** `opacity 0.2s`
- **duration-base:** `transform 0.2s cubic-bezier(0, 0, 0.2, 1), translate 0.2s cubic-bezier(0, 0, 0.2, 1), scale 0.2s cubic-bezier(0, 0, 0.2, 1), rotate 0.2s cubic-bezier(0, 0, 0.2, 1)`
- **duration-base:** `color 0.3s cubic-bezier(0, 0, 0.2, 1), background-color 0.3s cubic-bezier(0, 0, 0.2, 1), border-color 0.3s cubic-bezier(0, 0, 0.2, 1), outline-color 0.3s cubic-bezier(0, 0, 0.2, 1), text-decoration-color 0.3s cubic-bezier(0, 0, 0.2, 1), fill 0.3s cubic-bezier(0, 0, 0.2, 1), stroke 0.3s cubic-bezier(0, 0, 0.2, 1), --tw-gradient-from 0.3s cubic-bezier(0, 0, 0.2, 1), --tw-gradient-via 0.3s cubic-bezier(0, 0, 0.2, 1), --tw-gradient-to 0.3s cubic-bezier(0, 0, 0.2, 1)`
- **duration-slow:** `background-color 0.6s, border-color 0.6s, color 0.6s, opacity 0.2s`
- **duration-slow:** `opacity 0.6s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility linear`

## Component Inventory

- **Buttons:** 1 detected
- **Links:** 35 detected
- **Navigation:** 1 elements
- **Images:** 53 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 4px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (12.7488px, 20px 0px 0px 20px, 24px, 159984px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Informative, engaging, conversational. First person plural when appropriate.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
