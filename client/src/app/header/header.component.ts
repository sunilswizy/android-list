import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title :string = '';

  constructor(private dialog : MatDialog, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getHomeTitle().subscribe((res) => {
      this.title = res.title;
    })
  }

   openDialog() {
      this.dialog.open(DialogComponent, {
        width: '35%',
        height: '75%'
      });
  }

}
