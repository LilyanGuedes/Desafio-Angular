import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { first } from 'rxjs';


const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {

  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations 
    })
  }

  filterUnits(unit: Location, opened: boolean, open_hour: string, close_hour: string) {
    let open_hour_filter = parseInt(open_hour, 10)
    
  }

  onSubmit(): void {
    const OPEN_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].first
    const CLOSE_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].last
    if(!this.formGroup.value.showClosed) {
      this.filteredResults = this.results.filter(location => location.opened == true)
    } else {
      this.filteredResults = this.results;
    }
  }

  onClean(): void {
    this.formGroup.reset()
  }
}
