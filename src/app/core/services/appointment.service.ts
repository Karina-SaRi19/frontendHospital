import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, AppointmentFormData, AppointmentStatus } from '../../shared/models/appointment.model';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from './patient.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = `${environment.apiUrl}/appointments`;

    constructor(private http: HttpClient) { }

    getAppointments(
        page: number = 1,
        pageSize: number = 10,
        filters?: {
            status?: AppointmentStatus;
            doctorId?: number;
            patientId?: number;
            startDate?: string;
            endDate?: string;
        }
    ): Observable<PaginatedResponse<Appointment>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        if (filters) {
            if (filters.status) params = params.set('status', filters.status);
            if (filters.doctorId) params = params.set('doctorId', filters.doctorId.toString());
            if (filters.patientId) params = params.set('patientId', filters.patientId.toString());
            if (filters.startDate) params = params.set('startDate', filters.startDate);
            if (filters.endDate) params = params.set('endDate', filters.endDate);
        }

        return this.http.get<PaginatedResponse<Appointment>>(this.apiUrl, { params });
    }

    getAppointmentById(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
    }

    createAppointment(appointmentData: AppointmentFormData): Observable<Appointment> {
        return this.http.post<Appointment>(this.apiUrl, appointmentData);
    }

    updateAppointment(id: number, appointmentData: Partial<AppointmentFormData>): Observable<Appointment> {
        return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointmentData);
    }

    updateAppointmentStatus(id: number, status: AppointmentStatus): Observable<Appointment> {
        return this.http.patch<Appointment>(`${this.apiUrl}/${id}/status`, { status });
    }

    deleteAppointment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getTodayAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiUrl}/today`);
    }
}