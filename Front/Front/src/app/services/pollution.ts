import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pollution } from '../models/pollution.model';

@Injectable({
  providedIn: 'root'
})
export class PollutionService {
  private apiUrl = `${environment.apiUrl}/pollutions`;

  constructor(private http: HttpClient) { }

  // CREATE - Ajouter une pollution
  createPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(this.apiUrl, pollution);
  }

  // READ - Obtenir toutes les pollutions
  getAllPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(this.apiUrl);
  }

  // READ - Obtenir une pollution par ID
  getPollutionById(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${this.apiUrl}/${id}`);
  }

  // UPDATE - Modifier une pollution
  updatePollution(id: number, pollution: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(`${this.apiUrl}/${id}`, pollution);
  }

  // DELETE - Supprimer une pollution
  deletePollution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // SEARCH - Filtrer les pollutions
  searchPollutions(filters: any): Observable<Pollution[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    
    if (filters.type) params.push(`type=${filters.type}`);
    if (filters.gravite) params.push(`gravite=${filters.gravite}`);
    if (filters.statut) params.push(`statut=${filters.statut}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<Pollution[]>(url);
  }
}