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

  toasts: { id: number; trackName: string, type: string }[] = []; 
  toastCounter = 0;

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

        // show toast
        this.onTrackDeleted(favoriteTrack);
        // Refresh UI after deletion
        this.getFavoriteTracks(); 
      },
      error: (err) => {
        this.errorMessage = "An error occurred while deleting the track! Please try again later.";
        this.loading = false;
        console.error("Error deleting track:", err);
      }
    });
  }

  onTrackDeleted(track: any) {
    const toastId = ++this.toastCounter;
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
