import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';

// models
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private _tokenURL = "https://accounts.spotify.com/api/token"
  private _baseURL = "https://api.spotify.com/v1/"

    // Replace these with your actual client ID and secret
    private _clientId = "03619e7aa0344a45a9fe014a969a62ea";
    private _clientSecret = "6c994bd714a94ee79d8f6c985716c3a9";

  constructor(private _http:HttpClient) { }

  private handleError(err:HttpErrorResponse){
    console.log(`SpotifyApiService: + ${err.message}`);
    return throwError(() => new Error(`SpotifyApiService: + ${err.message}`));
  }

  // private - because we will call this method inside invoked methods
  // not directly from UI
  getToken(): Observable<TokenResponse> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this._clientId);
    body.set('client_secret', this._clientSecret);

    return this._http.post<TokenResponse>(this._tokenURL, body.toString(), { headers })
      .pipe(
        tap(data => console.log(`Bearer token: ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      );
  }
}
