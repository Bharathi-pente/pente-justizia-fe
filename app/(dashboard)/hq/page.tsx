'use client';

import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Building2, Shield } from 'lucide-react';
import Link from 'next/link';

export default function HQOverviewPage() {
  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN, UserRole.HQ_COMPLIANCE, UserRole.HQ_BDM]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">HQ Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to Justizia - Legal Operations Intelligence Platform
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* User Management */}
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/hq/users">
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Cells */}
          <Card>
            <CardHeader>
              <Building2 className="h-8 w-8 mb-2 text-blue-600" />
              <CardTitle>Cells</CardTitle>
              <CardDescription>
                View and manage cell operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/hq/cells">
                <Button variant="outline" className="w-full">
                  <Building2 className="mr-2 h-4 w-4" />
                  View Cells
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Cases */}
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-green-600" />
              <CardTitle>Cases</CardTitle>
              <CardDescription>
                Monitor all case activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/cell/cases">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Cases
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2 text-orange-600" />
              <CardTitle>Compliance</CardTitle>
              <CardDescription>
                Review compliance and audits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/compliance">
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Compliance
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Welcome to the Justizia platform. As an HQ administrator, you have access to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>User management and registration approvals</li>
                <li>Cell oversight and performance monitoring</li>
                <li>Case pipeline and analytics</li>
                <li>Compliance and audit management</li>
                <li>Funding and insurance coordination</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Start by managing users or exploring cell operations above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
