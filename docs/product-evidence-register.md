# ProsERP Product Evidence Register

**Prepared:** 26 October 2026
**Phase:** 0 — Product truth and evidence inventory (see [`docs/adaptfacteno.md`](./adaptfacteno.md))
**Status:** Draft for product-owner review. No claim below has been signed off by ProsAfrica yet.

## Purpose

Phase 0 of the website plan requires that *every planned public claim and visual has a clear source or an explicit "needs confirmation" marker*. This register is that inventory. It audits what the site asserts **today**, names the evidence behind each assertion, and lists the decisions only ProsAfrica can make.

It is an audit, not an approval. Items marked **C** or **D** should not be treated as cleared for publication.

## How to use this document

1. Work down the **Needs decision** section — each entry blocks something downstream.
2. For each register row, either attach a source (screen, document, owner confirmation) or change the site copy.
3. Record the outcome and date it.
4. Phase 1 should not begin on a surface whose rows are still unresolved.

## Evidence tiers

| Tier | Meaning |
|---|---|
| **A — Documented** | Matches [`docs/business-flows/pos-procurement-stores.md`](./business-flows/pos-procurement-stores.md). That document was reverse-engineered from the live ERP frontend, so it is strong evidence of **UI behaviour**, but it is not an owner-signed commercial claim. |
| **B — Hedged** | Copy is deliberately qualified ("Sample", "Illustrative", "Example"). Low factual risk; keep the qualifier. |
| **C — Needs confirmation** | Stated publicly with no written source in this repository. Requires a product owner, a screen reference, or a copy change. |
| **D — Permission / legal** | Not a product-truth question. Requires a rights or commercial decision. |

---

## 1. Customer references — highest risk

