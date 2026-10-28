# Adapting Facteno's Website Approach for ProsERP

**Prepared:** 26 October 2026  
**Purpose:** A practical product and website plan for learning from Facteno's public website without copying its wording, visual identity, screenshots, or manufacturing-specific claims.

## Executive recommendation

Use Facteno as a reference for **how clearly it proves an ERP workflow**, not as a template to reproduce. Its strongest pattern is to explain a business problem, show a connected chain of real product documents, then let a prospective customer judge the product through detailed module information and a guided demo.

ProsERP's website already has a Next.js foundation, industry pages, an 11-module product tour, a demo-request form, and interactive previews. The next improvement should be a more deliberate **evidence-led product experience**:

1. Show product screens that follow the actual ProsERP UI and terminology.
2. Explain how its real records and workflows connect across modules.
3. Give each important solution area a focused page rather than putting every detail on one page.
4. Offer an honest, guided way to evaluate ProsERP, without implying that an illustrative preview is the live system.
5. Keep the main conversion path clear: **Request a demo**.

## What was studied on Facteno

Facteno's current public homepage uses a structured product-evaluation journey:

- A focused manufacturing ERP proposition, clear primary demo request, and a secondary "see how to judge it" path.
- A short proof strip communicating module count, document coverage, reports and language support.
- A problem section framed around disconnected operational records, late costing, paper approvals and delayed reports.
- A visual end-to-end document chain, with product-screen examples and captions that explain what the screen proves.
- A categorized product area linking to individual feature pages, rather than relying on one long feature list.
- An owner-oriented business-control-centre story, an approval-matrix example and industry-specific pages.
- A demo-evaluation section describing what is loaded into the demo, what a prospect can inspect, and how to request access.
- Pricing tiers, articles, evaluation steps and FAQ content that address questions before a sales conversation.

The effective pattern is the **sequence of evidence and decision support**. ProsERP should not adopt Facteno's factory-specific promise, pricing, text, screenshots, diagrams, branding or claims.

## Current ProsERP foundation

The existing Next.js site already provides a useful base:

- Homepage, About, Product tour and Request a demo routes.
- Four industry pages: projects and construction, fuel stations, manufacturing, and trading and distribution.
- A dedicated Process Approval page.
- An 11-module guided tour with interactive project, budget, asset, payroll, sales, procurement, store and finance previews.
- A shared navigation/footer and a working demo-request flow.
- Recent previews use fictitious illustrative data. The recent Finance dashboard has been reshaped to follow the layout and widget types observed in the live ProsERP dashboard.

Relevant implementation and source material:

- [`components/home-experience.tsx`](../components/home-experience.tsx) — homepage and guided module tour.
- [`app/globals.css`](../app/globals.css) — site and product-preview styling.
- [`app/industries/[slug]/page.tsx`](../app/industries/%5Bslug%5D/page.tsx) — existing industry detail pages.
- [`app/solutions/process-approval/page.tsx`](../app/solutions/process-approval/page.tsx) — dedicated approval experience.
- [`docs/business-flows/pos-procurement-stores.md`](./business-flows/pos-procurement-stores.md) — detailed POS, purchases, receiving, consumption and stores flows reverse-engineered from the ERP frontend.

The codebase and prior read-only product study also show that the current tour previews are not a replacement for product evidence. Each preview should be checked against the actual ProsERP screen and its flow before it is described as representative.

## Adaptation principles

1. **Truth before polish.** Map every public workflow and claim to a known ProsERP screen, source note, or product-owner confirmation.
2. **Show the work, not a generic dashboard.** Use actual information hierarchy, navigation concepts, column names, statuses, and chart forms where verified. Do not invent product behavior to fill visual space.
3. **Keep example data visibly fictional.** Use names such as "Sample project" and "SAMPLE-001." Never copy real customer, employee, supplier, transaction, or financial data from the live system.
4. **Explain connected records.** Show how a request or transaction progresses, which module owns the next step, and where stock or financial effects become visible.
5. **Separate proof from promotion.** Label UI mockups as illustrative. Only describe a live sandbox, integrations, implementation timelines, e-invoicing, deployment options, or service levels when ProsAfrica has confirmed them.
6. **Keep each page focused.** The homepage should orient and route users. Detailed capabilities belong on relevant product or industry pages.
7. **Preserve ProsERP's identity.** Keep ProsAfrica/ProsERP visual language, English-first content, and "Request a demo" as the primary CTA. Take inspiration from information design, not another company's protected copy or artwork.

