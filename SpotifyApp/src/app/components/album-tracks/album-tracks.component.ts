import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackResponse } from '../../models/track-response';

@Component({
  selector: 'app-album-tracks',
  imports: [CommonModule],
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.scss']
})
export class AlbumTracksComponent {
  @Input() tracks: TrackResponse | undefined;
  @Input() albumImageUrl: string | undefined; 

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
