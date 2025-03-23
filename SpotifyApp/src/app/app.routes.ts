import { Routes } from '@angular/router';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { FavoriteMoviesComponent } from './components/favorite-movies/favorite-movies.component';
import { AboutComponent } from './components/about/about.component';
import { AlbumDetailComponent } from './components/album-details/album-details.component';

export const routes: Routes = [
    {path: '', component: SearchArtistComponent},
    {path: 'favorite-movies', component: FavoriteMoviesComponent},
    {path: 'about', component: AboutComponent},
    {path: 'album/:id', component: AlbumDetailComponent },
];
