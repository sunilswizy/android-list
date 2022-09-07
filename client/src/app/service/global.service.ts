import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

interface Title {
  title: string
}

interface Login {
  userName: string
}

interface AddProducts {
  productName : string
  price: number,
  category: string,
  date: Date,
  description: string,
  comment: string,
  user_id?: string
}

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private apiUrl = environment.HOST.API;
  public token: any = localStorage.getItem('android');
  private user_id: any = this.token && JSON.parse(this.token).user_id
  private headers = new HttpHeaders({
    "Authorization": this.token && JSON.parse(this.token).token
  })

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(`Something bad happened; please try again later. ${error.message}`))
  }

  public getHomeTitle(): Observable<Title> {
    return this.http.get<Title>(this.apiUrl + '/home')
      .pipe(catchError(this.handleError))
  }

  public login(payload: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/login', payload)
      .pipe(catchError(this.handleError))
  }

  public verifyToken(): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/api/verify', {}, 
      { headers: this.headers })
      .pipe(catchError(this.handleError))
  }

  public addProduct(payload: AddProducts): Observable<any> {
    payload.user_id = this.user_id;
    return this.http.post<any>(this.apiUrl + '/products', payload, 
        {headers: this.headers})
        .pipe(catchError(this.handleError))
  }

  public getAllProduct(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/products', {headers: this.headers})
           .pipe(catchError(this.handleError))
  }
  
}
