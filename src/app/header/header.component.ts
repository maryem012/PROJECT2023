import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rounded:any=false;
  student:any
  ngOnInit(): void {
    this.student = localStorage.getItem('user');
    this.student = JSON.parse(this.student);
  }
}
