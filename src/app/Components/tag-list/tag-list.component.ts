import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/Tag';
import { colorArray } from 'src/app/services/config';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {
  TagList: Tag[] = [];
  tagForm!: FormGroup;
  colorArray = colorArray;
  errors = '';
  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.getAllTags();
    this.tagForm = new FormGroup({
      name: new FormControl('', []),
      description: new FormControl('', [
        Validators.min(0),
        Validators.max(120),
      ]),
      id: new FormControl('', []),
    });
  }

  getAllTags() {
    this.tagService.getAllTagsByUserId().subscribe((data) => {
      this.TagList = data;
    });
  }
  selectedColor = '';
  changeColor(color: string, event: Event) {
    event.preventDefault();
    this.selectedColor = color;
  }
  addTag() {
    if (!this.tagForm.valid || this.selectedColor === '') {
      this.errors = 'Please fill all fields';
      return;
    }
    const tag: any = {
      name: this.tagForm.value.name,
      description: this.tagForm.value.description,
    };
    this.tagService.addTag(tag).subscribe({
      next: (data) => {
        console.log(data);
        this.TagList.push(data);
        this.errors = '';
      },
      error: (error) => {
        let temp = error.error.message;
        console.log(temp);
        if (temp.includes('duplicate key error collection')) {
          temp = 'Tag already exists';
        } else temp = 'Error adding tag';
        this.errors = temp;
      },
    });
  }

  deleteTag(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.tagService.deleteTag(id).subscribe({
        next: (data) => {
          console.log(data);
          this.TagList = this.TagList.filter((cat) => cat._id !== id);
        },
        error: (error) => {
          this.errors = error.error.message;
        },
      });
    }
  }
  editing = false;
  editTag(tag: Tag) {
    this.tagForm.setValue({
      name: tag.name,
      description: tag?.description,
      id: tag?._id,
    });
    this.selectedColor = tag.color || '';
  }

  cleanForm() {
    setTimeout(() => {
      this.tagForm.setValue({
        name: '',
        description: '',
        id: '',
      });
      this.selectedColor = '';
      this.errors = '';
    }, 100);
  }
  updateTag(tag: Tag) {
    if (!this.tagForm.valid || this.selectedColor === '') {
      this.errors = 'Please fill all fields';
      return;
    }
    let id = this.tagForm.value.id;
    const newTag: any = {
      name: this.tagForm.value.name,
      description: this.tagForm.value.description,
      color: this.selectedColor,
    };
    console.log(newTag, id);

    this.tagService.updateTag(id, newTag).subscribe({
      next: (data) => {
        console.log(data);

        setTimeout(() => {
          this.getAllTags();
        }, 500);
        this.errors = '';
        this.cleanForm();
      },
      error: (error) => {
        console.log(error);

        this.errors = error.error.message;
        this.cleanForm();
      },
    });
  }
  handleSubmit(tag?: any) {
    if (this.editing) {
      this.updateTag(tag);
    } else {
      this.addTag();
    }
  }

  handleViews(tag?: any) {
    if (tag) {
      this.editing = true;
      console.log('UPDATING');

      this.editTag(tag);
    } else {
      this.editing = false;
      console.log('ADDING');
      this.cleanForm();
    }
  }
}
