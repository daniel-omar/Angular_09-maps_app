import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string,
  route: string,
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { route: "/maps/fullscreen", name: "FullScreen" },
    { route: "/maps/zoom-range", name: "ZoomRange" },
    { route: "/maps/markers", name: "Markers" },
    { route: "/maps/properties", name: "Properties" },
    { route: "/alone", name: "Alone Page" }
  ]
}