## Product and site adaptation map

| Facteno pattern | ProsERP adaptation | Priority | Evidence / decision needed |
|---|---|---:|---|
| Specific ERP proposition and primary CTA | State who ProsERP helps and the connected operational problem it solves; keep Request a demo prominent. Avoid claiming a single-industry focus. | P0 | Confirm the short positioning statement with ProsAfrica. |
| Outcome-oriented problem framing | Describe disconnected finance, projects, purchasing, stores, sales, fuel operations, manufacturing and people workflows using ProsERP vocabulary. | P0 | Validate claims against current product screens and customer language. |
| End-to-end document chain | Create concise workflow stories: purchase order → partial goods receipt → store stock → transfer/consumption; order sale → dispatch → receipt/invoice; project plan → budget/WBS → claims/stores/progress; fuel shift → dipping → station reports. | P0 | POS/Procurement/Stores flow is documented. Verify remaining paths against the live UI and relevant docs. |
| Product-screen illustrations | Replace generic card/dashboard inventions with faithful, cropped screen references or HTML previews matching ProsERP layout, navigation, labels and chart/table types. | P0 | Capture approved screens; redact personal/customer information; use synthetic records that fit the screen. |
| Many individual feature pages | Add focused module pages for the highest-value capabilities, then expand based on customer demand. Keep the main homepage compact. | P1 | Confirm page order and which modules are commercially ready to describe. |
| Owner/business-control dashboard story | Tell the verified ProsERP dashboard story: P&L and balance-sheet trends, revenue/expense composition, inventory, purchases & GRNs, due invoices, payables, project indicators and quick reports. | P1 | Dashboard items observed; confirm which widgets are consistently available and configurable. |
| Explicit evaluation/demo pathway | Explain what a guided demo covers and how to request one. If a safe sandbox exists, document its scope and boundaries honestly. | P1 | Confirm demo access process, data policy and which environments can be shown to prospects. |
| Reports shown as product value | Organize verified report examples by audience and workflow, such as sales/cash, cashier, stock movement, purchases, project, payroll and A/P & A/R. | P1 | Confirm names, availability and permission/configuration dependencies per report. |
| Industry-specific stories | Deepen the four existing pages using verified workflows and role-specific outcomes; do not publish industry features that have not been confirmed. | P1 | Review existing industry content with product and sales owners. |
| Dynamic approvals | Explain approval ownership, request statuses and workflow configuration only to the level present in ProsERP. | P1 | Confirm configurability and approval behavior. Existing Process Approval page documents visible request/status flows, not all configuration rules. |
| Pricing tiers | Do not reproduce Facteno's prices or add guessed ProsERP tiers. Consider a "talk to us" commercial explanation only if pricing policy is approved. | Later | Requires a ProsAfrica pricing decision. |
| Articles and learning content | Publish original ProsERP guides and workflow explainers only when content ownership and maintenance are clear. | Later | Editorial owner and update cadence required. |
| FAQ and implementation claims | Add evidence-backed answers about deployment, rollout, support, customization, language, integrations and data migration. | Later | Product and delivery teams must approve each answer. |

## Recommended information architecture

### Homepage

Keep the homepage a concise overview rather than a complete catalog:

1. **Hero:** ProsERP's outcome and target customer context, with Request a demo and Explore the product.
2. **Proof row:** Only confirmed facts, such as areas covered or supported business workflows. Avoid arbitrary module/report counts.
3. **Connected-workflow proof:** One or two visual stories that show operational records flowing into stock, project or finance views.
4. **Solution cards:** A curated set of high-priority areas linking to dedicated pages.
5. **Industry fit:** Projects/construction, fuel stations, manufacturing, and trading/distribution.
6. **Product evidence:** A small number of faithful screen examples with captions explaining what is being shown.
7. **Demo CTA:** Full-width, clear closing invitation.

