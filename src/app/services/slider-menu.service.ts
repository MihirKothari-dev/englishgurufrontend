import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderMenuService {
  public toggleSideMenu = new Subject<boolean>();
  constructor() { }
}
