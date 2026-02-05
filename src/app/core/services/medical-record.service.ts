import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecord, Diagnosis, Treatment } from '../../shared/models/medical-record.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordService {
    private apiUrl = `${environment.apiUrl}/medical-records`;

    constructor(private http: HttpClient) { }

    getMedicalRecordByPatientId(patientId: number): Observable<MedicalRecord> {
        return this.http.get<MedicalRecord>(`${this.apiUrl}/patient/${patientId}`);
    }

    getMedicalRecordById(id: number): Observable<MedicalRecord> {
        return this.http.get<MedicalRecord>(`${this.apiUrl}/${id}`);
    }

    createMedicalRecord(recordData: Partial<MedicalRecord>): Observable<MedicalRecord> {
        return this.http.post<MedicalRecord>(this.apiUrl, recordData);
    }

    updateMedicalRecord(id: number, recordData: Partial<MedicalRecord>): Observable<MedicalRecord> {
        return this.http.put<MedicalRecord>(`${this.apiUrl}/${id}`, recordData);
    }

    // Diagnósticos
    getDiagnosesByRecordId(medicalRecordId: number): Observable<Diagnosis[]> {
        return this.http.get<Diagnosis[]>(`${this.apiUrl}/${medicalRecordId}/diagnoses`);
    }

    createDiagnosis(medicalRecordId: number, diagnosisData: Partial<Diagnosis>): Observable<Diagnosis> {
        return this.http.post<Diagnosis>(`${this.apiUrl}/${medicalRecordId}/diagnoses`, diagnosisData);
    }

    // Tratamientos
    getTreatmentsByRecordId(medicalRecordId: number): Observable<Treatment[]> {
        return this.http.get<Treatment[]>(`${this.apiUrl}/${medicalRecordId}/treatments`);
    }

    createTreatment(medicalRecordId: number, treatmentData: Partial<Treatment>): Observable<Treatment> {
        return this.http.post<Treatment>(`${this.apiUrl}/${medicalRecordId}/treatments`, treatmentData);
    }
}