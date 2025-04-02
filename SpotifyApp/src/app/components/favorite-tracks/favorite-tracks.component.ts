import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksApiService } from '../../services/tracks-api.service';
import { FavoriteTrack } from '../../models/track-response';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-favorite-tracks',
  imports: [CommonModule, ErrorMessageComponent],
  templateUrl: './favorite-tracks.component.html',
  styleUrl: './favorite-tracks.component.scss'
})
export class FavoriteTracksComponent implements OnInit{

  tracks: FavoriteTrack[] | undefined;
  loading: boolean = false;
  errorMessage: any;

  constructor (private _tracksAPIService: TracksApiService) {}

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  ngOnInit(): void {
    this.getFavoriteTracks();
  }  

  getFavoriteTracks(): void {
    this.loading = true;
    this._tracksAPIService.getFavoriteTracks().subscribe({
      next: (response: any) => {
        this.tracks = response;
        this.loading = false;
        console.log(`Updated tracks: ${JSON.stringify(this.tracks)}`);
      },
      error: (err) => {
        this.errorMessage = "An error occurred while fetching favorite tracks! Please try again later.";
        this.loading = false;
        console.error("Error fetching favorite tracks:", err);
      }
    });
  }  

  deleteFromFavorites(favoriteTrack: FavoriteTrack) : any{
    this._tracksAPIService.deleteTrackFromFavorites(favoriteTrack).subscribe({
      next: () => {
        console.log(`Deleted track: ${favoriteTrack.name}`);
        this.getFavoriteTracks(); // Refresh UI after deletion
      },
      error: (err) => {
        this.errorMessage = "An error occurred while deleting the track! Please try again later.";
        this.loading = false;
        console.error("Error deleting track:", err);
      }
    });
  }
}
