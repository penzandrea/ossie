import { WebartPage } from './app.po';

describe('webart App', () => {
  let page: WebartPage;

  beforeEach(() => {
    page = new WebartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
