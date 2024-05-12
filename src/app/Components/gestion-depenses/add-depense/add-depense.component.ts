import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepenseService } from '../depense.service';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.scss']
})
export class AddDepenseComponent implements OnInit{
  depenseForm: any;

  constructor(private fb: FormBuilder, private depenseService: DepenseService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.depenseForm = this.fb.group({
      montant: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  AddDepense(): void {
    if (this.depenseForm.valid) {
        const montant = this.depenseForm.get('montant').value;
        const date = this.depenseForm.get('date').value;
        const description = this.depenseForm.get('description').value;

      
        const depense = { montant, date, description };

        this.depenseService.addDepense(depense).subscribe(
            (response) => {
                console.log('Dépense ajoutée avec succès :', response);
            },
            
        );
    }
}
}


