import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';

import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { MapComponent } from './components/map/map.component';
(mapboxgl as any).accessToken = 'pk.eyJ1Ijoib21heWxsZWkxNTIwMCIsImEiOiJjbHhuYXd4MGUwMXA4MmpvZTd0dWQ3cDYzIn0.ZSqXGQI9X83YZgiSdBsMQQ';



@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
    MapComponent

  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent
  ]
})
export class MapsModule { }
