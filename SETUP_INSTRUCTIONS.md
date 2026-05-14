# Justizia Frontend - Setup Instructions

## Installation Steps

1. **Navigate to the frontend directory:**
   ```bash
   cd C:\projects\Justizia_projects\pente-justizia-fe
   ```

2. **Install the missing dependency:**
   The project requires `tailwindcss-animate` which needs to be added to package.json. Run:
   ```bash
   npm install tailwindcss-animate
   ```

3. **Install all dependencies:**
   ```bash
   npm install
   ```

4. **Configure environment variables:**
   - Review `.env.local` and update with your Keycloak and API URLs
   - Default values are set for local development

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000

## Important Notes

### Keycloak Setup Required
Before running the frontend, ensure:
- Keycloak server is running (typically on port 8080)
- The `justizia` realm is configured
- The `justizia-frontend` client is created in Keycloak with:
  - Access Type: public
  - Valid Redirect URIs: http://localhost:3000/*
  - Web Origins: http://localhost:3000

### Backend API
- Ensure the backend API is running on the configured port (default: 3001)
- The frontend expects the API to be available at `http://localhost:3001`

## Project Structure Overview

```
pente-justizia-fe/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/login/            # Login page
│   ├── (dashboard)/             # Protected routes
│   │   ├── hq/                  # HQ views (hq_admin, hq_compliance, hq_bdm)
│   │   ├── cell/                # Cell operator views
│   │   ├── compliance/          # Compliance management
│   │   ├── funder/              # Funder portfolio view
│   │   └── insurer/             # Insurer ATE exposure view
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page (redirects to role-based view)
│
├── components/
│   ├── ui/                      # shadcn/ui base components
│   ├── layout/                  # Sidebar, Header, RoleGuard
│   ├── dashboard/               # KPICard, Charts, Tables
│   ├── compliance/              # SRA Checklist, Issues, Audits
│   ├── cases/                   # Case management components
│   ├── funding/                 # Funding components
│   └── insurance/               # Insurance components
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Keycloak authentication
│   ├── useRoleAccess.ts        # RBAC permissions
│   ├── useDashboard.ts         # Dashboard data
│   ├── useCases.ts             # Cases data
│   ├── useCompliance.ts        # Compliance data
│   ├── useFunding.ts           # Funding data
│   └── useInsurance.ts         # Insurance data
│
├── lib/
│   ├── keycloak.ts             # Keycloak instance
│   ├── axios.ts                # Axios with token interceptor
│   ├── query-client.ts         # TanStack Query config
│   └── utils.ts                # Utility functions
│
├── providers/
│   ├── KeycloakProvider.tsx    # Keycloak auth wrapper
│   ├── QueryProvider.tsx       # React Query wrapper
│   └── AppProviders.tsx        # Combined providers
│
├── store/
│   ├── auth.store.ts           # Zustand auth state
│   └── ui.store.ts             # Zustand UI state
│
├── types/                       # TypeScript type definitions
│   ├── auth.types.ts
│   ├── cell.types.ts
│   ├── case.types.ts
│   ├── compliance.types.ts
│   ├── funding.types.ts
│   ├── insurance.types.ts
│   └── api.types.ts
│
└── middleware.ts                # Next.js route protection
```

## Role-Based Access Control

The application implements 8 distinct user roles:

| Role | Code | Access |
|------|------|--------|
| HQ Admin | `hq_admin` | Full system access, user management |
| HQ Compliance | `hq_compliance` | Compliance oversight, audit management |
| HQ BDM | `hq_bdm` | Business development, portfolio view |
| Cell Admin | `cell_admin` | Full access to own cell |
| Cell Solicitor | `cell_solicitor` | Case management in own cell |
| Cell Paralegal | `cell_paralegal` | Limited case access in own cell |
| Funder | `funder` | Portfolio and funding view for funded cells |
| Insurer | `insurer` | ATE exposure and policy management |

## Key Features Implemented

### 1. Authentication & Authorization
- ✅ Keycloak SSO integration
- ✅ Automatic token refresh
- ✅ Role-based navigation
- ✅ Protected routes with RoleGuard
- ✅ Permission-based UI rendering

### 2. Dashboard Views
- ✅ HQ Overview with cross-cell KPIs
- ✅ Cell operator dashboard
- ✅ Compliance management interface
- ✅ Funder portfolio view
- ✅ Insurer ATE exposure view

### 3. Data Management
- ✅ React Query for server state
- ✅ Zustand for client state
- ✅ Optimistic updates
- ✅ Automatic cache invalidation

### 4. UI Components
- ✅ Responsive tables with search/filter/export
- ✅ Interactive charts (Recharts)
- ✅ Loading states (Skeleton)
- ✅ Professional legal/fintech design
- ✅ Mobile-responsive layout

### 5. Developer Experience
- ✅ TypeScript with strict typing
- ✅ ESLint configuration
- ✅ Tailwind CSS with custom theme
- ✅ Component library (shadcn/ui)

## Next Steps

1. **Test Authentication Flow:**
   - Create test users in Keycloak with different roles
   - Verify login and role-based navigation

2. **Connect to Backend:**
   - Ensure backend API is running
   - Test data fetching for all views

3. **Customize Styling:**
   - Adjust color scheme in `tailwind.config.ts`
   - Add company logo to `Sidebar.tsx`

4. **Add Additional Features:**
   - Case detail drawer/modal
   - User management interface
   - Advanced filtering
   - Real-time notifications

## Troubleshooting

### "Module not found: tailwindcss-animate"
Run: `npm install tailwindcss-animate`

### Keycloak connection errors
- Verify Keycloak is running on the configured URL
- Check that the realm and client are configured correctly
- Ensure redirect URIs match your frontend URL

### API connection errors
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS configuration on backend

## Production Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Update environment variables** for production:
   - Set production API URL
   - Set production Keycloak URL
   - Configure proper redirect URIs

3. **Deploy** using your preferred hosting platform:
   - Vercel (recommended for Next.js)
   - AWS Amplify
   - Azure Static Web Apps
   - Self-hosted with Docker

## Support

For issues or questions, refer to:
- Next.js documentation: https://nextjs.org/docs
- Keycloak documentation: https://www.keycloak.org/docs
- shadcn/ui documentation: https://ui.shadcn.com
