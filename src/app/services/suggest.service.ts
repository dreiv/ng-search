import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';

@Injectable()
export class SuggestService {

    private wikiAPI = 'https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK';
    constructor(private jsonp: Jsonp) {
    }

    getSuggestions(query: string) {
        const search = new URLSearchParams();

        search.set('action', 'opensearch');
        search.set('search', query);
        search.set('format', 'json');
        search.set('limit','4');
        return this.jsonp
            .get(this.wikiAPI, {search})
            .map((response) => response.json()[1]);
    }
}
