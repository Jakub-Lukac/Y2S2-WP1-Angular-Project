import { Component } from '@angular/core';

import { SpotifyApiService } from '../../services/spotify-api.service';
import { TokenResponse } from '../../models/token-response';

@Component({
  selector: 'app-search-artist',
  imports: [],
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.scss'
})
export class SearchArtistComponent {
  token?:TokenResponse | undefined
  errorMessage:any

  constructor (private _spotifyService:SpotifyApiService) {}

  getArtistDetails(movieName:String):boolean{
    
    this._spotifyService.getToken().subscribe(

      tokenResponse => {
        // movieData is object we get from HTTP GET
        this.token = tokenResponse;

        console.log("Token : " + this.token.access_token);
      }
    )
    return false;
  }
}
