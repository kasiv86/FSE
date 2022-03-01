import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EAuctionService } from '../eauction.service';
import { Seller } from '../eauction';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
interface Country {
  CountryId: string;
  CountryName: string;
}

interface State {
  StateId: string;
  StateName: string;
  CountryId: string;
}

interface City {
  Cityid: string;
  CityName: string;
  StateId: string;
  CountryId: string;
}

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})

export class SellerComponent implements OnInit {
  dataSaved = false;
  sellerForm: any;
  allSellers: Observable<Seller[]>;
  dataSource: MatTableDataSource<Seller>;
  selection = new SelectionModel<Seller>(true, []);
  sellerIdUpdate = null;
  massage = null;
  allCountry: Observable<Country[]>;
  allState: Observable<State[]>;
  allCity: Observable<City[]>;
  CountryId = null;
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'FirstName', 'LastName', 'DateofBirth', 'EmailId', 'Gender', 'Country', 'State', 'City', 'Address', 'Pincode', 'Edit', 'Delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private eauctionService: EAuctionService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.eauctionService.getAllSeller().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.sellerForm = this.formbulider.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      DateofBirth: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      State: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Pincode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])]
    });
    this.FillCountryDDL();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

 /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: Seller): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.SellerId + 1}`;
  }
  
  DeleteData() {
    debugger;
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        this.eauctionService.deleteData(numSelected).subscribe(result => {
          this.SavedSuccessful(2);
          this.loadAllSellers();
        })
      }
    } else {
      alert("Select at least one row");
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllSellers() {
    this.eauctionService.getAllSeller().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const seller = this.sellerForm.value;
    this.CreateSeller(seller);
    this.sellerForm.reset();
  }

  loadSellerToEdit(sellerId: string) {
    this.eauctionService.getSellerById(sellerId).subscribe(seller => {
      this.massage = null;
      this.dataSaved = false;
      this.sellerIdUpdate = seller.SellerId;
      this.sellerForm.controls['FirstName'].setValue(seller.FirstName);
      this.sellerForm.controls['LastName'].setValue(seller.LastName);
      this.sellerForm.controls['DateofBirth'].setValue(seller.DateofBirth);
      this.sellerForm.controls['EmailId'].setValue(seller.EmailId);
      this.sellerForm.controls['Gender'].setValue(seller.Gender);
      this.sellerForm.controls['Address'].setValue(seller.Address);
      this.sellerForm.controls['Pincode'].setValue(seller.Pincode);
      this.sellerForm.controls['Country'].setValue(seller.CountryId);
      this.allState = this.eauctionService.getState(seller.CountryId);
      this.CountryId = seller.CountryId;
      this.sellerForm.controls['State'].setValue(seller.StateId);
      this.allCity = this.eauctionService.getCity(seller.StateId);
      this.StateId = seller.StateId;
      this.sellerForm.controls['City'].setValue(seller.Cityid);
      this.CityId = seller.Cityid;
      this.isMale = seller.Gender.trim() == "0" ? true : false;
      this.isFeMale = seller.Gender.trim() == "1" ? true : false;
    });

  }
  CreateSeller(seller: Seller) {
    console.log(seller.DateofBirth);
    if (this.sellerIdUpdate == null) {
      seller.CountryId = this.CountryId;
      seller.StateId = this.StateId;
      seller.Cityid = this.CityId;

      this.eauctionService.createSeller(seller).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadAllSellers();
          this.sellerIdUpdate = null;
          this.sellerForm.reset();
        }
      );
    } else {
      seller.SellerId = this.sellerIdUpdate;
      seller.CountryId = this.CountryId;
      seller.StateId = this.StateId;
      seller.Cityid = this.CityId;
      this.eauctionService.updateSeller(seller).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadAllSellers();
        this.sellerIdUpdate = null;
        this.sellerForm.reset();
      });
    }
  }
  deleteSeller(sellerId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.eauctionService.deleteSellerById(sellerId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadAllSellers();
        this.sellerIdUpdate = null;
        this.sellerForm.reset();

      });
    }

  }

  FillCountryDDL() {
    this.allCountry = this.eauctionService.getCountry();
    this.allState = this.StateId = this.allCity = this.CityId = null;
  }

  FillStateDDL(SelCountryId) {
    this.allState = this.eauctionService.getState(SelCountryId.value);
    this.CountryId = SelCountryId.value;
    this.allCity = this.CityId = null;
  }

  FillCityDDL(SelStateId) {
    this.allCity = this.eauctionService.getCity(SelStateId.value);
    this.StateId = SelStateId.value
  }

  GetSelectedCity(City) {
    this.CityId = City.value;
  }

  resetForm() {
    this.sellerForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.isMale = true;
    this.isFeMale = false;
    this.loadAllSellers();
  }

  SavedSuccessful(isUpdate) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } 
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
