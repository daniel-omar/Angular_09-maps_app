import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, Output, ViewChild, EventEmitter } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.scss']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  public zoomCurrent: number = 10
  public currentLngLat?: LngLat;

  @ViewChild(MapComponent)
  private mapComponent?: MapComponent;

  ngAfterViewInit(): void {
    // if (!this.divMap) return

    // this.map = new Map({
    //   container: this.divMap.nativeElement, // container ID
    //   style: 'mapbox://styles/mapbox/streets-v12', // style URL
    //   center: this.currentLngLat, // starting position [lng, lat]
    //   zoom: this.zoom, // starting zoom
    // });

    // this.mapListeners();
  }

  // mapListeners() {

  //   if (!this.map) return;

  //   this.map.on('zoom', (event) => {
  //     this.zoom = this.map!.getZoom();
  //   })

  //   this.map.on('zoomend', (event) => {
  //     if (this.map!.getZoom() < 18) return
  //     this.map!.zoomTo(18)
  //   })

  //   this.map.on("moveend", (event) => {
  //     this.currentLngLat = this.map!.getCenter();
  //     console.log(this.currentLngLat)
  //   })

  // }

  zoomIn() {
    if (!this.mapComponent) return;
    this.mapComponent.zoomIn();
  }

  zoomOut() {
    if (!this.mapComponent) return;
    this.mapComponent.zoomOut();
  }

  zoomChange(value: string) {
    const zoom_: number = Number(value)
    this.mapComponent?.zoomChange(zoom_);
  }

  zoomChangeInput(zoom: number) {
    this.zoomCurrent = zoom;
  }

  ngOnDestroy(): void {
  }
}
