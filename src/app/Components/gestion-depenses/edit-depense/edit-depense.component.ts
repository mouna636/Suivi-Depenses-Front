import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DepenseService } from '../depense.service';

@Component({
  selector: 'app-edit-depense',
  templateUrl: './edit-depense.component.html',
  styleUrls: ['./edit-depense.component.scss']
})
export class EditDepenseComponent implements OnInit {
  depenseForm: any;
  categories: any[] = [];
  tags: any[] = [];
  depenseId: string;

  constructor(
    private fb: FormBuilder,
    private depenseService: DepenseService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.depenseId = this.route.snapshot.paramMap.get('depenseId')!;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCategoriesAndTags();
    this.loadDepense();
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
    this.categoryService.getAllCategoriesByUserId().subscribe((data) => {
      this.categories = data;
    });

    this.tagService.getAllTagsByUserId().subscribe((data) => {
      this.tags = data;
    });
  }

  loadDepense(): void {
    this.depenseService.getDepenseById(this.depenseId).subscribe((data) => {
      this.depenseForm.patchValue(data);
    });
  }

  editDepense(): void {
    if (this.depenseForm.valid) {
      const depense = this.depenseForm.value;
      this.depenseService.updateDepense(this.depenseId, depense).subscribe(
        (response) => {
          console.log('Dépense mise à jour avec succès :', response);
          this.router.navigate(['/depenses']); 
        },
       
      );
    }
  }
}