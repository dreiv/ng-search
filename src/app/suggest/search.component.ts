import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SuggestService } from '../services/suggest.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

enum Key {
    ArrowUp = 38,
    ArrowDown = 40
}

@Component({
    selector: 'app-search',
    templateUrl: 'suggest.component.html',
    styleUrls: ['suggest.component.css']
})
export class SuggestComponent implements OnInit, OnDestroy {
    query: FormControl = new FormControl();
    selectedSuggestionText: FormControl = new FormControl();
    selectedSuggestionIndex: number;

    suggestions: string[];

    subscriptions: Subscription[];

    constructor(private element: ElementRef,
                private suggestService: SuggestService) {
        this.element = element;
    }

    ngOnInit() {
        this.subscriptions = [
          this.query.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(query => this.suggestService.getSuggestions(query))
            .subscribe((suggestions: string[]) => {
              this.suggestions = suggestions;
              this.selectedSuggestionIndex = suggestions.length;
            }),
          this.navigateWithArrows()
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions.length = 0;
    }

    navigateWithArrows() {
        return Observable.fromEvent(this.element.nativeElement, 'keydown')
            .filter((event: any) => event.keyCode === Key.ArrowUp ||
                                event.keyCode === Key.ArrowDown)
            .map((event: any) => event.keyCode)
            .subscribe((keyCode: number) => {
                const step = keyCode === Key.ArrowDown ? 1 : -1;
                const topLimit = this.suggestions.length;
                const bottomLimit = 0;
                this.selectedSuggestionIndex += step;
                if (this.selectedSuggestionIndex === topLimit + 1) {
                    this.selectedSuggestionIndex = bottomLimit;
                }
                if (this.selectedSuggestionIndex === bottomLimit - 1) {
                    this.selectedSuggestionIndex = topLimit;
                }
                this.selectedSuggestionText.setValue(this.suggestions[this.selectedSuggestionIndex]);
            });
    }

}
