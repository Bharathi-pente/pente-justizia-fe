'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { Case, CasePipeline } from '@/types/case.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

interface CaseFilters {
  page?: number;
  limit?: number;
  status?: string;
  stage?: string;
  search?: string;
}

export function useCases(cellId: string, filters?: CaseFilters) {
  const queryClient = useQueryClient();

  // Get paginated cases list
  const { data: casesData, isLoading: casesLoading } = useQuery({
    queryKey: ['cases', cellId, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.status) params.append('status', filters.status);
      if (filters?.stage) params.append('stage', filters.stage);
      if (filters?.search) params.append('search', filters.search);

      const { data } = await axios.get<PaginatedResponse<Case>>(
        `/api/cells/${cellId}/cases?${params.toString()}`
      );
      return data;
    },
    enabled: !!cellId,
  });

  // Get single case detail
  const useCase = (caseId: string) => {
    return useQuery({
      queryKey: ['case', caseId],
      queryFn: async () => {
        const { data } = await axios.get<ApiResponse<Case>>(`/api/cases/${caseId}`);
        return data.data;
      },
      enabled: !!caseId,
    });
  };

  // Get case pipeline data
  const { data: pipeline, isLoading: pipelineLoading } = useQuery({
    queryKey: ['case-pipeline', cellId],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<CasePipeline[]>>(
        `/api/cells/${cellId}/cases/pipeline`
      );
      return data.data;
    },
    enabled: !!cellId,
  });

  // Create case mutation
  const createCase = useMutation({
    mutationFn: async (caseData: Partial<Case>) => {
      const { data } = await axios.post<ApiResponse<Case>>(
        `/api/cells/${cellId}/cases`,
        caseData
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases', cellId] });
      queryClient.invalidateQueries({ queryKey: ['case-pipeline', cellId] });
    },
  });

  // Update case mutation
  const updateCase = useMutation({
    mutationFn: async ({ caseId, caseData }: { caseId: string; caseData: Partial<Case> }) => {
      const { data } = await axios.patch<ApiResponse<Case>>(
        `/api/cases/${caseId}`,
        caseData
      );
      return data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cases', cellId] });
      queryClient.invalidateQueries({ queryKey: ['case', variables.caseId] });
      queryClient.invalidateQueries({ queryKey: ['case-pipeline', cellId] });
    },
  });

  return {
    cases: casesData?.data || [],
    meta: casesData?.meta,
    pipeline,
    isLoading: casesLoading || pipelineLoading,
    useCase,
    createCase,
    updateCase,
  };
}
