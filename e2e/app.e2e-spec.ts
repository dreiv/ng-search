import { NgSearchPage } from './app.po';

describe('ng-suggest App', function() {
  let page: NgSearchPage;

  beforeEach(() => {
    page = new NgSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
