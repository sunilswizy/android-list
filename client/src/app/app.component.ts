import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './service/global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private router : Router, private globalService: GlobalService) {
  }

  ngOnInit(): void {
    if(this.globalService.token) {
      this.globalService.verifyToken().subscribe(res => {
        if(res) {
          this.router.navigate(['']);
        }
        else {
          this.router.navigate(['/login', {}]);
        }
      })
    }
    else {
      this.router.navigate(['/login', {}]);
    }
  }

}
