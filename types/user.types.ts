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

export enum ConsentStatus {
  PENDING = 'PENDING',
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
}

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum ClientType {
  INDIVIDUAL = 'INDIVIDUAL',
  CORPORATE = 'CORPORATE',
  GOVERNMENT = 'GOVERNMENT',
  NON_PROFIT = 'NON_PROFIT',
}

export interface User {
  id: string;
  keycloakId: string;
  email: string;
  fullName: string;
  role: UserRole;
  cellId: string | null;
  fundedCellIds: string[];
  createdAt: string;
  updatedAt: string;
  creatorKeycloakId: string | null;  // keycloakId of admin who created this user
  // Client / Contact Variables
  clientName?: string | null;
  phone?: string | null;
  address?: string | null;
  consentStatus?: ConsentStatus | null;
  gdprStatus?: boolean;
  verificationStatus?: boolean;
  onboardingStatus?: OnboardingStatus;
  linkedCaseCount?: number;
  clientType?: ClientType | null;
  vulnerabilityFlag?: boolean;
  preferredContactMethod?: string | null;
  // Relations
  cell?: {
    id: string;
    name: string;
    operatorEmail: string;
    operatorName: string;
    primaryContact: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    postcode: string;
    clioConnected: boolean;
    lastClioSyncAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface CreateUserInput {
  email: string;
  full_name: string;
  role: UserRole;
  password?: string;
  cell_id?: string;
  // Client / Contact Variables
  client_name?: string;
  phone?: string;
  address?: string;
  consent_status?: ConsentStatus;
  gdpr_status?: boolean;
  verification_status?: boolean;
  onboarding_status?: OnboardingStatus;
  linked_case_count?: number;
  client_type?: ClientType;
  vulnerability_flag?: boolean;
  preferred_contact_method?: string;
}

export interface UpdateUserInput {
  email?: string;
  full_name?: string;
  role?: UserRole;
  cell_id?: string;
  // Client / Contact Variables
  client_name?: string;
  phone?: string;
  address?: string;
  consent_status?: ConsentStatus;
  gdpr_status?: boolean;
  verification_status?: boolean;
  onboarding_status?: OnboardingStatus;
  linked_case_count?: number;
  client_type?: ClientType;
  vulnerability_flag?: boolean;
  preferred_contact_method?: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  cellId?: string;
}