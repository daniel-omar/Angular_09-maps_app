import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("map") divMap?: ElementRef;
  public map?: Map;

  @Input() zoom: number = 14;
  @Input() lngLat?: [number, number];

  private currentLngLat?: LngLat;

  @Input() zoomChange(zoom: number) {
    this.map?.zoomTo(zoom);
  }
  @Input() zoomIn() {
    this.map?.zoomIn();
  }
  @Input() zoomOut() {
    this.map?.zoomOut();
  }

  @Output()
  public zoomChangeOut: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) return;
    if (!this.lngLat) return;

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: this.zoom,
      center: this.lngLat
    })

    this.mapListeners();

    const lngLat = new LngLat(this.lngLat[0], this.lngLat[1])
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    this.createMarker(lngLat, color);
  }

  mapListeners() {

    if (!this.map) return;

    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
      this.zoomChangeOut.emit(this.zoom);
    })

    this.map.on('zoomend', (event) => {
      if (this.map!.getZoom() < 18) return
      this.map!.zoomTo(18)
    })

    this.map.on("moveend", (event) => {
      this.currentLngLat = this.map!.getCenter();
    })

  }

  createMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({
      color: color
    })
      .setLngLat(lngLat)
      .addTo(this.map)

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
