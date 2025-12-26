# Notion Invoice Manager - AI Agent Development Standards

> **Purpose**: This document provides project-specific rules for AI agents working on this codebase. It focuses on architectural patterns, file organization, and implementation standards unique to this project.

---

## Project Context

- **Project**: Notion Invoice Manager MVP
- **Purpose**: Read-only web app to view invoices from Notion database and generate PDFs
- **Tech Stack**: Next.js 16.1 (App Router), TypeScript (strict mode), Tailwind CSS v4, shadcn/ui, Notion API, @react-pdf/renderer
- **Reference**: Product requirements in `docs/notion-prd.md`

---

## 1. Architecture Rules

### Route Group Structure

**DO:**
- Create pages with header/footer in `app/(main)/[page-name]/page.tsx`
- Route groups use parentheses: `(main)`, `(auth)`, etc.
- URLs do NOT include route group names (e.g., `/invoices` not `/(main)/invoices`)

**NEVER:**
- Create pages outside route groups unless you understand the layout implications
- Modify `app/(main)/layout.tsx` without reviewing Header/Footer dependencies

### Layout Hierarchy

```
app/layout.tsx                    → Root: ThemeProvider, Inter font, metadata
└── app/(main)/layout.tsx         → Main: Header + Footer wrapper
    ├── app/(main)/page.tsx       → Home page
    ├── app/(main)/invoices/page.tsx → Invoice list
    └── app/(main)/invoices/[id]/page.tsx → Invoice detail (NOT YET CREATED)
```

**MUST:**
- Keep root layout minimal (ThemeProvider only)
- Place Header/Footer logic in `app/(main)/layout.tsx`
- Set `suppressHydrationWarning` on `<html>` and `<body>` for dark mode

---

## 2. File Organization Rules

### Component Organization

| Location | Purpose | Examples | Modification Rules |
|----------|---------|----------|-------------------|
| `components/ui/` | shadcn/ui components | button.tsx, card.tsx, form.tsx | **NEVER modify** - extend via wrappers |
| `components/` | Custom project components | header.tsx, footer.tsx, nav-menu.tsx | **Modify as needed** |
| `lib/` | Utilities and validation | utils.ts, validations.ts | **Centralized location** |
| `types/` | TypeScript type definitions | index.ts | **All shared types** |
| `app/api/` | API routes | [route]/route.ts | **Server-side logic** |

### File Naming Conventions

**MUST use kebab-case for files:**
```
✅ nav-menu.tsx
✅ theme-toggle.tsx
✅ invoice-card.tsx

❌ NavMenu.tsx (PascalCase)
❌ nav_menu.tsx (snake_case)
```

**Special file names (Next.js conventions):**
- `page.tsx` - Route pages
- `layout.tsx` - Layout wrappers
- `route.ts` - API endpoints
- `loading.tsx` - Loading states
- `error.tsx` - Error boundaries
- `not-found.tsx` - 404 pages

---

## 3. Navigation Management

### Adding New Pages

**MUST update `components/nav-menu.tsx` when adding navigable pages:**

```typescript
// components/nav-menu.tsx
const routes = [
  { href: "/" as const, label: "Home" },
  { href: "/invoices" as const, label: "Invoices" },
  { href: "/new-page" as const, label: "New Page" }, // ← Add here
] as const;
```

**Rules:**
- Use `as const` for type safety
- Keep `href` values matching actual route paths
- NavMenu is a client component (requires `"use client"`)
- Active state is managed via `usePathname()`

---

## 4. TypeScript & Validation Rules

### Strict Mode Requirements

**TypeScript config enforces:**
- `noUnusedLocals: true` - ZERO unused variables allowed
- `noUnusedParameters: true` - ZERO unused function parameters allowed
- `noFallthroughCasesInSwitch: true` - ALL switch cases must break/return
- `strict: true` - All strict type checking enabled

**Before committing:**
```bash
npm run type-check  # MUST pass with zero errors
```

### Type Definition Rules

**MUST define shared types in `types/index.ts`:**

```typescript
// ✅ Correct: types/index.ts
export interface Invoice {
  id: string;
  invoice_number: string;
  // ... (matches PRD spec)
}

// ❌ Wrong: Inline types in components
interface Invoice { ... }  // Don't do this
```

**Invoice Type Structure (MUST match PRD):**
- Use `snake_case` for property names (matches Notion API)
- Required fields: `Invoice` and `InvoiceItem` interfaces
- Wrap API responses with `ApiResponse<T>` generic

### Validation Schema Rules

**MUST define all Zod schemas in `lib/validations.ts`:**

