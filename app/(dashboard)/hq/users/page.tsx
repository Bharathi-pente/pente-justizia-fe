'use client';

import { useState, useEffect } from 'react';
import { RoleGuard } from '@/components/layout/RoleGuard';
import { UserRole } from '@/types/auth.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, UserCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';

export default function UsersManagementPage() {
  const [stats, setStats] = useState({ totalUsers: 0, hqUsers: 0, cellUsers: 0, pendingUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/auth/stats');
        
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  return (
    <RoleGuard roles={[UserRole.HQ_ADMIN]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage HQ users and approve pending registrations
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Create HQ User */}
          <Card>
            <CardHeader>
              <UserPlus className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Create HQ User</CardTitle>
              <CardDescription>
                Add new HQ admin, compliance, or BDM users directly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/hq/users/create">
                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* View All Users */}
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-blue-600" />
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                View and manage all users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/hq/users/list">
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  View Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <UserCheck className="h-8 w-8 mb-2 text-orange-600" />
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Review and approve funder/insurer signup requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/hq/users/pending">
                <Button variant="outline" className="w-full">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Review Pending
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">HQ Users</p>
                  <p className="text-2xl font-bold">{stats.hqUsers}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Cell Users</p>
                  <p className="text-2xl font-bold">{stats.cellUsers}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingUsers}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}