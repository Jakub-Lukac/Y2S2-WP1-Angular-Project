import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albumId?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    console.log('Album ID:', this.albumId);
    // Fetch album details using this.albumId
  }
}
