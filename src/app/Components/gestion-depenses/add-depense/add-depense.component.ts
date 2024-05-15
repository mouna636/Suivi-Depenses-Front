import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepenseService } from '../depense.service';
import { TagService } from 'src/app/services/tag.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.scss']
})
export class AddDepenseComponent implements OnInit {
  depenseForm: any;
  categories: any[] = [];
  tags: any[] = [];

  constructor(
    private fb: FormBuilder,
    private depenseService: DepenseService,
    private categoryService: CategoryService,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategoriesAndTags();
  }

  initForm(): void {
    this.depenseForm = this.fb.group({
      montant: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      tagId: ['', Validators.required],
      
    });
  }

  loadCategoriesAndTags(): void {
    this.categoryService.getAllCategoriesByUserId().subscribe(data => {
      this.categories = data;
    });

    this.tagService.getAllTagsByUserId().subscribe(data => {
      this.tags = data;
    });
  }

  addDepense(): void {
    console.log('this.depenseForm', this.depenseForm);
    if (!this.depenseForm.valid) {
      const depense = this.depenseForm.value;
      console.log('depense', depense);
    }
      
    if (this.depenseForm.valid) {
      const depense = this.depenseForm.value;
      console.log('depense', depense);
      this.depenseService.addDepense(depense).subscribe(
        (response) => {
          console.log('Dépense ajoutée avec succès :', response);
        },
        
      );
    }
  }

}
