import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.scss']
})
export class PropertiesPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild("map")
  public divMap?: ElementRef;
  public zoom: number = 10
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40)

  public houses: House[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
  ]

  ngAfterViewInit(): void {
    if (!this.divMap) return

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy")
  }

}
