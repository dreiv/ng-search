import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SuggestService } from './search.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

enum Key {
    ArrowUp = 38,
    ArrowDown = 40
}

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
    query: FormControl = new FormControl();
    suggestions: string[];
    suggestionIndex: number;

    subscriptions: Subscription[];
    element: ElementRef;

    constructor(element: ElementRef, private suggestService: SuggestService) {
        this.element = element;
    }

    ngOnInit() {
        this.query.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(query => this.suggestService.suggest(query))
            .subscribe((suggestions: string[]) => {
                this.suggestions = suggestions;
            });

        this.subscriptions = [
            this.navigateWithArrows()
        ];
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions.length = 0;
    }

    navigateWithArrows() {
        return Observable.fromEvent(this.element.nativeElement, 'keydown')
            .filter((e: any) => e.keyCode === Key.ArrowDown || e.keyCode === Key.ArrowUp)
            .map((e: any) => e.keyCode)
            .subscribe((keyCode: number) => {
                let step = keyCode === Key.ArrowDown ? 1 : -1;
                const topLimit = this.suggestions.length;
                const bottomLimit = 0;
                this.suggestionIndex += step;
                if (this.suggestionIndex === topLimit + 1) {
                    this.suggestionIndex = bottomLimit;
                }
                if (this.suggestionIndex === bottomLimit - 1) {
                    this.suggestionIndex = topLimit;
                }
            });
    }

}
