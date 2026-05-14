export enum UserRole {
  HQ_ADMIN = 'hq_admin',
  HQ_COMPLIANCE = 'hq_compliance',
  HQ_BDM = 'hq_bdm',
  CELL_ADMIN = 'cell_admin',
  CELL_SOLICITOR = 'cell_solicitor',
  CELL_PARALEGAL = 'cell_paralegal',
  FUNDER = 'funder',
  INSURER = 'insurer',
}

export interface AuthUser {
  id: string;           // keycloak sub
  email: string;
  name: string;
  role: UserRole;
  cellId?: string;           // for cell_* roles
  fundedCellIds?: string[];  // for funder role
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  preferred_username?: string;
  realm_access?: {
    roles: string[];
  };
  cell_id?: string;
  funded_cell_ids?: string[];
}
