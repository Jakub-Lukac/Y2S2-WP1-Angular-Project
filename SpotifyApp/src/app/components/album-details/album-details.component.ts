import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albumName?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.albumName = this.route.snapshot.paramMap.get('name')!;
    console.log('Album Name:', this.albumName);
    // Fetch album details using this.albumName
  }
}
