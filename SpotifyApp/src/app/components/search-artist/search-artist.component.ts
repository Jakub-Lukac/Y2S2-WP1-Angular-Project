import { Component } from '@angular/core';

@Component({
  selector: 'app-search-artist',
  imports: [],
  templateUrl: './search-artist.component.html',
  styleUrl: './search-artist.component.scss'
})
export class SearchArtistComponent {
  getArtistDetails(movieName:String):boolean{
    /*
    this._omdbService.getMovieData(movieName).subscribe(

      movieData => {
        // movieData is object we get from HTTP GET
        this.movieData = movieData;

        console.log("Director name : " + this.movieData.Director);
      }
    )
    return false;
    */
   return false;
  }
}
