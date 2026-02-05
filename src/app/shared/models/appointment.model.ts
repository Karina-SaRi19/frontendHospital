import { Doctor } from './doctor.model';
import { Patient } from './patient.model';

export interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: Date;
    time: string;
    department: string;
    status: AppointmentStatus;
    reason?: string;
    notes?: string;
    patient?: Patient;
    doctor?: Doctor;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum AppointmentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CHECKED_IN = 'CHECKED_IN',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    NO_SHOW = 'NO_SHOW'
}

export interface AppointmentFormData {
    patientId: number;
    doctorId: number;
    date: string;
    time: string;
    department: string;
    reason?: string;
    notes?: string;
}