import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, PatientFormData } from '../../shared/models/patient.model';
import { environment } from '../../../environments/environment';

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private apiUrl = `${environment.apiUrl}/patients`;

    constructor(private http: HttpClient) { }

    getPatients(page: number = 1, pageSize: number = 10, search?: string): Observable<PaginatedResponse<Patient>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        if (search) {
            params = params.set('search', search);
        }

        return this.http.get<PaginatedResponse<Patient>>(this.apiUrl, { params });
    }

    getPatientById(id: number): Observable<Patient> {
        return this.http.get<Patient>(`${this.apiUrl}/${id}`);
    }

    createPatient(patientData: PatientFormData): Observable<Patient> {
        return this.http.post<Patient>(this.apiUrl, patientData);
    }

    updatePatient(id: number, patientData: Partial<PatientFormData>): Observable<Patient> {
        return this.http.put<Patient>(`${this.apiUrl}/${id}`, patientData);
    }

    deletePatient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    searchPatients(searchTerm: string): Observable<Patient[]> {
        const params = new HttpParams().set('q', searchTerm);
        return this.http.get<Patient[]>(`${this.apiUrl}/search`, { params });
    }
}