```typescript
// lib/validations.ts
export const invoiceSearchSchema = z.object({
  query: z.string().optional(),
});

export type InvoiceSearchFormData = z.infer<typeof invoiceSearchSchema>;
```

**Rules:**
- Schema name: `[feature]Schema`
- Type name: `[Feature]FormData`
- ALWAYS export both schema and inferred type
- Use with React Hook Form: `zodResolver(schema)`

---

## 5. Import Path Rules

### MUST Use Path Alias

**ALWAYS use `@/*` alias (NEVER relative imports):**

```typescript
// ✅ Correct
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Invoice } from "@/types";

// ❌ Wrong
import { Button } from "../../../components/ui/button";
import { cn } from "../../lib/utils";
```

**Alias Configuration:**
- `@/*` maps to project root (configured in `tsconfig.json`)
- Works in all files: components, pages, API routes

---

## 6. Server vs Client Components

### Default to Server Components

**DO NOT add `"use client"` unless you need:**
- React hooks: `useState`, `useEffect`, `usePathname`, `useTheme`, etc.
- Browser APIs: `window`, `document`, `localStorage`
- Event handlers: `onClick`, `onChange`, `onSubmit`
- Third-party libraries requiring browser context

### Component Type Examples

```typescript
// ✅ Server Component (default)
export default async function InvoicesPage() {
  const invoices = await fetchInvoices(); // Direct data fetching
  return <div>{/* ... */}</div>;
}

// ✅ Client Component (when necessary)
"use client";
import { useState } from "react";
export function SearchForm() {
  const [query, setQuery] = useState("");
  return <form>{/* ... */}</form>;
}
```

**Rules:**
- Forms with React Hook Form: **Client component**
- Navigation menu (usePathname): **Client component**
- Theme toggle (useTheme): **Client component**
- Data display pages: **Server component (preferred)**

---

## 7. Notion API Integration

### API Access Pattern

**MUST use server-side only:**
```typescript
// ✅ Option 1: Server Component (preferred)
import { Client } from '@notionhq/client';

export default async function InvoicesPage() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  // ...
}

// ✅ Option 2: API Route
// app/api/invoices/route.ts
import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // ...
  return NextResponse.json(response);
}
```

**NEVER:**
- Use Notion API in client components
- Expose API keys to browser (no NEXT_PUBLIC_ prefix)

### Data Mapping Rules

**Notion Properties → Invoice Type Mapping:**

| Notion Property | Notion Type | Invoice Field | Transform |
|----------------|-------------|---------------|-----------|
| Page ID | - | `id` | Direct |
| Invoice Number | Title | `invoice_number` | Extract title text |
| Issue Date | Date | `issue_date` | Convert to ISO string |
| Client Name | Text | `client_name` | Direct |
| Total Amount | Number | `total_amount` | Direct |
| Currency | Select | `currency` | Extract select name |
| Items | Text | `items` | Parse JSON string → `InvoiceItem[]` |

**MUST:**
- Parse `items` field from JSON string to `InvoiceItem[]` array
- Validate data structure matches `Invoice` interface
- Handle missing/null fields gracefully

### Environment Variables

**Required in `.env.local` (NOT committed):**
```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Rules:**
- NEVER commit `.env.local` to repository
- Create `.env.example` for documentation only
- Server variables: `process.env.VARIABLE_NAME`
- Client variables: Must use `NEXT_PUBLIC_` prefix

---

## 8. API Route Standards

### Response Pattern

**MUST wrap all API responses with `ApiResponse<T>`:**

```typescript
// app/api/invoices/route.ts
import { NextResponse } from 'next/server';
import type { ApiResponse, Invoice } from '@/types';

