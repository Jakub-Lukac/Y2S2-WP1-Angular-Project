import { Component, Input } from '@angular/core';
import { AlbumResponse } from '../../models/album-response';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-albums',
  imports: [CommonModule],
  templateUrl: './artist-albums.component.html',
  styleUrl: './artist-albums.component.scss'
})
export class ArtistAlbumsComponent {
  @Input() albums?:AlbumResponse

  constructor() {}
}
