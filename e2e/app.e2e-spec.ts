import { MothingsFrontEndPage } from './app.po';

describe('mothings-front-end App', function() {
  let page: MothingsFrontEndPage;

  beforeEach(() => {
    page = new MothingsFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
