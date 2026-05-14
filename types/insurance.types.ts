export enum PolicyStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  caseId: string;
  cellId: string;
  insurerId: string;
  insurerName: string;
  coverageAmount: number;
  premium: number;
  issueDate: string;
  expiryDate: string;
  status: PolicyStatus;
  claimsMade: number;
  totalPaidOut: number;
}

export interface ATEExposure {
  insurerId: string;
  insurerName: string;
  totalPolicies: number;
  activePolicies: number;
  totalExposure: number;
  totalPremiums: number;
  totalClaims: number;
  totalPaidOut: number;
  lossRatio: number;
  cells: {
    cellId: string;
    cellName: string;
    policyCount: number;
    exposure: number;
  }[];
}

export interface InsuranceClaim {
  id: string;
  policyId: string;
  caseId: string;
  claimAmount: number;
  claimDate: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  paidAmount: number;
  paidDate: string | null;
}
