import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private jsonp: Jsonp) {}

  search(query: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', query);
    search.set('format', 'json');
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .map((response) => response.json()[1]);
  }
}
