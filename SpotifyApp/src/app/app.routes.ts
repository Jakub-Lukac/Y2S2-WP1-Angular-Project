import { Routes } from '@angular/router';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { FavoriteTracksComponent } from './components/favorite-tracks/favorite-tracks.component';
import { AboutComponent } from './components/about/about.component';
import { AlbumDetailComponent } from './components/album-details/album-details.component';

export const routes: Routes = [
    {path: '', component: SearchArtistComponent},
    {path: 'favorite-tracks', component: FavoriteTracksComponent},
    {path: 'about', component: AboutComponent},
    {path: 'album/:name', component: AlbumDetailComponent },
];
