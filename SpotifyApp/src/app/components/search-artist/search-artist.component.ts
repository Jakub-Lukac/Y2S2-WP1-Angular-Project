import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { catchError, concatMap, finalize } from 'rxjs';

import { SpotifyApiService } from '../../services/spotify-api.service';
import { Artist } from '../../models/artist-response';

import { ArtistDetailsComponent } from '../artist-details/artist-details.component';
import { AlbumResponse } from '../../models/album-response';
import { ArtistAlbumsComponent } from '../artist-albums/artist-albums.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { StateHandlerService } from '../../services/state-handler.service';

@Component({
  selector: 'app-search-artist',
  imports: [CommonModule, ArtistDetailsComponent, ArtistAlbumsComponent, ErrorMessageComponent],
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.scss'
})
export class SearchArtistComponent implements OnInit {
  artist?:Artist | undefined
  albums?:AlbumResponse | undefined
  errorMessage:any
  loading:boolean = false;

  constructor (private _spotifyService:SpotifyApiService, private _stateHandlerService:StateHandlerService) {}

  ngOnInit(): void {
    // On page load / reload, display previously searched artist/albums data
    this.artist = this._stateHandlerService.getArtistData();
    this.albums = this._stateHandlerService.getAlbumsData();
  }

  getArtistDetails(artistName: string): boolean {
    this.loading = true;
    this.albums = undefined; // clear previous values
    this.artist = undefined; // clear previous values

    this._spotifyService.getArtist(artistName).pipe(
      // Chain the album fetching using concatMap (to ensure sequential execution)
      concatMap(artistResponse => {
        this.artist = artistResponse;

        if (this.artist) {
          this._stateHandlerService.setArtistData(this.artist);
          return this._spotifyService.getArtistAlbums(this.artist.id);
        } else {
          return [];
        }
      }),
      catchError(error => {
        this.errorMessage = `An error occured while fetching artist details! Please try again later.`;
        console.log(`Fetching error: ${error}`);
        return [];
      }),
      finalize(() => {
        this.loading = false; // Ensure loading is stopped when request completes
      })
    ).subscribe(
      albumsResponse => {
        this.albums = albumsResponse;

        if (this.albums) {
          this._stateHandlerService.setAlbumsData(this.albums);
        }

        // testing albums response
        for (let index = 0; index < this.albums.items.length; index++) {
          console.log(`Albums cover url: ${this.albums.items[index].images[0].url}`)
        }
      }
    );

    return false;
  }
}
