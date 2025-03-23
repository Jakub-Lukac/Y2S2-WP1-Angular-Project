import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { catchError, concatMap } from 'rxjs';

import { SpotifyApiService } from '../../services/spotify-api.service';
import { Artist } from '../../models/artist-response';

import { ArtistDetailsComponent } from '../artist-details/artist-details.component';
import { AlbumResponse } from '../../models/album-response';
import { ArtistAlbumsComponent } from '../artist-albums/artist-albums.component';

@Component({
  selector: 'app-search-artist',
  imports: [CommonModule, ArtistDetailsComponent, ArtistAlbumsComponent],
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.scss'
})
export class SearchArtistComponent {
  artist?:Artist | undefined
  albums?:AlbumResponse | undefined
  errorMessage:any

  constructor (private _spotifyService:SpotifyApiService) {}

  getArtistDetails(artistName: string): boolean {
    this._spotifyService.getArtist(artistName).pipe(
      // Chain the album fetching using concatMap (to ensure sequential execution)
      concatMap(artistResponse => {
        this.artist = artistResponse;

        if (this.artist) {
          return this._spotifyService.getArtistAlbums(this.artist.id);
        } else {
          return [];
        }
      }),
      catchError(error => {
        this.errorMessage = `${error}`;
        return [];
      })
    ).subscribe(
      albumsResponse => {
        this.albums = albumsResponse;
        // testing albums response
        for (let index = 0; index < this.albums.items.length; index++) {
          console.log(`Albums cover url: ${this.albums.items[index].images[0].url}`)
        }
      }
    );

    return false;
  }
}
