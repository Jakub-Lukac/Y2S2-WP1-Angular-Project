import { Component, Input } from '@angular/core';
import { AlbumResponse } from '../../models/album-response';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReplaceSpacesPipe } from '../../pipes/replace-spaces.pipe';

@Component({
  selector: 'app-artist-albums',
  imports: [CommonModule, RouterLink, ReplaceSpacesPipe],
  templateUrl: './artist-albums.component.html',
  styleUrl: './artist-albums.component.scss'
})
export class ArtistAlbumsComponent {
  @Input() albums?:AlbumResponse

  constructor() {}
}
