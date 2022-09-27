import { Component, OnInit } from '@angular/core';
import { SliderMenuService } from '../../services/slider-menu.service';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.scss']
})
export class AdminportalComponent implements OnInit {
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