Do not turn the homepage into a wall of 11 modules, every report, every workflow and every FAQ. Retain the current separation of demo request, About and solution pages.

### Product and solution pages

Create or expand focused pages in this suggested order:

1. **Projects:** WBS and Tasks Tree View, Gantt, budgets, claims, subcontractors, stores and project status.
2. **Finance:** Dashboard, P&L, balance sheet, transactions/ledgers, due invoices and verified quick reports.
3. **Procurement & Stores:** Purchase orders, partial GRNs, store stock, transfers, consumption, adjustments and reports.
4. **Sales & POS:** Outlets/counters, instant vs order sales, dispatches, receipts, invoices and sales reporting.
5. **Fuel stations:** Shifts, dippings, tank/stock context and station reports.
6. **Manufacturing:** Bills of materials, work centers, batches and output/cost reporting, verified against the product.
7. **People & Payroll:** Leave/loan requests and payroll-run review, using privacy-safe examples.
8. **Asset Register:** Asset records, categories, locations, value and status.
9. **Process Approval:** Keep the dedicated page and extend it only when approval configuration and lifecycle claims are verified.

These are a proposed content architecture, not a claim that all areas are currently feature-complete or available to every ProsERP customer.

## UI system decision — MUI, no CSS (27 October 2026)

**MUI (Material UI) v9 is the UI system for this site, and the project contains no CSS at all.** This is the code standard, recorded in [`CLAUDE.md`](../CLAUDE.md). The rest of this document was written against hand-authored HTML/CSS; where the two disagree, this section and `CLAUDE.md` win.

- `app/globals.css` (6,000 lines) has been **deleted**, along with `public/css/` and `public/scss/` (25 files). No `.css` or `.scss` file remains in the project.
- The theme in [`components/theme.ts`](../components/theme.ts) carries over the ten brand tokens that used to be CSS custom properties — navy `#101d2b`, lime `#c8f169`, ink, muted, paper, line, white and the font stacks — and is now the single source of truth for colour and type. MUI components inherit the ProsERP palette rather than Material's defaults, which is how the "Preserve ProsERP's identity" principle below survives the move.
- MUI is wired in through [`components/mui-providers.tsx`](../components/mui-providers.tsx) using the `v16-appRouter` cache provider, so emotion's styles are injected during SSR. `CssBaseline` is now the project's only global reset.
- Icons come from `@mui/icons-material` and `@fortawesome/react-fontawesome`, not icon-font classes.
- Emotion has no full RSC support, so pages that render MUI are split into a thin server component holding `metadata` plus a `"use client"` view — `component={Link}` cannot cross the server/client boundary.
- **Consequence for this plan:** nothing on the site looks pixel-identical to its hand-styled version any more. Spacing, borders, typography and selection highlighting are MUI's, themed to brand colour. Phase 1's exit condition — that product owners recognise the previews as representative of ProsERP — must be judged against the MUI rendering.
- **Two scripts are now dead** and should be removed or rewired when convenient: `gulp`/`rtl`/`rtl-build` compiled the deleted SCSS, and `legacy:preview` (the old Express/EJS site in `views/`) served the deleted `public/css`.

## Interactive product evidence

The reusable **ProsERP screen-preview system** now exists as [`components/erp-screen.tsx`](../components/erp-screen.tsx) — see Phase 1 status below. The requirements it was built against are kept here as the standard it must continue to meet.

### Screen shell

- Match the real product's navigation and page header patterns where approved and visible.
- Use realistic table density, filters, tabs, chart axes, status badges, empty states and responsive behavior.
- Keep the ProsERP screen area visually distinct from marketing copy, with a clear "Illustrative sample data" label.
- Use restrained animation. Do not make the demo look like a different ERP product through oversized typography, arbitrary charts or decorative controls.

### Interaction model

