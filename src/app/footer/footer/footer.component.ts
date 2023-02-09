import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public proyecto: any = { anio: '2022', nombreProyecto: 'Proyecto de Clase' };
  public tecnologia: any = {
    leyenda: 'WebApp desarrollada con ',
    tec1: 'Angular ',
    tec2: 'Spring5',
  };
  public autor: string = 'ASAE';
}
