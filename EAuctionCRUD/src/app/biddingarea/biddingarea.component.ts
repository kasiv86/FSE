import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
import { EAuctionService } from '../eauction.service';
import { Buyer, Product } from '../eauction';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-biddingarea',
  templateUrl: './biddingarea.component.html',
  styleUrls: ['./biddingarea.component.css']
})
export class BiddingareaComponent implements OnInit {
  dataSaved = false;
  eauctionForm: any;
  allProducts: Observable<Product[]>;
  dataSource: MatTableDataSource<Buyer>;
  selection = new SelectionModel<Buyer>(true, []);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['BidAmount', 'BuyerFirstName', 'BuyerEmailId', 'BuyerMobileNo'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private eauctionService: EAuctionService, public dialog: MatDialog) {  
    this.eauctionService.getAllBuyers().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }); }

  ngOnInit() {
    this.eauctionForm = this.formbulider.group({
      ProductID: [''],
      ProductName: [''],
      ShortDescription: [''],
      DetailedDescription: [''],
      Category: [''],
      StartingPrice: [''],
      BidEndDate: ['']
    });    
    this.FillProductIDDDL();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  loadAllBuyers() {
    this.eauctionService.getAllBuyers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadProduct(productId) {
    this.eauctionService.getProductById(productId.value).subscribe(product => {
      this.eauctionForm.controls['ProductName'].setValue(product.ProductName);
      this.eauctionForm.controls['ShortDescription'].setValue(product.ShortDescription);
      this.eauctionForm.controls['DetailedDescription'].setValue(product.DetailedDescription);
      this.eauctionForm.controls['Category'].setValue(product.Category);
      this.eauctionForm.controls['StartingPrice'].setValue(product.StartingPrice);
      this.eauctionForm.controls['BidEndDate'].setValue(product.BidEndDate);
    });
  }

  FillProductIDDDL() {
    this.allProducts = this.eauctionService.getAllProducts();
  }
}
  




