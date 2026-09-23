

# Cloud7 Ecosystem & Dark-Cloud OS: Architecture Map

This guide maps the specific content, logic, and interfaces across the Cloud7 ecosystem. Use this index to rapidly locate where to make updates.

## 1. Public Portals & Marketing
* **`app/page.tsx`**: Cloud7 Executive Hub hero text, value propositions, and primary routing.
* **`app/verticalforge/page.tsx`**: Digital Deficit Diagnostic calculator, industry parameters, and ROI loss formulas.

## 2. Studio & Catalog Execution
* **`app/launch7/page.tsx`**: Launch7 Execution Studio UI, search logic, and deployment SLAs.
* **`lib/solutionsEngine.ts`**: The catalog of Launch7 architectural templates and deterministic logic.

## 3. Dark-Cloud Kitchen OS
* **`app/owner/page.tsx`**: Owner Command Center, real-time revenue aggregation, and active ticket alerts.
* **`app/cook/page.tsx`**: Line Cook Station for polling the local DB and firing orders.
* **`app/dispatch/page.tsx`**: Dispatch Station for managing courier handoffs.
* **`components/OrderSimulationPanel.tsx`**: Multi-brand mock order injector for testing the DB engine.
* **`middleware.ts`**: Dev-token lockdown, edge authentication, and role isolation.
* **`lib/db.ts`**: Zero-cost IndexedDB engine, schema definitions, and inventory seeding.
* **`app/api/orders/route.ts`**: REST ingestion endpoint and PII sanitization firewall.
* **`app/api/inventory/route.ts`**: Supplier webhook ingestion and script-injection sanitization.

## 4. Dependencies & Infrastructure
* **Package Management:** When updating core dependencies, locking versions, configuring tools via the CLI, or resolving build conflicts for Vercel, always consult the Package Manager Configuration and Detection Guide[cite: 3] to ensure environment parity and correct installation procedures[cite: 3].
* **`app/layout.tsx`**: Global typography configuration, CSS variables (`--bg-void`), and main navigation.
* **`tsconfig.json`**: Next.js 14 compiler options, DOM library inclusion, and path aliases.
