export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Gender;
    bloodType: BloodType;
    phone: string;
    email: string;
    address?: string;
    nationalHealthId?: string;
    emergencyContact?: EmergencyContact;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export enum BloodType {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-'
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

export interface PatientFormData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: Gender;
    bloodType: BloodType;
    phone: string;
    email: string;
    address?: string;
    nationalHealthId?: string;
    emergencyContactName?: string;
    emergencyContactRelationship?: string;
    emergencyContactPhone?: string;
}