export enum CellVertical {
  PERSONAL_INJURY = 'personal_injury',
  EMPLOYMENT = 'employment',
  CLINICAL_NEGLIGENCE = 'clinical_negligence',
  HOUSING_DISREPAIR = 'housing_disrepair',
}

export enum CellStatus {
  ACTIVE = 'active',
  ONBOARDING = 'onboarding',
  SUSPENDED = 'suspended',
  CLOSED = 'closed',
}

export interface Cell {
  id: string;
  name: string;
  vertical: CellVertical;
  status: CellStatus;
  sraNumber: string;
  location: string;
  activeCases: number;
  complianceScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface CellKPIs {
  cellId: string;
  totalCases: number;
  activeCases: number;
  closedCases: number;
  wonCases: number;
  lostCases: number;
  avgCycleDays: number;
  totalRecovered: number;
  complianceScore: number;
  lastAuditDate: string | null;
}
