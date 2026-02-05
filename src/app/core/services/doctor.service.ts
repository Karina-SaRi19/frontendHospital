import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, DoctorFormData, MedicalSpecialty } from '../../shared/models/doctor.model';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from './patient.service';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private apiUrl = `${environment.apiUrl}/doctors`;

    constructor(private http: HttpClient) { }

    getDoctors(page: number = 1, pageSize: number = 10, specialty?: MedicalSpecialty): Observable<PaginatedResponse<Doctor>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        if (specialty) {
            params = params.set('specialty', specialty);
        }

        return this.http.get<PaginatedResponse<Doctor>>(this.apiUrl, { params });
    }

    getDoctorById(id: number): Observable<Doctor> {
        return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
    }

    createDoctor(doctorData: DoctorFormData): Observable<Doctor> {
        return this.http.post<Doctor>(this.apiUrl, doctorData);
    }

    updateDoctor(id: number, doctorData: Partial<DoctorFormData>): Observable<Doctor> {
        return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctorData);
    }

    deleteDoctor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    searchDoctors(searchTerm: string): Observable<Doctor[]> {
        const params = new HttpParams().set('q', searchTerm);
        return this.http.get<Doctor[]>(`${this.apiUrl}/search`, { params });
    }

    getActiveDoctors(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(`${this.apiUrl}/active`);
    }
}