- Make filters, tabs, row selection and expand/collapse work when presented as controls.
- Connect a selected record to its details and next workflow step.
- Use guided scenarios, for example:
  - Select a purchase order, inspect remaining quantities, view a partial GRN, then follow stock into a store.
  - Switch between an order sale and an instant sale, then inspect dispatch/receipt/invoice consequences.
  - Select a project task and see it remain selected across WBS, Tasks Tree View and Gantt.
  - Change finance date/cost-center filters and show the matching dashboard context.
- Keep previews read-only; don't imply that public-tour actions create or post ERP transactions.
- If a state or control is not supported in the real product, do not simulate it as an actual ProsERP capability.

### Data and screenshots

- Prefer a deliberately prepared synthetic dataset that preserves realistic shapes and relationships without exposing live demo data.
- Use approved screenshots only after removing personal names, customer names, account identifiers, and sensitive values.
- When rebuilding a screen with HTML, use the approved screenshot as a layout reference, not an excuse to invent extra widgets.
- Make the explanatory caption state what the preview demonstrates and what is sample-only.

## Guided demo and conversion

Adapt Facteno's evaluation-first approach in a way that matches ProsAfrica's sales process:

1. Let visitors explore public product and workflow explanations without submitting a form.
2. Offer clear demo options at relevant points: request a general demo or request a workflow-specific walkthrough.
3. If authorized demo access is available, explain its scope, whether it is read-only/sandboxed, and how the visitor receives access.
4. Ask the existing demo-request form for only information the sales team needs to prepare a useful session.
5. Keep the same Request a demo action visible in the site header, solution pages and closing CTA.
6. Add trust details only after verification: deployment model, support, implementation, integrations, security and data handling.

Do not promise anonymous live logins, "try to break it" access, real production data, exact implementation timing or self-serve purchasing until those offers are explicitly approved.

## Delivery roadmap

### Phase 0 — Product truth and evidence inventory

**Status (26 October 2026): in progress — the register exists, the decisions do not.** See [`docs/product-evidence-register.md`](./product-evidence-register.md).

- [x] Audit each current marketing claim, module preview, industry detail and report name.
- [x] Create a product-evidence register with source screen/document, verified wording, data sensitivity, and approval owner.
- [ ] Identify which demo environment and screenshots can be used publicly. *(Awaiting ProsAfrica — register decision 8.)*
- [x] Mark uncertain or inferred items for product-team review.

**Exit condition:** Every planned public claim and visual has a clear source or an explicit "needs confirmation" marker.

**Exit status:** Met for the inventory — every current claim is listed and tiered. **Not met for publication.** Nine decisions are open (register §8); the blocking one is the 12 named client logos on the homepage, which need written logo permission, not product confirmation. Six of the eleven modules have no evidence owner, which caps how far Phase 1 can go beyond POS and procurement.

### Phase 1 — Establish visual fidelity

**Status (27 October 2026): engineering done, sign-off outstanding.**

- [ ] Agree a small set of approved ProsERP screen references and redaction rules. *(Blocked — register decision 8. Without reference screens there is nothing to measure fidelity against.)*
- [x] Define shared screen-shell, toolbar, tab, filter, table, chart, status and detail components. → [`components/erp-screen.tsx`](../components/erp-screen.tsx): `ScreenHeading`, `ScreenMetrics`, `ScreenFilters`, `ScreenSelect`, `ScreenTable`, `ScreenRow`, `ScreenGroupRow`, `ScreenCell`, `StatusBadge`, `StatusChip`, `toneForStatus`, `ScreenToggleGroup`, `ScreenTabs`, `ScreenCaption`, `RecordDetail`.
- [x] Rework the most visible previews first: Finance dashboard, Project Management, Procurement/Stores and Sales/POS. All five preview components plus the WBS table now render MUI.
- [ ] Remove any visual details not supported by the reference screens. *(Blocked on the same reference screens. The bespoke dashboard cards — donuts, line charts, bar charts — were left as-is for exactly this reason.)*

**Exit condition:** Product owners recognize the previews as representative of ProsERP's screen structure; all sample data is plainly fictional.

**Exit status:** Second half **met** — all sample data is plainly fictional and labelled (audited in the evidence register). First half **cannot be met by engineering alone**: it is a recognition test, and nobody has yet confirmed the previews resemble the real product. Judge it against the MUI rendering (see the UI system decision above).

