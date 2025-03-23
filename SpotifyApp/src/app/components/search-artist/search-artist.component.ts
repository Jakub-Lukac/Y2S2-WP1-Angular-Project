import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotifyApiService } from '../../services/spotify-api.service';
import { Artist } from '../../models/artist-response';

@Component({
  selector: 'app-search-artist',
  imports: [CommonModule],
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
        this.artist = artistResponse;
      }
    );
    return false;
  }
}
