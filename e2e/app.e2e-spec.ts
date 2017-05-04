import { ApplicationFormPage } from './app.po';

describe('application-form App', () => {
  let page: ApplicationFormPage;

  beforeEach(() => {
    page = new ApplicationFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
