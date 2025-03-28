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
    this.loading = true;
    try {
      this._tracksAPIService.getFavoriteTracks().subscribe(
        (        response: any) => {
          this.tracks = response;
          this.loading = false;
          console.log(`${JSON.stringify(this.tracks)}`)
        }
      )
    } catch (error) {
       this.errorMessage = "An error occured while fetching favorite tracks! Please try again later."
    }
      
  }

  deleteFromFavorites(favoriteTrack: FavoriteTrack) : any{

  }
}
