import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GlobalService } from '../service/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  fressList : string[] = ["Brand new", "Second hand", "Refurnishred"]
  productForm !: FormGroup;
  radioClass : boolean = false;

  constructor(private formBuilder : FormBuilder,
              private _snackBar : MatSnackBar,
              private globalService: GlobalService,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
        productName: new FormControl('', Validators.required),
        category: ['', Validators.required],
        date: ['', Validators.required],
        description : [null, Validators.required],
        price: [0, Validators.required],
        comment: ['', Validators.required]
    })
  }

  addProducts() {
    
    this.validateField("productName");
    this.validateField("comment");
    this.radioClass = !this.description?.value;
    this.category?.markAllAsTouched()
    this.date?.markAllAsTouched()

    if(this.productForm.valid) {

      const payload = {
        productName: this.productName?.value,
        date: this.date?.value,
        price: this.price?.value,
        description: this.description?.value,
        category: this.category?.value,
        comment: this.comment?.value
      }

      this.globalService.addProduct(payload).subscribe(res => {
        if(res.success) {
          this.openSnackBar(res.message)
        }
        else {
          this.openSnackBar("Failed to add product, try again later")
        }
        this.dialog.closeAll();
      })
    }
  }

  validateField(fieldValidate: "productName" | "comment"){
    if(!this[fieldValidate]?.value.trim().length) {
      this[fieldValidate]?.setValue('');
      this[fieldValidate]?.markAllAsTouched();
    }
  }

  get productName() {
    return this.productForm.get('productName')
  }

  get price() {
    return this.productForm.get('price')
  }

  get category() {
    return this.productForm.get('category')
  }

  get date() {
    return this.productForm.get('date')
  }

  get description() {
    return this.productForm.get('description')
  }

  get comment() {
    return this.productForm.get('comment')
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'clear', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

}
