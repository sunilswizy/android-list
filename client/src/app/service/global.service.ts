import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

interface Title {
  title: string
}

interface Login {
  userName: string
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private apiUrl = environment.HOST.API;
  public token: any = localStorage.getItem('android');

  constructor(private http: HttpClient) { }

  public getHomeTitle():Observable<Title> {
    return this.http.get<Title>(this.apiUrl + '/home')
          .pipe(catchError(this.handleError))
  }

  public login(payload: Login):Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/login', payload)
          .pipe(catchError(this.handleError))
  }

  public verifyToken(): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/api/verify', {token: this.token})
          .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(`Something bad happened; please try again later. ${error.message}`))
  }
}
