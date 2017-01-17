import { Component, OnInit } from '@angular/core';
import { SuggestService} from "./search.service";
import { FormControl, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: AbstractControl = new FormControl();
  suggestions: Observable<Array<string>>;

  constructor(private suggestService: SuggestService) {}

  ngOnInit(){
    this.suggestions = this.query.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(query => this.suggestService.suggest(query));
  }

}
