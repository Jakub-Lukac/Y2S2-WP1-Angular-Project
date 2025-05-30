import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Album } from '../../models/album-response';
import { SpotifyApiService } from '../../services/spotify-api.service';
import { TrackResponse } from '../../models/track-response';

import { AlbumTracksComponent } from '../album-tracks/album-tracks.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule, AlbumTracksComponent, ErrorMessageComponent],
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  album?: Album;
  tracks?: TrackResponse;
  albumImageUrl ?: string;
  loading: boolean = false;
  errorMessage: any;

  toasts: { id: number; trackName: string, type: string }[] = []; 
  private _toastCounter = 0;
  favoriteTrack?: string;

  constructor(private _route: ActivatedRoute, private _spotifyService:SpotifyApiService ) {}

  ngOnInit() {
    this.album = history.state.album;
    this.loading = true;

    if (!this.album) {
      const albumName = this._route.snapshot.paramMap.get('name');
      console.log('Fetch album details by name:', albumName);
    } else {
      console.log('Album details:', this.album);
      this.albumImageUrl = this.album.images[1].url;

      // fetch tracks based on album id
      try {
        this._spotifyService.getAlbumTracks(this.album.id).subscribe(
          tracksData => {
            this.tracks = tracksData;
            this.loading = false;
            console.log(`${JSON.stringify(tracksData)}`);
          }
        )
      } catch (error) {
        this.errorMessage = "An error occured while fetching album tracks! Please try again later."
      }
      
    }
  }

  onTrackFavorited(track: any) {
    const toastId = ++this._toastCounter;
    const toastType = track.error ? 'error' : 'success';
  
    this.toasts.push({ id: toastId, trackName: track.name, type: toastType });
  
    setTimeout(() => {
      this.toasts = this.toasts.filter(toast => toast.id !== toastId);
    }, 3000);
  }
  

  removeToast(toastId: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== toastId);
  }
}
