'use client';

import { UserRole } from '@/types/auth.types';
import { useAuth } from './useAuth';

type Permission = 
  | 'view:all-cells'
  | 'view:own-cell'
  | 'write:cases'
  | 'write:compliance'
  | 'view:compliance'
  | 'view:funding'
  | 'view:insurance'
  | 'manage:users'
  | 'view:audit';

const PERMISSIONS: Record<Permission, UserRole[]> = {
  'view:all-cells': [
    UserRole.HQ_ADMIN,
    UserRole.HQ_COMPLIANCE,
    UserRole.HQ_BDM,
    UserRole.FUNDER,
    UserRole.INSURER,
  ],
  'view:own-cell': [
    UserRole.CELL_ADMIN,
    UserRole.CELL_SOLICITOR,
    UserRole.CELL_PARALEGAL,
  ],
  'write:cases': [
    UserRole.HQ_ADMIN,
    UserRole.CELL_ADMIN,
    UserRole.CELL_SOLICITOR,
  ],
  'write:compliance': [
    UserRole.HQ_ADMIN,
    UserRole.HQ_COMPLIANCE,
  ],
  'view:compliance': [
    UserRole.HQ_ADMIN,
    UserRole.HQ_COMPLIANCE,
    UserRole.HQ_BDM,
  ],
  'view:funding': [
    UserRole.HQ_ADMIN,
    UserRole.HQ_BDM,
    UserRole.FUNDER,
    UserRole.CELL_ADMIN,
  ],
  'view:insurance': [
    UserRole.HQ_ADMIN,
    UserRole.INSURER,
    UserRole.CELL_ADMIN,
  ],
  'manage:users': [
    UserRole.HQ_ADMIN,
  ],
  'view:audit': [
    UserRole.HQ_ADMIN,
    UserRole.HQ_COMPLIANCE,
  ],
};

export function useRoleAccess() {
  const { user, role, cellId, fundedCellIds } = useAuth();

  const can = (permission: Permission): boolean => {
    if (!role) return false;
    return PERMISSIONS[permission]?.includes(role) || false;
  };

  const canAccessCell = (targetCellId: string): boolean => {
    if (!role || !user) return false;

    // HQ roles can access all cells
    if (
      role === UserRole.HQ_ADMIN ||
      role === UserRole.HQ_COMPLIANCE ||
      role === UserRole.HQ_BDM
    ) {
      return true;
    }

    // Cell roles can only access their own cell
    if (
      role === UserRole.CELL_ADMIN ||
      role === UserRole.CELL_SOLICITOR ||
      role === UserRole.CELL_PARALEGAL
    ) {
      return cellId === targetCellId;
    }

    // Funder can access funded cells
    if (role === UserRole.FUNDER) {
      return fundedCellIds?.includes(targetCellId) || false;
    }

    // Insurer can access all cells (for ATE coverage)
    if (role === UserRole.INSURER) {
      return true;
    }

    return false;
  };

  const isHQRole = (): boolean => {
    return role === UserRole.HQ_ADMIN || 
           role === UserRole.HQ_COMPLIANCE || 
           role === UserRole.HQ_BDM;
  };

  const isCellRole = (): boolean => {
    return role === UserRole.CELL_ADMIN || 
           role === UserRole.CELL_SOLICITOR || 
           role === UserRole.CELL_PARALEGAL;
  };

  return {
    can,
    canAccessCell,
    isHQRole,
    isCellRole,
  };
}
