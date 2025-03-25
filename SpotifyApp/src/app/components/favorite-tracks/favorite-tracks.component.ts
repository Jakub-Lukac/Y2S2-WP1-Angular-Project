import { Component, OnInit } from '@angular/core';

import { TracksApiService } from '../../services/tracks-api.service';

@Component({
  selector: 'app-favorite-tracks',
  imports: [],
  templateUrl: './favorite-tracks.component.html',
  styleUrl: './favorite-tracks.component.scss'
})
export class FavoriteTracksComponent implements OnInit{

  response: any;

  constructor (private _tracksAPIService: TracksApiService) {}

  ngOnInit(): void {
      this._tracksAPIService.getFavoriteTracks().subscribe(
        (        response: any) => {
          this.response = response;
          console.log(this.response)
        }
      )
  }
}
