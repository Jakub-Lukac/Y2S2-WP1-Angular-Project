import { Component, Input } from '@angular/core';
import { Artist } from '../../models/artist-response';

@Component({
  selector: 'app-artist-details',
  imports: [],
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.scss'
})
export class ArtistDetailsComponent {
  @Input() artist!:Artist

  constructor() {}

  
}
