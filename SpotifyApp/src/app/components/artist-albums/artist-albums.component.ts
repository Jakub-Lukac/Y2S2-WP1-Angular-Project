import { Component, Input } from '@angular/core';
import { AlbumResponse } from '../../models/album-response';

import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';

import { ReplaceSpacesPipe } from '../../pipes/replace-spaces.pipe';

@Component({
  selector: 'app-artist-albums',
  imports: [CommonModule],
  templateUrl: './artist-albums.component.html',
  styleUrl: './artist-albums.component.scss'
})
export class ArtistAlbumsComponent {
  @Input() albums?:AlbumResponse

  constructor(private _router:Router) {}

  goToAlbumDetail(album: any) {
    this._router.navigate(['/album', album.name.toLowerCase().replace(/\s+/g, '-')], { state: { album } });
  }
}
