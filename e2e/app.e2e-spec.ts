import { OpcloudCliPage } from './app.po';

describe('opcloud-cli App', function() {
  let page: OpcloudCliPage;

  beforeEach(() => {
    page = new OpcloudCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
