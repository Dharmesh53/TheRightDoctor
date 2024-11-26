import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  private apiUrl = "https://therightdoctor-backend.onrender.com";

  constructor(private http: HttpClient) {}

  getPeople(): Observable<any> {
    return this.http.get(`${this.apiUrl}/person`);
  }

  getPerson(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/person/${id}`);
  }

  createPerson(person: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/person`, person);
  }

  updatePerson(id: string, person: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/person/${id}`, person);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/person/${id}`);
  }
}