**How the migration was verified.** Each pre-MUI extraction step was proved non-visual by static-exporting a temporary route that rendered all seven previews and diffing the HTML — **0 differences across 849 markup fragments**. That guarantee ended deliberately when real MUI components replaced the CSS-grid markup; from that point verification is `tsc --noEmit` clean, a green production build, all routes 200, no hydration warnings, and confirmation that real `<table>/<thead>/<tbody>` elements and themed MUI classes render. Appearance itself is unverified — it needs a human to look.

**Known follow-ups left open on purpose:**

- Two accessibility inconsistencies preserved rather than silently changed, each deserving its own reviewable diff: `aria-pressed` and the selected-row styling in `AssetRegisterPreview` derive from different state, so a filtered-out selection highlights the fallback row while screen readers see nothing pressed; and the finance tables were originally built with no ARIA table semantics at all.
- **76 class selectors in `globals.css` are now unreferenced** (measured excluding dynamically composed names such as `` `finance-line-${…}` ``, `` `status-${…}` ``, `` `level-${…}` ``), concentrated in the `finance-`, `asset-`, `payroll-`, `operations-`, `budget-` and `wbs-` families. Deleting them is safe-looking but unverifiable without a visual pass, so the CSS was left in place.
- The Gantt chart and tasks-tree views keep their hand-written markup. A faithful MUI tree would need `@mui/x-tree-view`, which is not installed.

### Phase 2 — Build connected workflow stories

- Replace disconnected module summaries with one or two user-selectable end-to-end scenarios per priority solution.
- Tie each step to a record, visible status, and the next participating module.
- Ensure the interaction model stays read-only and accessible by keyboard and touch.

**Exit condition:** A visitor can explain what starts the workflow, what changes at each stage, and where to inspect the outcome.

**Status (27 October 2026): partly in place, not startable in full.** The interaction model is built — the previews already carry selectable rows wired to detail panels, working filters, tabs and expand/collapse, and `ConnectedOperationsPreview` already tells a connected sales → dispatch → receipt → invoice story and a purchase order → GRN → store-use story. Both of those are tier **A** in the evidence register, i.e. they match the documented product. The remaining scenarios — projects, fuel, manufacturing, finance — cannot be written, because six of the eleven modules have no evidence owner and no source document (register decision 7). Writing workflow stories from guesswork is exactly what the adaptation principles forbid.

### Phase 3 — Create focused product pages

- Build priority pages from reusable product-screen previews and approved capability content.
- Keep page content scannable: problem, workflow, screen evidence, connected modules, reports and demo CTA.
- Link relevant pages to existing industry pages and to each other where the workflow actually crosses modules.

**Exit condition:** Priority product areas have distinct, non-duplicative pages and navigation remains easy on mobile.

**Status (27 October 2026): not started — blocked on content, not on engineering.** The nine pages proposed above need approved capability content per area. Today only Point of Sale and Procurement & Stores have a written source; the other seven would be invented. Register decision 9 also governs whether the eight documented-but-unpublished capabilities (VFD/TRA fiscal receipts, proformas, price lists, barcode SKU entry, partial/over-fulfilment states, Excel/PDF export, permission gating, multi-outlet aggregate view) may become public claims — several of them are what would make these pages worth reading. The reusable preview system the pages are meant to be built from is ready.

### Phase 4 — Improve demo preparation and trust

- Align the Request a demo form with what the team needs to tailor a session.
- Add an honest "what the demo covers" explanation after the demo process is confirmed.
- Publish only approved FAQs about rollout, access, customization, support and integrations.

**Exit condition:** Prospects know what happens after requesting a demo and what they will actually be shown.

**Status (27 October 2026): not started — blocked entirely on ProsAfrica.** Every item describes something only the business can supply: what the demo covers, which environment may be shown, and which FAQ answers are approved (register decision 8). The one engineering-side task, aligning the demo-request form fields with what sales needs, is waiting on someone to say what sales needs. The form itself works — note that it posts to `app/api/demo-inquiry/route.js`, which is a server route, so the site cannot be deployed as a pure static export without losing it.

### Phase 5 — Measure and iterate

