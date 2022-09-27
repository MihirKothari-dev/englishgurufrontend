import { Component, OnInit } from '@angular/core';
import { SliderMenuService } from '../../services/slider-menu.service';

@Component({
  selector: 'app-hotelportal',
  templateUrl: './hotelportal.component.html',
  styleUrls: ['./hotelportal.component.scss']
})
export class HotelportalComponent implements OnInit {
  showFiller = false;
  isMenuExpand = false;
  constructor(private sliderService:SliderMenuService) { 
    this.sliderService.toggleSideMenu.subscribe((result) => {
      this.isMenuExpand = result;
    });
  }

  ngOnInit(): void {
  }

}
