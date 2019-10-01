import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Owner attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter owner box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("t");
    expect(page.getUniqueUser("video games")).toEqual("Roberta");
    page.backspace();
    page.typeAOwner("Fry");
    expect(page.getUniqueUser("video games")).toEqual("Fry");
  });
  it('should type something in filter Status box and check that it returned the correct element', () => {
    page.navigateTo();
    page.getTodoByStatus("complete");
    expect(page.getUniqueUser("homework")).toEqual("Fry");
  });
  it('should type something in filter Body box and check that it returned correct element', () => {
    page.navigateTo();
    page.getTodoByBody("ipsum");
    expect(page.getUniqueUser("video games")).toEqual("Fry");
  });
  it('should type something in multiple filter boxes and check that it returned correct element', () => {
    page.navigateTo();
    page.getTodoByStatus("complete");
    page.getTodoByBody("ipsum");
    page.typeAOwner("Barry");
    expect(page.getUniqueUser("video games")).toEqual("Barry");
  });
});
