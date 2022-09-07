import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'description',
    'price',
    'comment',
    'edit',
    'remove'
  ];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  products: any = []

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.getAllProduct().subscribe(res => {
      console.log(res.data)
      this.products = res.data
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  addProduct(product: any) {
    this.products.push(product)
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleEdit(product: any) {
    console.log(product)
  }

  handleDelete(product: any) {
    console.log(product)
  }

}
