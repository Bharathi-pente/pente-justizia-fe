'use client';

import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { Cell, CellKPIs } from '@/types/cell.types';
import { ApiResponse } from '@/types/api.types';

export function useDashboard(cellId?: string) {
  // Get all cells overview (for HQ roles)
  const { data: cells, isLoading: cellsLoading } = useQuery({
    queryKey: ['cells'],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Cell[]>>('/api/cells');
      return data.data;
    },
    enabled: !cellId, // Only fetch if no specific cellId
  });

  // Get specific cell data (for cell roles)
  const { data: cell, isLoading: cellLoading } = useQuery({
    queryKey: ['cell', cellId],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse<Cell>>(`/api/cells/${cellId}`);
      return data.data;
    },
    enabled: !!cellId,
  });

  // Get KPIs for all cells or specific cell
  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: ['kpis', cellId],
    queryFn: async () => {
      const endpoint = cellId ? `/api/cells/${cellId}/kpis` : '/api/dashboard/kpis';
      const { data } = await axios.get<ApiResponse<CellKPIs | CellKPIs[]>>(endpoint);
      return data.data;
    },
  });

  return {
    cells,
    cell,
    kpis,
    isLoading: cellsLoading || cellLoading || kpisLoading,
  };
}
