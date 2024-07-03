import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss']
})
export class MiniMapComponent implements AfterViewInit, OnDestroy {

  @Input() lngLat?: number[];

  @ViewChild("map")
  public divMap?: ElementRef;
  public map?: Map;
  public zoom: number = 14
  public currentLngLat: LngLat = new LngLat(-74.5, 40)

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) return;
    if (!this.lngLat) return;

    this.currentLngLat = new LngLat(this.lngLat[0]!, this.lngLat[1]!);
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive:false
    })

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    this.createMarker(this.currentLngLat,color);

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  createMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({
      color: color
    })
      .setLngLat(lngLat)
      .addTo(this.map)

  }

}
