import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Track } from '../models/track-response';

@Injectable({
  providedIn: 'root'
})
export class TracksApiService {

  constructor(private _http:HttpClient) { }

  private handleError(err:HttpErrorResponse){
      console.log(`TracksApiService: + ${err.message}`);
      return throwError(() => new Error(`TracksApiService: + ${err.message}`));
  }

   getFavoriteTracks(): any {
      return this._http.get<any>(environment.SERVER_URL)
        .pipe(
          tap(data => console.log(`Favorite tracks: ${JSON.stringify(data)}`)),
          catchError(this.handleError)
        );
    }

    addToFavoriteTracks(track: Track){
      return this._http.post(environment.SERVER_URL, track).pipe(
        tap(() => console.log(`Track ${track.name} added to DB`)),
        catchError(this.handleError)
      )
    }
}
