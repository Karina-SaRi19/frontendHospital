export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialty: MedicalSpecialty;
    licenseNumber: string;
    email: string;
    phone: string;
    status: DoctorStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum MedicalSpecialty {
    CARDIOLOGY = 'Cardiología',
    NEUROLOGY = 'Neurología',
    PEDIATRICS = 'Pediatría',
    GENERAL_MEDICINE = 'Medicina General',
    ONCOLOGY = 'Oncología',
    ORTHOPEDICS = 'Ortopedia',
    DERMATOLOGY = 'Dermatología',
    PSYCHIATRY = 'Psiquiatría',
    EMERGENCY = 'Urgencias',
    SURGERY = 'Cirugía'
}

export enum DoctorStatus {
    ACTIVE = 'ACTIVE',
    ON_LEAVE = 'ON_LEAVE',
    INACTIVE = 'INACTIVE'
}

export interface DoctorFormData {
    firstName: string;
    lastName: string;
    specialty: MedicalSpecialty;
    licenseNumber: string;
    email: string;
    phone: string;
}