import { CccPage } from './app.po';

describe('ccc App', () => {
  let page: CccPage;

  beforeEach(() => {
    page = new CccPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