export async function GET() {
  try {
    const invoices = await fetchInvoices();

    const response: ApiResponse<Invoice[]> = {
      success: true,
      data: invoices,
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: ApiResponse<never> = {
      success: false,
      error: 'Failed to fetch invoices',
      message: error instanceof Error ? error.message : 'Unknown error',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
```

**Error Handling Rules:**
- Wrap async operations in try-catch
- Return appropriate HTTP status codes (200, 400, 404, 500)
- Use consistent error response structure
- Log errors for debugging
- Don't expose sensitive information to client

---

## 9. Styling Standards

### Tailwind CSS Patterns

**MUST use semantic color tokens:**
```typescript
// ✅ Correct (theme-aware)
<div className="bg-background text-foreground border rounded-lg">
  <p className="text-muted-foreground">Description</p>
</div>

// ❌ Wrong (hardcoded colors)
<div className="bg-white text-black border-gray-200">
  <p className="text-gray-500">Description</p>
</div>
```

**Common Semantic Tokens:**
- `bg-background` - Main background
- `bg-card` - Card background
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `border` - Default border color

### Standard Page Layout

**MUST follow this structure for pages:**

```typescript
export default function PageName() {
  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Title</h1>
          <p className="text-muted-foreground mt-2">Page description</p>
        </div>

        <div className="rounded-lg border bg-card p-8">
          {/* Page content */}
        </div>
      </div>
    </div>
  );
}
```

### Class Merging

**MUST use `cn()` utility for conditional classes:**

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  variant === "primary" && "variant-classes"
)} />
```

---

## 10. Metadata Pattern

**MUST export metadata for each page:**

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Name - Notion Invoice Manager",
  description: "Clear description of page purpose",
};

export default function PageName() {
  // ...
}
```

**Title Format:**
- Root: `"Notion Invoice Manager"`
- Pages: `"[Page Name] - Notion Invoice Manager"`

---

## 11. PDF Generation Rules

### Implementation Pattern

**MUST use `@react-pdf/renderer` (already installed):**

```typescript
// lib/pdf/invoice-template.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Invoice } from '@/types';

export function InvoicePDF({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Invoice #{invoice.invoice_number}</Text>
        </View>
        {/* Match web view layout */}
      </Page>
    </Document>
  );
}
```

**PDF Generation Flow:**
1. Create PDF component with `@react-pdf/renderer`
2. Generate PDF server-side in API route
3. Return PDF blob to client
4. Trigger download via browser

**Rules:**
- PDF layout MUST match invoice detail page visual design
- Include ALL fields from `Invoice` interface
- Server-side generation (API route, not client)
- Filename pattern: `invoice-{invoice_number}.pdf`

---

## 12. shadcn/ui Component Management

### Adding Components

**MUST use project skill:**
```bash
/ui add [component-name]
```

**Or use shadcn CLI directly:**
```bash
npx shadcn@latest add [component-name]
```

### Modification Rules

**NEVER modify files in `components/ui/`:**
```typescript
// ❌ Wrong: Editing components/ui/button.tsx
// DON'T DO THIS

// ✅ Correct: Create wrapper in components/
// components/custom-button.tsx
import { Button } from "@/components/ui/button";

export function CustomButton({ children, ...props }) {
  return (
    <Button className="custom-styles" {...props}>
      {children}
    </Button>
  );
}
```

**Rules:**
- `components/ui/*` are generated by shadcn - treat as read-only
- Extend via wrapper components in `components/`
- Don't manually edit `components.json`

---

## 13. Invoice Workflow Rules

### Read-Only Application

**CRITICAL UNDERSTANDING:**
- Invoice creation happens **in Notion ONLY**
- This web app is **READ-ONLY** for invoice data
- NO create/update/delete operations on invoices
- Users manage invoices directly in Notion database

### Feature Scope

**DO implement:**
- ✅ Fetch invoices from Notion
- ✅ Display invoice list with search
- ✅ Show invoice details
- ✅ Generate PDF downloads
- ✅ Share invoice links

**DO NOT implement:**
- ❌ Invoice creation forms
- ❌ Invoice editing functionality
- ❌ Invoice deletion
- ❌ User authentication (MVP scope)
- ❌ Payment processing

### Dynamic Routes

**Invoice detail pages use Notion page ID:**
```
URL Pattern: /invoices/[id]
File: app/(main)/invoices/[id]/page.tsx

Where [id] = Notion page ID
```

---

## 14. Prohibited Actions

### File Modifications

**NEVER:**
- ❌ Modify `components/ui/*` files (shadcn components)
- ❌ Manually edit `components.json`
- ❌ Commit `.env.local` or `.env` files
- ❌ Use relative imports (`../../../`)
- ❌ Create PascalCase.tsx file names

### Code Patterns

**NEVER:**
- ❌ Add `"use client"` to server components unnecessarily
- ❌ Call Notion API from client components
- ❌ Hardcode API keys or secrets in code
- ❌ Leave unused variables/parameters (strict mode will fail)
- ❌ Skip TypeScript types or use `any` without justification
- ❌ Create route groups without understanding layout hierarchy

### Architecture

**NEVER:**
- ❌ Implement invoice creation/editing (Notion-only)
- ❌ Add authentication in MVP phase (future scope)
- ❌ Modify invoice data via API (read-only app)
- ❌ Use client-side environment variables for secrets

---

## 15. Decision Trees

### When Creating a New Page

```
1. Does it need header/footer?
   ├─ YES → Create in app/(main)/[page-name]/page.tsx
   └─ NO → Create in app/[page-name]/page.tsx (rare)

2. Update navigation?
   ├─ Public page → Add to components/nav-menu.tsx
   └─ Deep-linked only → Skip nav update

3. Export metadata?
   └─ ALWAYS export const metadata: Metadata
```

### When Creating a New Component

```
1. Is it from shadcn/ui?
   ├─ YES → Use /ui add [component]
   └─ NO → Continue...

2. Is it project-specific?
   ├─ YES → Create in components/[name].tsx
   └─ Is it a shadcn variant?
       └─ Create wrapper in components/

3. Does it need client-side features?
   ├─ YES → Add "use client"
   └─ NO → Keep as server component
```

### When Adding New API Route

```
1. Create file: app/api/[route]/route.ts

2. Export HTTP method handlers:
   export async function GET() { }
   export async function POST() { }

3. Wrap responses with ApiResponse<T>

4. Add try-catch error handling

5. Return appropriate status codes
```

---

## 16. Multi-File Coordination

### When Updating Navigation

**MUST update both files:**

1. **Create page file:**
   ```typescript
   // app/(main)/new-page/page.tsx
   export const metadata = { title: "New Page - Notion Invoice Manager" };
   export default function NewPage() { }
   ```

2. **Update navigation:**
   ```typescript
   // components/nav-menu.tsx
   const routes = [
     // existing routes...
     { href: "/new-page" as const, label: "New Page" },
   ] as const;
   ```

### When Adding New Validation Schema

**MUST coordinate:**

1. **Define schema in lib/validations.ts:**
   ```typescript
   export const newFormSchema = z.object({ ... });
   export type NewFormData = z.infer<typeof newFormSchema>;
   ```

2. **Use in component:**
   ```typescript
   import { newFormSchema, type NewFormData } from "@/lib/validations";
   const form = useForm<NewFormData>({
     resolver: zodResolver(newFormSchema),
   });
   ```

### When Adding New Type

**MUST coordinate:**

1. **Define in types/index.ts:**
   ```typescript
   export interface NewType { ... }
   ```

2. **Import with type keyword:**
   ```typescript
   import type { NewType } from "@/types";
   ```

---

## 17. Quality Checklist

Before completing any task, verify:

### TypeScript
- [ ] `npm run type-check` passes with zero errors
- [ ] No unused variables or parameters
- [ ] All types properly defined in `types/index.ts`
- [ ] No `any` types without justification

### Code Style
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run format:check` confirms proper formatting
- [ ] File names use kebab-case.tsx
- [ ] Imports use `@/*` alias

### Architecture
- [ ] Server components by default
- [ ] `"use client"` only when necessary
- [ ] Notion API calls server-side only
- [ ] API responses wrapped in `ApiResponse<T>`

### UI/UX
- [ ] Semantic color tokens used
- [ ] Dark mode compatible
- [ ] Responsive design considered
- [ ] Metadata exported for pages

### Documentation
- [ ] Navigation updated if needed
- [ ] Types added if shared across files
- [ ] Validation schemas centralized
- [ ] PRD alignment verified

---

## 18. Examples

### ✅ GOOD: Creating Invoice Detail Page

```typescript
// 1. Create page file
// app/(main)/invoices/[id]/page.tsx

import { Client } from '@notionhq/client';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Invoice } from '@/types';

export const metadata: Metadata = {
  title: "Invoice Details - Notion Invoice Manager",
};

async function getInvoice(id: string): Promise<Invoice | null> {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  try {
    const page = await notion.pages.retrieve({ page_id: id });
    // Transform Notion page to Invoice type
    return transformNotionPageToInvoice(page);
  } catch {
    return null;
  }
}

export default async function InvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = await getInvoice(params.id);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Invoice #{invoice.invoice_number}
        </h1>
        {/* ... */}
      </div>
    </div>
  );
}
```

### ❌ BAD: Common Mistakes

```typescript
// ❌ Client-side Notion API call
"use client";
import { Client } from '@notionhq/client';  // NEVER in client components

// ❌ Relative imports
import { Button } from "../../../components/ui/button";

// ❌ PascalCase file name
// InvoiceCard.tsx

// ❌ Unused variables (strict mode violation)
const unused = "something";

// ❌ Modifying shadcn component directly
// components/ui/button.tsx - NEVER edit this

// ❌ Inline types
interface Invoice { }  // Should be in types/index.ts

// ❌ Missing "use client" for hooks
export function Component() {
  const [state, setState] = useState();  // Needs "use client"
}
```

---

**Document Version**: 1.0
**Last Updated**: 2025-12-26
**Maintained By**: AI Agent System
