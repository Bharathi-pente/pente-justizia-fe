export enum FundingStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CLOSED = 'closed',
}

export interface FundingRecord {
  id: string;
  cellId: string;
  funderId: string;
  funderName: string;
  facilitySize: number;
  drawnAmount: number;
  availableAmount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
  status: FundingStatus;
  activeCases: number;
  fundedCaseValue: number;
}

export interface FundingDrawdown {
  id: string;
  fundingRecordId: string;
  caseId: string;
  amount: number;
  drawdownDate: string;
  status: 'pending' | 'approved' | 'disbursed' | 'repaid';
  repaymentDate: string | null;
}

export interface FunderPortfolio {
  funderId: string;
  funderName: string;
  totalFacilitySize: number;
  totalDrawn: number;
  totalAvailable: number;
  cells: {
    cellId: string;
    cellName: string;
    facilitySize: number;
    drawnAmount: number;
    activeCases: number;
  }[];
  performanceMetrics: {
    avgCycleDays: number;
    recoveryRate: number;
    defaultRate: number;
  };
}
