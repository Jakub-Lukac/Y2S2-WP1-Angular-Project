import { Component, Input } from '@angular/core';
import { TrackResponse } from '../../models/track-response';

@Component({
  selector: 'app-album-tracks',
  imports: [],
  templateUrl: './album-tracks.component.html',
  styleUrl: './album-tracks.component.scss'
})
export class AlbumTracksComponent {
  @Input() tracks: TrackResponse | undefined;
}