- Track product-tour selections, preview interactions, solution-page engagement and demo form completion using privacy-respecting analytics.
- Ask sales which screens and workflow questions recur in demos.
- Improve pages based on evidenced confusion and demand, not on feature-count competition.

**Exit condition:** A regular review cycle exists for content accuracy and the team can identify which product evidence helps prospects take the next step.

**Status (27 October 2026): not started, and correctly last.** Analytics measuring unverified claims would only tell you which unapproved statement people clicked. No analytics tool is installed; choosing one is also a privacy decision ("privacy-respecting" above), which belongs with the business.

## Where this plan actually stands

| Phase | State | What is holding it |
|---|---|---|
| 0 — Evidence inventory | Register written, decisions open | Nine owner decisions; the blocker is 12 client logos needing written permission |
| 1 — Visual fidelity | Engineering complete on MUI | A recognition test only product owners can run; reference screens (decision 8) |
| 2 — Workflow stories | POS and procurement done | Six modules have no evidence owner (decision 7) |
| 3 — Focused product pages | Not started | Approved capability content for seven of nine areas (decisions 7, 9) |
| 4 — Demo and trust | Not started | Entirely business input (decision 8) |
| 5 — Measure and iterate | Not started | Depends on 0–4; needs a privacy decision on tooling |

**The honest summary:** every part of this roadmap that engineering can finish without ProsAfrica is finished. Everything still open is open because it needs a person to confirm a fact, grant a permission, or approve a claim — not because code is missing. The single highest-value thing anyone can do next is work down the nine decisions in [`docs/product-evidence-register.md`](./product-evidence-register.md) §8, starting with the client logos, since that one is a legal exposure on a page that is already public-facing.

## Acceptance checklist

Checked items state what has actually been verified, and how. Unchecked items name what is missing.

- [ ] Every capability statement is verified or clearly qualified. — *Audited and tiered in the evidence register; 8 of 10 report names and 6 of 11 modules remain unverified.*
- [ ] Product UI previews match approved ProsERP screen structure and terminology. — *Cannot be checked until approved reference screens exist (decision 8).*
- [x] No live customer, employee, supplier or financial record is exposed. — *Audited across the source: identifiers follow the `SAMPLE-001` / "Sample projects" convention throughout.*
- [x] All illustrative data is labeled and internally consistent. — *Previews, industry pages, process-approval page and the hero visual all carry visible disclaimers; the finance report list's mixed "Sample report" / hard-figure inconsistency was fixed on 26 Oct 2026.*
- [x] Interactive controls work and do not suggest real ERP writes. — *All controls are selection or filtering only; nothing posts. The demo form is the one exception and is a genuine submission.*
- [ ] Product pages explain workflow context, not just a list of features. — *Phase 3 not started.*
- [x] Homepage stays focused and does not collapse all information into one page. — *Still routes to About, Product tour, four industry pages and the approval page rather than inlining them.*
- [x] Request a demo remains the primary CTA. — *Present in the header, the hero, the drawer on mobile and the closing CTA.*
- [ ] Desktop and mobile layouts have no page-level horizontal overflow. — *Needs a browser check. The MUI migration changed layout mechanics (tables and a Drawer), so the previous check does not carry over.*
- [ ] Keyboard focus, labels, contrast and reduced-motion preferences are preserved. — *Partly improved: the mobile menu is now a MUI Drawer with focus trapping and Escape handling. Two known ARIA inconsistencies are listed under Phase 1, and contrast of the themed chips and tabs has not been measured.*
- [x] Build and relevant browser checks pass after each implementation phase. — *`tsc --noEmit` clean and `next build` green after every step; all ten routes return 200. Visual checks are the outstanding part.*

## What not to copy from Facteno

- Its brand, exact copy, diagrams, illustrations, screenshots or page designs.
- Manufacturing-only positioning, textile examples, feature names or industry stories that do not fit ProsERP.
- Its pricing and commercial packaging.
- Claims about live deployments, real operating data, language support, hosting, integrations, rollout times, or sandbox access without ProsAfrica approval.
- The idea that more cards and more metrics automatically create more trust.

