// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/routes/home/home.component';
import { ConnectComponent } from './components/routes/connect/connect.component';
import { PlaylistsComponent } from './components/routes/playlists/playlists.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'connect', component: ConnectComponent, pathMatch: 'full' },
  { path: 'playlists', component: PlaylistsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
