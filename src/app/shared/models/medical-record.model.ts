import { Patient } from './patient.model';

export interface MedicalRecord {
  id: number;
  patientId: number;
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
  medicalHistory: string;
  observations?: string;
  patient?: Patient;
  diagnoses?: Diagnosis[];
  treatments?: Treatment[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Diagnosis {
  id: number;
  medicalRecordId: number;
  code: string;
  description: string;
  severity: DiagnosisSeverity;
  diagnosedDate: Date;
  doctorId: number;
  notes?: string;
  isActive: boolean;
  createdAt?: Date;
}

export enum DiagnosisSeverity {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
  CRITICAL = 'CRITICAL'
}

export interface Treatment {
  id: number;
  medicalRecordId: number;
  diagnosisId?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  dosage?: string;
  frequency?: string;
  prescribedBy: number;
  status: TreatmentStatus;
  notes?: string;
  createdAt?: Date;
}

export enum TreatmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DISCONTINUED = 'DISCONTINUED',
  PENDING = 'PENDING'
}