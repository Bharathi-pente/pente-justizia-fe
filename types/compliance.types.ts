export enum SRACategory {
  GOVERNANCE = 'governance',
  CLIENT_MONEY = 'client_money',
  CONFLICT_OF_INTEREST = 'conflict_of_interest',
  CONFIDENTIALITY = 'confidentiality',
  COMPLIANCE_OVERSIGHT = 'compliance_oversight',
  RECORD_KEEPING = 'record_keeping',
  TRAINING = 'training',
  COMPLAINTS_HANDLING = 'complaints_handling',
}

export enum ComplianceSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface ComplianceItem {
  id: string;
  cellId: string;
  category: SRACategory;
  requirement: string;
  isCompliant: boolean;
  lastChecked: string;
  nextDue: string;
  evidenceUrl: string | null;
  notes: string;
}

export interface ComplianceIssue {
  id: string;
  cellId: string;
  category: SRACategory;
  severity: ComplianceSeverity;
  title: string;
  description: string;
  raisedDate: string;
  dueDate: string;
  resolvedDate: string | null;
  assignedTo: string;
  status: 'open' | 'in_progress' | 'resolved';
}

export interface ComplianceScore {
  cellId: string;
  overallScore: number;
  categoryScores: {
    [key in SRACategory]: number;
  };
  openIssuesCount: number;
  criticalIssuesCount: number;
  lastAuditDate: string | null;
  nextAuditDate: string;
}

export interface AuditSchedule {
  id: string;
  cellId: string;
  auditType: 'routine' | 'spot_check' | 'follow_up';
  scheduledDate: string;
  completedDate: string | null;
  auditor: string;
  findings: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}
