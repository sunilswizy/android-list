import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  fressList : string[] = ["Brand new", "Second hand", "Refurnishred"]
  productForm !: FormGroup;
  radioClass : boolean = false;

  constructor(private formBuilder : FormBuilder) { }

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
    if(this.productForm.valid) {
      console.log("Submitted....!")
    }
    else {
      
      this.validateField("productName");
      this.validateField("comment");
      this.radioClass = !this.description?.value;
      this.category?.markAllAsTouched()
      this.date?.markAllAsTouched()
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

}
