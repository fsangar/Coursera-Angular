import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {ActivatedRoute} from "@angular/router";
import {DestinoApiClient} from "../../models/destinos-api-client.model";
import {DestinoViaje} from "../../models/destino-viaje.model";

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.scss']
})
export class DestinoDetalleComponent implements OnInit {

  destino: DestinoViaje = new DestinoViaje("","");

  public style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };

  constructor(private route: ActivatedRoute, private destinoApiClient: DestinoApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinoApiClient.getById(Number(id));
  }

}
