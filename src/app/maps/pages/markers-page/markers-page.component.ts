import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { map } from 'rxjs';

interface MarkerAndColor {
  marker: Marker,
  color: string
}

interface PlainMarker {
  color: string,
  lngLat: number[]
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.scss']
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild("map")
  public divMap?: ElementRef;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-76.98, -11.97)
  public zoom: number = 13
  public markers: MarkerAndColor[] = []

  ngAfterViewInit(): void {
    if (!this.divMap) return

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement("div")
    // markerHtml.innerHTML = "omar"

    // const marker = new Marker({
    //   color: "#FAFAFA",
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map)

  }

  ngOnDestroy(): void {
    this.map?.remove()
  }

  addMarker() {

    if (!this.map) return

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map!.getCenter();

    this.createMarker(lngLat, color)
    this.saveToLocalStorage()
  }

  createMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map)

    this.markers.push({ color: color, marker: marker });

    marker.on("dragend", (event) => {
      this.saveToLocalStorage()
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers = this.markers.map(({ color, marker }) => {
      return {
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    })
    localStorage.setItem("plainMarkers", JSON.stringify(plainMarkers))
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem("plainMarkers") ?? '[]'
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)
    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat
      const coordenadas = new LngLat(lng, lat);

      this.createMarker(coordenadas, color)
    })
  }
}
