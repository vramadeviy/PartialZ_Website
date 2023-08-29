import { Injectable } from '@angular/core';
import { InConfiguration } from '../core/models/config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public configData!: InConfiguration;
private baseURL = 'https://adol-partialsapi-dev.adoldevtest.appserviceenvironment.net/PartialsApi-Dev/api';
  constructor() {
    this.setConfigData();
  }

  setConfigData() {
    this.configData = {
      layout: {
        rtl: false, // options:  true & false
        variant: 'light', // options:  light & dark
        theme_color: 'white', // options:  white, black, purple, blue, cyan, green, orange
        logo_bg_color: 'white', // options:  white, black, purple, blue, cyan, green, orange
        sidebar: {
          collapsed: false, // options:  true & false
          backgroundColor: 'light', // options:  light & dark
        },
      },
    };
  }

  get loginApiURL():string
  {
    return `${this.baseURL}/Login`
  }
  get employeeApiURL():string
  {
    return `${this.baseURL}/Login`
  }
  
}
