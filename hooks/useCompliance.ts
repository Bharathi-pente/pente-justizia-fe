'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { 
  ComplianceItem, 
  ComplianceScore, 
  ComplianceIssue, 
  AuditSchedule 
} from '@/types/compliance.types';
import { ApiResponse } from '@/types/api.types';

export function useCompliance(cellId?: string) {
  const queryClient = useQueryClient();

  // Get compliance items for a cell or all cells
  const { data: complianceItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['compliance-items', cellId],
    queryFn: async () => {
      const endpoint = cellId 
        ? `/api/cells/${cellId}/compliance` 
        : '/api/compliance/items';
      const { data } = await axios.get<ApiResponse<ComplianceItem[]>>(endpoint);
      return data.data;
    },
  });

  // Get compliance score for a cell or all cells
  const { data: complianceScore, isLoading: scoreLoading } = useQuery({
    queryKey: ['compliance-score', cellId],
    queryFn: async () => {
      const endpoint = cellId 
        ? `/api/cells/${cellId}/compliance/score` 
        : '/api/compliance/scores';
      const { data } = await axios.get<ApiResponse<ComplianceScore | ComplianceScore[]>>(endpoint);
      return data.data;
    },
  });

  // Get open compliance issues
  const { data: openIssues, isLoading: issuesLoading } = useQuery({
    queryKey: ['compliance-issues', cellId],
    queryFn: async () => {
      const endpoint = cellId 
        ? `/api/cells/${cellId}/compliance/issues` 
        : '/api/compliance/issues';
      const { data } = await axios.get<ApiResponse<ComplianceIssue[]>>(endpoint);
      return data.data;
    },
  });

  // Get audit schedule
  const { data: auditSchedule, isLoading: scheduleLoading } = useQuery({
    queryKey: ['audit-schedule', cellId],
    queryFn: async () => {
      const endpoint = cellId 
        ? `/api/cells/${cellId}/audits` 
        : '/api/compliance/audits';
      const { data } = await axios.get<ApiResponse<AuditSchedule[]>>(endpoint);
      return data.data;
    },
  });

  // Update compliance item
  const updateComplianceItem = useMutation({
    mutationFn: async ({ itemId, itemData }: { itemId: string; itemData: Partial<ComplianceItem> }) => {
      const { data } = await axios.patch<ApiResponse<ComplianceItem>>(
        `/api/compliance/items/${itemId}`,
        itemData
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-items', cellId] });
      queryClient.invalidateQueries({ queryKey: ['compliance-score', cellId] });
    },
  });

  // Create compliance issue
  const createIssue = useMutation({
    mutationFn: async (issueData: Partial<ComplianceIssue>) => {
      const { data } = await axios.post<ApiResponse<ComplianceIssue>>(
        '/api/compliance/issues',
        issueData
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-issues', cellId] });
      queryClient.invalidateQueries({ queryKey: ['compliance-score', cellId] });
    },
  });

  // Update compliance issue
  const updateIssue = useMutation({
    mutationFn: async ({ issueId, issueData }: { issueId: string; issueData: Partial<ComplianceIssue> }) => {
      const { data } = await axios.patch<ApiResponse<ComplianceIssue>>(
        `/api/compliance/issues/${issueId}`,
        issueData
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-issues', cellId] });
      queryClient.invalidateQueries({ queryKey: ['compliance-score', cellId] });
    },
  });

  return {
    complianceItems,
    complianceScore,
    openIssues,
    auditSchedule,
    isLoading: itemsLoading || scoreLoading || issuesLoading || scheduleLoading,
    updateComplianceItem,
    createIssue,
    updateIssue,
  };
}
