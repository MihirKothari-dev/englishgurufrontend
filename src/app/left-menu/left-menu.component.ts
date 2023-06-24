import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { SliderMenuService } from '../services/slider-menu.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  isSideMenuExpanded = false;
  isAdmin = true;
  dropDownMenu: any = {
    customer: false,
    docketmgt: false,
    billing: false,
    officemgt: false,
    deliveryboyagent: false,
    manifest: false,
    deliveryrunsheet: false,
    Inscan: false,
    pod: false,
    reports: false,
    live: false
  }
  
  constructor(private sliderService:SliderMenuService, 
    private commonService: CommonService,
    private router: Router) {   
  }

  ngOnInit(): void {
  }

  expand() {
    this.isSideMenuExpanded = !this.isSideMenuExpanded;
    this.sliderService.toggleSideMenu.next(this.isSideMenuExpanded);
    this.collapseAllMenu();
  }

  collapseAllMenu() {
    if (this.isAdmin) {
      for (let key in this.dropDownMenu) {
        this.dropDownMenu[key] = false;
      }
    }    
  }

  toggleDropDownMenu(menuname: string) {
    if (this.isAdmin) {
      this.dropDownMenu[menuname] = !this.dropDownMenu[menuname];
    }     
  }
  logout(){
    this.commonService.clearSession();
    this.commonService.clearLocallySavedData();
    this.router.navigate(['\login']);
  }
}
