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
    suggestions: string[];
    suggestionIndex: number = 0;

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
            .switchMap(query => this.suggestService.suggest(query))
            .subscribe((suggestions: string[]) => {
              this.suggestions = suggestions;
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
            .filter((e: any) => e.keyCode === Key.ArrowUp ||
                                e.keyCode === Key.ArrowDown)
            .map((e: any) => e.keyCode)
            .subscribe((keyCode: number) => {
                const step = keyCode === Key.ArrowDown ? 1 : -1;
                const topLimit = this.suggestions.length - 1;
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
