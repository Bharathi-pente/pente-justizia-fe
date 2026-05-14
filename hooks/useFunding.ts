'use client';

import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { FundingRecord, FunderPortfolio } from '@/types/funding.types';
import { ApiResponse } from '@/types/api.types';

export function useFunding(cellId?: string, funderId?: string) {
  // Get funding records for a cell
  const { data: fundingRecords, isLoading: recordsLoading } = useQuery({
    queryKey: ['funding-records', cellId],
    queryFn: async () => {
      const endpoint = cellId 
        ? `/api/cells/${cellId}/funding` 
        : '/api/funding/records';
      const { data } = await axios.get<ApiResponse<FundingRecord[]>>(endpoint);
      return data.data;
    },
    enabled: !funderId,
  });

  // Get funder portfolio (for funder role)
  const { data: funderPortfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ['funder-portfolio', funderId],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<FunderPortfolio>>(
        `/api/funders/${funderId}/portfolio`
      );
      return data.data;
    },
    enabled: !!funderId,
  });

  return {
    fundingRecords,
    funderPortfolio,
    isLoading: recordsLoading || portfolioLoading,
  };
}
