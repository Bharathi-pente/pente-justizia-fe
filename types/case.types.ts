export enum CaseStage {
  INTAKE = 'intake',
  INVESTIGATION = 'investigation',
  PRE_LITIGATION = 'pre_litigation',
  LITIGATION = 'litigation',
  SETTLEMENT = 'settlement',
  CLOSED = 'closed',
}

export enum CaseStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  SETTLED = 'settled',
  WON = 'won',
  LOST = 'lost',
  WITHDRAWN = 'withdrawn',
}

export interface Case {
  id: string;
  caseNumber: string;
  cellId: string;
  clientName: string;
  stage: CaseStage;
  status: CaseStatus;
  claimValue: number;
  dateOpened: string;
  dateClosed: string | null;
  assignedSolicitor: string;
  description: string;
  vertical: string;
  isInsured: boolean;
  isFunded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CasePipeline {
  stage: CaseStage;
  count: number;
  totalValue: number;
}
