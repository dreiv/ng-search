import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class SuggestService {

  constructor(private jsonp: Jsonp) {}

  suggest(query: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', query);
    search.set('format', 'json');
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .map((response) => response.json()[1]);
  }
}
