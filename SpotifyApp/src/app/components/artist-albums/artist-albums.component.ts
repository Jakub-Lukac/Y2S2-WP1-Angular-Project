import { Component, Input } from '@angular/core';
import { Album, AlbumResponse } from '../../models/album-response';

import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-artist-albums',
  imports: [CommonModule],
  templateUrl: './artist-albums.component.html',
  styleUrl: './artist-albums.component.scss'
})
export class ArtistAlbumsComponent {
  @Input() albums?:AlbumResponse

  constructor(private _router:Router) {}

  goToAlbumDetail(album: Album) {
    this._router.navigate(['/album', album.name.toLowerCase().replace(/\s+/g, '-')], { state: { album } });
  }
}
