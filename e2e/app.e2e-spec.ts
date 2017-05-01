import { IdWebPage } from './app.po';

describe('id-web App', () => {
  let page: IdWebPage;

  beforeEach(() => {
    page = new IdWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
