import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumResponse } from '../../models/album-response';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  album?: AlbumResponse;

  constructor(private _route: ActivatedRoute, private _router:Router) {}

  ngOnInit() {
    this.album = history.state.album;

    if (!this.album) {
      // Handle case where album data is lost (e.g., direct page refresh)
      const albumName = this._route.snapshot.paramMap.get('name');
      console.log('Fetch album details by name:', albumName);
      // TODO: Call API to fetch album details if needed
    } else {
      console.log('Album details:', this.album);
      // TODO: Fetch tracks using this.album.id
    }
  }
}
