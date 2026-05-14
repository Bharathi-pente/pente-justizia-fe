'use client';

import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { InsurancePolicy, ATEExposure } from '@/types/insurance.types';
import { ApiResponse } from '@/types/api.types';

export function useInsurance(cellId?: string, insurerId?: string) {
  // Get insurance policies for a cell
  const { data: policies, isLoading: policiesLoading } = useQuery({
    queryKey: ['insurance-policies', cellId],
    queryFn: async () => {
      const endpoint = cellId 
        ? `/api/cells/${cellId}/insurance` 
        : '/api/insurance/policies';
      const { data } = await axios.get<ApiResponse<InsurancePolicy[]>>(endpoint);
      return data.data;
    },
    enabled: !insurerId,
  });

  // Get ATE exposure (for insurer role)
  const { data: ateExposure, isLoading: exposureLoading } = useQuery({
    queryKey: ['ate-exposure', insurerId],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<ATEExposure>>(
        `/api/insurers/${insurerId}/exposure`
      );
      return data.data;
    },
    enabled: !!insurerId,
  });

  return {
    policies,
    ateExposure,
    isLoading: policiesLoading || exposureLoading,
  };
}
