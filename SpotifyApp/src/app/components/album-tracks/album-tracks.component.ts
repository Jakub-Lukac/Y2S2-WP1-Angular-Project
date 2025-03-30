import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteTrack, Track, TrackResponse } from '../../models/track-response';
import { TracksApiService } from '../../services/tracks-api.service';

@Component({
  selector: 'app-album-tracks',
  imports: [CommonModule],
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.scss']
})
export class AlbumTracksComponent {
  @Input() tracks: TrackResponse | undefined;
  @Input() albumImageUrl: string | undefined; 
  @Output() trackFavorited = new EventEmitter<any>;

  constructor(private _trackAPIService:TracksApiService) {}

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  addToFavorites(track: Track) {
    if (!this.albumImageUrl) {
      console.error("No album image URL available");
      return;
    }

    const favoriteTrack: FavoriteTrack = {
      ...track,
      albumImageUrl: this.albumImageUrl
    };

    this._trackAPIService.addToFavoriteTracks(favoriteTrack).subscribe({
      next: () => {
        console.log(`${favoriteTrack.name} added to favorites`);
        this.trackFavorited.emit({ ...favoriteTrack, error: false }); 
      },
      error: (err) => {
        console.error(`Error adding track: ${err.message}`);
        this.trackFavorited.emit({ ...favoriteTrack, error: true });
      }
    });
  }  
}
