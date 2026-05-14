'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { User, CreateUserInput, UpdateUserInput, UserFilters } from '@/types/user.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

export function useUsers(filters?: UserFilters) {
  const queryClient = useQueryClient();

  // Get paginated users list
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.role) params.append('role', filters.role);
      if (filters?.cellId) params.append('cellId', filters.cellId);

      const { data } = await axios.get<PaginatedResponse<User>>(
        `/api/users?${params.toString()}`
      );
      return data;
    },
  });

  // Get single user
  const useUser = (userId: string) => {
    return useQuery({
      queryKey: ['user', userId],
      queryFn: async () => {
        const { data } = await axios.get<ApiResponse<User>>(`/api/users/${userId}`);
        return data.data;
      },
      enabled: !!userId,
    });
  };

  // Create user mutation
  const createUser = useMutation({
    mutationFn: async (userData: CreateUserInput) => {
      const { data } = await axios.post<ApiResponse<User>>('/api/users', userData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: async ({ userId, userData }: { userId: string; userData: UpdateUserInput }) => {
      const { data } = await axios.patch<ApiResponse<User>>(`/api/users/${userId}`, userData);
      return data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`/api/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersData?.data || [],
    meta: usersData?.meta,
    isLoading,
    useUser,
    createUser,
    updateUser,
    deleteUser,
  };
}