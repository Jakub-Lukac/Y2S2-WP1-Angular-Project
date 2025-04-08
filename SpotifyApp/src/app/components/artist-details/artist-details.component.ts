import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/artist-response';

@Component({
  selector: 'app-artist-details',
  imports: [CommonModule],
  templateUrl: './artist-details.component.html',
  styleUrl: './artist-details.component.scss'
})
export class ArtistDetailsComponent {
  @Input() artist!:Artist

  constructor() {}
}
