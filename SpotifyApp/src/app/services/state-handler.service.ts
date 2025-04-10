import { Injectable } from '@angular/core';
import { Artist } from '../models/artist-response';
import { AlbumResponse } from '../models/album-response';

@Injectable({
  providedIn: 'root'
})
export class StateHandlerService {

  private _artist: Artist | undefined;
  private _albums: AlbumResponse | undefined;

  constructor() { }

  setArtistData(artist: Artist) {
    this._artist = artist;
  }

  getArtistData() {
    return this._artist;
  }

  setAlbumsData(albums: AlbumResponse) {
    this._albums = albums;
  }

  getAlbumsData() {
    return this._albums;
  }
}
