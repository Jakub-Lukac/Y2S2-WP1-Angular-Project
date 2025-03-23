import { Component } from '@angular/core';

import { SpotifyApiService } from '../../services/spotify-api.service';
import { Artist } from '../../models/artist-response';

@Component({
  selector: 'app-search-artist',
  imports: [],
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.scss'
})
export class SearchArtistComponent {
  artist?:Artist | undefined
  errorMessage:any

  constructor (private _spotifyService:SpotifyApiService) {}

  getArtistDetails(artistName: string):boolean{
    this._spotifyService.getArtist(artistName).subscribe(
      artistResponse => {
        if (artistResponse) {
          this.artist = artistResponse;
          console.log("Artist Details:", this.artist);
        } else {
          console.log("No artist found.");
        }
      },
      error => {
        this.errorMessage = error;
        console.error("Error fetching artist:", error);
      }
    );
    return false;
  }
}
