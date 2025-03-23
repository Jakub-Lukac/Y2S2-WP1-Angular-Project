import { Routes } from '@angular/router';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path: '', component: SearchArtistComponent},
    {path: 'favorite-movies', component: FavoriteMoviesComponent},
    {path: 'about', component: AboutComponent}
];
