import { LatestDemoProjPage } from './app.po';

describe('latest-demo-proj App', function() {
  let page: LatestDemoProjPage;

  beforeEach(() => {
    page = new LatestDemoProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
