import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = [];
  catForm!: FormGroup;
  errors = '';
  sucess = '';
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.catForm = new FormGroup({
      name: new FormControl('', []),
      description: new FormControl('', [
        Validators.min(0),
        Validators.max(120),
      ]),
      budget: new FormControl('', [Validators.min(0), Validators.max(99999)]),
      id: new FormControl('', []),
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategoriesByUserId().subscribe((data) => {
      this.categoryList = data;
    });
  }

  addCategory() {
    const category: any = {
      name: this.catForm.value.name,
      description: this.catForm.value.description,
      budget: this.catForm.value.budget.toString(),
    };
    this.categoryService.addCategory(category).subscribe({
      next: (data) => {
        console.log(data);
        this.categoryList.push(data);
        this.sucess = `${category.name} added successfully`;
        this.errors = '';
      },
      error: (error) => {
        let temp = error.error.message;
        console.log(temp);
        if (temp.includes('duplicate key error collection')) {
          temp = 'Category already exists';
        } else temp = 'Error adding category';
        this.errors = temp;
      },
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (data) => {
          console.log(data);
          this.categoryList = this.categoryList.filter((cat) => cat._id !== id);
        },
        error: (error) => {
          this.errors = error.error.message;
        },
      });
    }
  }

  editing = false;
  editCategory(cat: Category) {
    this.catForm.setValue({
      name: cat.name,
      description: cat?.description,
      budget: cat?.budget,
      id: cat?._id,
    });
  }

  cleanForm() {
    setTimeout(() => {
      this.catForm.setValue({
        name: '',
        description: '',
        budget: '',
        id: '',
      });
      this.errors = '';
      this.sucess = '';
    }, 700);
  }
  updateCategory(cat: Category) {
    if (!this.catForm.valid) {
      this.errors = 'Please fill all fields';
      return;
    }
    let id = this.catForm.value.id;
    const newCategory: any = {
      name: this.catForm.value.name,
      description: this.catForm.value.description,
      budget: this.catForm.value.budget,
    };
    this.categoryService.updateCategory(id, newCategory).subscribe({
      next: (data) => {
        console.log(data);

        this.sucess = `${newCategory.name} updated successfully`;
        setTimeout(() => {
          this.getAllCategories();
        }, 500);
        this.errors = '';
        this.cleanForm();
      },
      error: (error) => {
        this.errors = error.error.message;
        this.cleanForm();
      },
    });
  }
  handleSubmit(cat?: any) {
    if (this.editing) {
      this.updateCategory(cat);
    } else {
      this.addCategory();
    }
  }

  handleViews(cat?: any) {
    if (cat) {
      this.editing = true;
      console.log('UPDATING');

      this.editCategory(cat);
    } else {
      this.editing = false;
      console.log('ADDING');
      this.cleanForm();
    }
  }
}