| Item | Where | Tier | Note |
|---|---|---|---|
| Heading "OUR CLIENTS" over 12 named company logos | [`components/home-experience.tsx:1843`](../components/home-experience.tsx#L1843), data at [`:1086`](../components/home-experience.tsx#L1086) | **D** | Presenting a third party's name and mark as a client is a customer-reference claim. Each needs (a) confirmation they are a live ProsERP customer and (b) written permission to use their logo. |

Companies currently presented as clients: Transpower · White City International · RES Company Ltd · GP Petrol Stations · Calia Service Station · Farmer's Basket · Shalak Trading Company Ltd · Dowy Beauty · Buildsol · Black Mountain · Brecol · Namis.

**Recommendation:** treat this as blocking for any public launch. Until each logo has written permission on file, either reduce the grid to the permitted subset or replace the section with an unnamed formulation ("Used by construction, fuel, trading and manufacturing businesses in Tanzania") that makes no identifiable claim.

**Changed 4 November 2026.** For a week this was enforced in code: logos lived in a table whose `permitted` column defaulted to 0, and the grid rendered only cleared rows. That went when the data layer did — the record was kept in a git-ignored file, so it never reached a second machine and would never have reached production, which meant the grid that looked permission-gated locally simply showed nothing anywhere else. The twelve names are now an array in the component and every one of them ships. The recommendation above is unchanged; only its enforcement is gone, so emptying the array is the action it now calls for.

**Testimonials, added 4 November 2026 — tier D.** The homepage has a testimonials section (`testimonials` in [`components/home-experience.tsx`](../components/home-experience.tsx)) for named customers — a CEO, an accountant — describing what ProsERP changed in their work. It ships empty and does not render until an entry exists. Each entry needs: (a) the person's own words, not copy drafted for them; (b) written approval of the exact wording, name, title and organization as published; (c) the organization's consent where the person speaks in their company role. Record where that approval is kept in `permissionNote`. Any figure in a quote ("closed the month in 3 days instead of 10") is a product claim as well and needs the customer to stand behind it.

### Housekeeping

Six logos from the purchased theme sit in `public/images/logo/` and are **not referenced by any source file**: `amazon.svg`, `google.svg`, `lenovo.svg`, `paypal.svg`, `shopify.svg`, `spotify.svg`. They are inert today, but if they ever reached the clients grid they would be a false customer claim. Recommend deleting them from the repository.

---

## 2. Positioning and homepage

| Claim | Where | Tier | Note |
|---|---|---|---|
| "See where work, time and money stop agreeing." | [`:1597`](../components/home-experience.tsx#L1597) | **A** | Replaced "Run the whole business from one clear view" on 28 October 2026. The earlier line was tier C — "the whole business" was a broad, unevidenced promise. The replacement describes behaviour the project screenshots demonstrate directly. |
| "ProsERP runs inventory, sales, projects, fuel stations and manufacturing on one system, so a slip shows up as a number instead of a surprise." | [`:1602`](../components/home-experience.tsx#L1602) | **A / C** | Second clause is evidenced (§3 screen evidence). The five named industries are **C** — confirm all five are sold and supported today. |
| Proof line: "Execution against time elapsed. Spend against budget. Stock against threshold." | [`:1612`](../components/home-experience.tsx#L1612) | **A / C** | First two pairs are visible in the project screenshots (§3). "Stock against threshold" rests on the **Low Stock Alerts** widget alone — confirm a configurable threshold exists before leaning on it further. Previous line was "One connected system for finance, projects and operations", tier B. |
| Hero dashboard visual, labelled "Illustrative layout · graph shapes only · no customer data" | [`components/hero-dashboard-mock.tsx`](../components/hero-dashboard-mock.tsx) | **A / B** | Disclaimer present and correctly worded (**B**). The widget set is now **A**: owner-supplied dashboard screenshots (28 October 2026) show P&L trend, balance-sheet trend, revenue composition, operating expenses, inventory value, purchases & GRNs, low stock alerts, due invoices, top products, quick links and quick reports — the mock was corrected to match, adding Top Products and fixing the Quick Links set. One caveat remains: the screenshots are of two tenants (a trading and a fuel-station dashboard), so **widget availability still varies by subscription** — the fuel dashboard adds a Dippings card. Do not claim a fixed dashboard for every customer. |
| Adoption section: "Going live is a sequence, not a switch." and its six steps | [`components/home-experience.tsx`](../components/home-experience.tsx) — `#adoption` | **B / C** | Added 28 October 2026. It is the live site's own "Our Work Flow", reworded from benefits to mechanics, so it inherits that page's authority and no more (**B**). Step 3 is the firmest: "an instant sale settles into the counter's own ledger" is §1.5 verbatim in substance. Step 6's "part of the subscription, not a new system to install" is **C** — it matches the About copy and §1.5's "if subscribed" packaging, but no pricing or packaging document is in the repo. The live site's other new-section candidate, **"Why Choose ProsERP"**, was deliberately **not** carried over: its seven items are adjectives ("Simple Yet Powerful", "Real-Time Insights") with no body text and nothing to source. |
| Audience segments: Small businesses / Growing companies / Other organizations | [`:1128`](../components/home-experience.tsx#L1128) | **C** | Generic and low risk, but confirm these are the segments ProsAfrica sells to. |

---

## 3. Module catalogue

Eleven modules are listed at [`components/home-experience.tsx:1375`](../components/home-experience.tsx#L1375). The guided-tour copy at [`:8`](../components/home-experience.tsx#L8) is consistently hedged with "Sample" and "Example" metrics (tier **B** throughout) — that wording should be preserved.

| # | Module | Detail as published | Tier | Note |
|---|---|---|---|---|
| 01 | Financial management | Transactions, budgets, reconciliations and financial reports | **C** | No source document in repo. |
| 02 | Process approval | Route business requests for review and keep every decision visible | **B** | Dedicated page documents visible request/status flows only, not configuration rules. |
| 03 | Procurement | Purchase orders, goods received against them, and purchasing reports | **A** | Rewritten 28 October 2026. The previous line claimed "RFQs" and "supplier responses"; neither has a source, so both were removed rather than left standing while someone confirmed them. Purchase orders, receiving and the GRNs / Purchases reports are documented (§2.2, §4). |
| 04 | Inventory & stores | Stock movement and project-linked consumption, and low stock flagged before a store runs dry | **A / B** | Movement and project-linked consumption are documented (§2.3, §3). The low-stock half rests on the dashboard’s **Low Stock Alerts** widget alone: the flag is observed, the threshold behind it is not. The copy therefore says "flagged" and avoids "reorder level", which would imply configuration nobody has verified. |
| 05 | Project management | Weighted execution against time elapsed, spend against budget, certificates against approval | **A** | Upgraded from C on 28 October 2026, then rewritten the same day from a list of nouns to the three comparisons the screens actually compute — see "Project management, screen evidence" below. |
| 06 | Manufacturing | Bills of materials, production batches and cost reporting | **C** | No source document in repo. |
| 07 | Fuel stations | Station shifts, tank dippings, fuel stock and station reports | **B / C** | Tank dippings are tier **B** — a **Dippings** card appears on the fuel tenant’s dashboard (§2). Stock and reports stay **C**. **"Station shifts" was removed on 28 October 2026 and then put back the same day:** the fuel industry page headline, its four-step flow and the fuel product tour are all built on shifts, so taking the word off this one card would only have made the site contradict itself. §1.7’s note is about POS, which is a different module, so it does not actually falsify a fuel shift. This stays as owner decision 6 — answer it and either the claim gets a source or four places change together, not one. |
| 08 | Point of sale | Sales counters, outlets, proformas and sales reporting | **A** | Documented (§1.2, §1.5, §1.6, §1.7). |
| 09 | Reporting | Operational and financial views connected to daily activity | **A / C** | Verified for POS and procurement; unverified elsewhere. |
| 10 | Human resources | Employee leave, loan requests and payroll approval workflows | **C** | No source document in repo. Payroll previews correctly carry illustrative labels. |
| 11 | Asset Register | Track registered assets, assigned locations, status and value | **C** | No source document in repo. §1.5 does document an optional "Asset Booking" quick-add in POS ("if subscribed") — confirm how asset features are packaged. |

### Module copy rewritten, 28 October 2026

The eleven lines above were feature lists: they named screens rather than saying what the system
does with them. They were rewritten against one test — **does the module hold one thing against
another, and is that comparison evidenced here?** Where the answer was yes, the line now states the
comparison (03, 04, 05). Where no source exists, the line was left exactly as it was rather than
dressed up (01, 06, 08–11); a tier C module gets no new verb from a copy pass.

Procurement's "RFQs" and "supplier responses" came *off* the site entirely. Both were flagged here
as unsourced, and removing them was cheaper than defending them; if either turns out to be real it
can go back with a source attached. They were not only on this card — see §5 for the
trading-distribution page, which had to change with it.

Fuel's "station shifts" was removed and then restored, which is worth recording as a rule rather
than an incident: **an unsourced claim can only be removed everywhere it appears, or nowhere.**
Shifts appear on this card, in the fuel industry page's headline and flow, and throughout the fuel
product tour. Cutting the card alone would have left the site arguing with itself, and cutting all
four on the strength of a POS-only note (§1.7) would have been a positioning decision, not a copy
fix. It stays flagged as owner decision 6.

The section's framing moved the same way: "Bring operational activity and financial visibility
together" became a statement of why the comparisons are possible at all — the work and the money
are recorded in the same system — with three evidenced examples (§2.2, §2.3, §3).

### Project management — screen evidence, 28 October 2026

The product owner supplied six screenshots of the live Project Management module
(`webapp.proserp.co.tz/en-US/projectManagement/projects/1`). They are first-hand evidence of UI
behaviour, so the claims below move to tier **A**.

**The screenshots are of a live customer project and are not stored in this repository.** They show
a named client programme, named subcontractors and real contract values. Nothing from them may be
reproduced on the website — the previews stay synthetic. They are cited here for what they
demonstrate, not for their contents.

| Observed | Evidences |
|---|---|
| Project tabs: Dashboard, Deliverables, WBS, Budgets, Updates, Subcontracts, Claims, Users, Stores, Attachments | "Budgets, deliverables, claims, subcontractors and execution" — every noun in the published module line |
| Project header carries **Execution %** against **Time Elapsed %** | The schedule-variance claim in the Projects tour |
| WBS rows carry execution, time elapsed, **weight %**, duration and remaining days | "Weight the plan" and "Measure work against time" |
| Budget table columns Budgeted / Committed / Spent / % Spent, with lines marked **unbudgeted** and others past 100% | "Catch spending nobody planned" |
| **Available = Budget − Committed − Spent**, shown in red when negative | Corrected our own formula, which subtracted only committed |
| Subcontract certificates carry codes and approval states including "Waiting For General Manager" | "Gate payment on approval", and ties Process Approval to project payment |
| Gantt and Tasks Tree render the same plan as the WBS | The three plan views offered in the product tour |

**Still tier C within this module:** "Deliverables", "Updates", "Users" and "Stores" tabs exist, but
the screenshots do not open them, so nothing is published about what they contain.

**Strongest evidence on the site:** the Sales & POS tour copy — "See how instant sales settle at checkout while order sales continue through dispatch, receipts and invoicing" ([`:312`](../components/home-experience.tsx#L312)) — matches §1.5 almost exactly, including the instant-vs-order split and the separate dispatch, receipt and invoice stages. This is the standard the other modules should be held to.

---

## 4. Report names

Ten report names are published at [`components/home-experience.tsx:683`](../components/home-experience.tsx#L683); four more appear in the hero "Quick Reports" card at [`:1397`](../components/home-experience.tsx#L1397).

| Report name as published | Tier | Note |
|---|---|---|
| Sales & Cash Summary | **A** | §1.7. |
| Cashier Report | **A** | §1.7. Documented as the till-reconciliation report. |
| Income Statement | **C** | Confirm exact in-product name. |
| Balance Sheet | **C** | Confirm exact in-product name. |
| Debtors & Creditors | **C** | Confirm exact in-product name. |
| A/P & A/R Aging | **C** | Confirm exact in-product name. |
| Payroll Components Summary | **C** | Confirm; check permission dependency. |
| Leave Balances | **C** | Copy already notes "available to authorized users" — confirm the permission. |
| Staff Loans | **C** | Confirm. |
| Project Status Report | **C** | Confirm. |
| Hero: "Sales & Cash Summary" | **A** | Was "Sales & Cash"; aligned to the verified name on 26 Oct 2026. |
| Hero: "Stock Report", "Item Movement" | **C** | Confirm exact names. |
| Preview list: "Item Movement" **and** "Stock Movement" | **C** | Both appear in the same quick-reports list ([`:831`](../components/home-experience.tsx#L831), [`:858`](../components/home-experience.tsx#L858)). Probably one report under two names. Confirm which is correct and drop the other — left unchanged because neither name could be verified from the source. |

### Two defects fixed on 26 October 2026

Both needed no owner input, so they were corrected rather than left open:

1. **Inconsistent sample labelling — fixed.** Six of the ten report rows carried hard figures ("TZS 141.4M", "TZS 684.2M", …) while four said "Sample report" in the slot where a figure belongs. All ten now carry a representative value, following the convention the list already used for "A/P & A/R Aging" → "4 periods": Payroll Components Summary → "TZS 38.6M", Leave Balances → "214 days", Staff Loans → "TZS 22.5M", Project Status Report → "6 projects". The panel caption already reads "Sample figures only · report values depend on selected dates and access", so no figure can be read as live data. The word "Illustrative" was also dropped from the Payroll detail line, which was the only one of the ten to carry it.
2. **Report-name drift — fixed.** The hero card said "Sales & Cash"; it now reads "Sales & Cash Summary", matching §1.7 and the finance preview.

These change displayed sample values only — no capability claim was added or removed.

### Documented reports the site does not yet use

All tier **A**, available to strengthen Phase 3 pages: Sales Manifest · Sales Performance · Product Sales Report · Product Insights · Purchases Report · Purchases Manifest · GRNs Report.

---

## 5. Industry pages

Four pages exist at [`app/industries/[slug]/page.tsx`](../app/industries/%5Bslug%5D/page.tsx): projects-construction, fuel-stations, manufacturing, trading-distribution. All four headline claims are tier **C** — they predate this register and have no attached source. The page already labels its preview "Illustrative workflow preview" ([`:187`](../app/industries/%5Bslug%5D/page.tsx#L187)) and "Illustrative execution progress" ([`:17`](../app/industries/%5Bslug%5D/page.tsx#L17)), which is correct.

**Trading & distribution changed on 28 October 2026**, as a consequence of the procurement rewrite in
§3 rather than a decision about the page. Removing "RFQs" from the module card meant removing it
here too, which took four lines with it:

| Was | Now |
|---|---|
| "Follow supplier requests and purchases through inventory, outlets and sales activity" | "Follow purchasing through receiving, stores, outlets and sales activity" |
| "Coordinate supplier requests" / "Review RFQs, response deadlines and supplier submissions." | "Raise purchase orders" / "Issue orders to suppliers and keep each one against the supplier it went to." |
| Related: "Connect RFQs, supplier responses and purchase orders." | Related: "Connect purchase orders, goods received and purchasing reports." |
| Flow: Supplier request → Purchase order → Store & stock → Outlet sales | Flow: Purchase order → Goods receipt → Store & stock → Outlet sales |

Every replacement is documented in §2.2 and §2.3. The headline claim is untouched and stays tier **C**.

Per the plan, review each with product and sales owners before deepening; do not publish industry features that have not been confirmed.

## 6. Process Approval page

[`app/solutions/process-approval/page.tsx`](../app/solutions/process-approval/page.tsx) carries the clearest disclaimers on the site — "Illustrative details only. Actual fields vary by request type." ([`:214`](../app/solutions/process-approval/page.tsx#L214)) and "Illustrative interface · not live business records" ([`:220`](../app/solutions/process-approval/page.tsx#L220)). Tier **B**. Extend only when approval configuration and lifecycle behaviour are verified.

---

## 7. Documented capabilities not yet surfaced publicly

All tier **A**, i.e. evidenced at frontend level but absent from the website. Candidates for Phase 3, each still needing a commercial decision before it becomes a public promise:

| Capability | Source | Why it matters |
|---|---|---|
| VFD / TRA fiscal receipts | §1.5 | Tanzania-specific compliance. `adaptfacteno.md` lists e-invoicing as "needs confirmation" — there is now frontend-level evidence it exists. Strong local differentiator. |
| Proformas / quotations, with a non-mutating "Convert to Sale" | §1.6 | A complete pre-sales workflow the site never mentions. |
| Price lists, per-outlet category scoping | §1.3, §1.5 | Supports multi-outlet claims. |
| Barcode / keyboard-wedge SKU quick-add | §1.5 | Concrete, demonstrable retail capability. |
| Partial fulfilment, over-fulfilment and partial GRN states | §1.5, §2.2 | Directly supports the plan's "connected document chain" story. |
| Excel / PDF export on most reports | §1.7, §2.4 | A common procurement-evaluation question. |
| Permission gating (e.g. `SALES_COMPLETE`, `PURCHASES_REPORTS`) | §1.5, §2.4, §3.6 | Needed for honest "available to authorized users" phrasing. |
| Multi-outlet read-only aggregate view | §1.5 | Relevant to multi-site customers. |

---

## 8. Needs decision from ProsAfrica

Each item blocks the work named against it.

1. **Client logos** — is each of the 12 companies a live customer, and is there written permission for its mark? *Blocks: public launch of the homepage clients section.* **This is now the only control.** The `permitted` column that held each logo back until someone recorded its permission was removed on 4 November 2026 along with the rest of the data layer; all twelve are a plain array in `components/home-experience.tsx` and all twelve ship. Removing one means deleting its line.
2. **Positioning statement** — approve or revise the hero headline and lede. *Blocks: Phase 1 on the homepage.*
3. ~~**Module detail lines** — confirm or strike "RFQs" and "supplier responses" (module 03).~~ **Closed 28 October 2026 by striking them**, from module 03 and from the trading-distribution page (§5). Reopen only with a source: if RFQs exist in the product, they are a claim worth making.
4. **Report names** — confirm the eight unverified names, their availability, and permission dependencies. *Blocks: finance preview and hero quick-reports card.*
5. **Dashboard widgets** — which of the ten hero widgets are consistently available and configurable? *Blocks: Phase 1 finance-dashboard rework.*
6. **Fuel-station shifts** — confirm the shift and dipping model, given §1.7's note that POS has no formal shift open/close. *Blocks: fuel industry page and module 07.*
7. **Unsourced modules** — nominate an evidence owner for Financial management, Project management, Manufacturing, Fuel stations, Human resources and Asset Register. *Blocks: Phase 1 beyond POS and procurement.*
8. **Screenshots and demo environment** — which screens may be shown publicly, under what redaction rules, and which environment may be demonstrated? *Blocks: Phase 1 visual fidelity and Phase 4 demo content.*
9. **VFD/TRA and the other documented-but-unpublished capabilities** — which may become public claims? *Blocks: Phase 3 page content.*
10. **Stock thresholds** — is the Low Stock Alerts threshold configurable per item or store? *Blocks: the "stock against threshold" half of the hero proof line, and module 04's wording.*
11. **Photography** — two of the three unused photos cannot be published as they are (§10). Replace, repair, or confirm they stay unused. *Blocks: any further use of photography on the site.*
12. ~~**Deployment target** — where does this site run? SQLite needs a persistent disk; a serverless host loses every lead row silently.~~ **Closed 4 November 2026 by removing the database.** The site stores nothing, so it runs anywhere that runs Next.js. What replaced the risk is narrower and should be watched instead: the demo email is now the only record of a lead, so a failing SMTP configuration loses leads in real time rather than quietly mis-storing them.

## 10. Imagery

`public/images/` carries 60-odd files inherited from the template. Only four are referenced by the
new site: the two logos, the favicon, and `about-2.png`. Three photographs were held back for the
sections that had not been built yet; on inspection, **two of them cannot be published as they
are.** All three are generative, which is not itself the problem — what is on them is.

| File | State | Finding |
|---|---|---|
| `man-in-office.png` | **In use** — the adoption section (§2) | Clean. The laptop screen is small and generic and the mug reads "PROS". |
| `hero.png` | **Blocked** | Carries a visible AI-generation watermark — the four-point sparkle, bottom right. Publishing it marks the homepage as generated, in the one place a visitor looks first. |
| `happy-people.png` | **Blocked** | The wall screen shows a fabricated ProsERP dashboard whose labels are nonsense — "Dashbeard", "Total capsules", "Pestings". It is branded `pros erp`, so it reads as a screenshot of the real product, and it is not. |

Neither blocked image was edited; cropping the watermark out of `hero.png` would change what the
image is being presented as, which is the owner's call, not a copy fix. Both are recorded as
decision 11.

The standing rule for product imagery is unchanged and applies here: a picture of a ProsERP screen
must either be the real screen, cleared for publication, or be visibly synthetic and labelled. A
convincing fake with unreadable labels is the one option that is not available.

## 9. Phase 0 exit-condition status

> *Exit condition: every planned public claim and visual has a clear source or an explicit "needs confirmation" marker.*

**Met for the inventory itself** — every claim on the current site is now listed above and carries a tier.

**Not yet met for publication.** Outstanding:

- [ ] 12 client logos cleared or the section reworded *(highest risk)*
- [ ] Positioning statement approved
- [ ] Eight report names confirmed, and the "Item Movement" / "Stock Movement" duplication resolved
- [ ] Six unsourced modules assigned an evidence owner
- [ ] Screenshot and demo-environment policy agreed
- [x] Sample-labelling inconsistency in the finance report list fixed (26 Oct 2026)
- [x] Report-name drift between the hero card and the finance preview fixed (26 Oct 2026)
- [x] Illustrative/sample labelling audited — in good shape; the previews, industry pages, process-approval page and hero visual all carry visible disclaimers
- [x] Sample data checked for sensitivity — identifiers follow the "SAMPLE-001" / "Sample projects" convention and no live customer, employee, supplier or financial record appears in the source

## Known limits of this audit

- Based on the repository as of 26 October 2026; `components/home-experience.tsx`, the four industry pages, the process-approval page and the demo form were reviewed.
- Tier **A** means "matches a document reverse-engineered from the ERP frontend" — it is not owner sign-off, and the underlying product may have changed since that study.
- Visual fidelity was not assessed. Whether a preview *looks* like the real ProsERP screen is a Phase 1 question and needs the approved screen references from decision 8.
