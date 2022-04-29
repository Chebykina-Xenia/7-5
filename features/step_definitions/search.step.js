const chai = require("chai");
const puppeteer = require("puppeteer");
const expect = chai.expect;
//const toContain = chai.expect.toContain;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement } = require("../../lib/commands.js");
const { getText } = require("../../lib/commands.js");
let isDisabled;

Before(async function () {
  const browser = await puppeteer.launch({ headers: false });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

//переходим на страницу
Given("user is on page", { timeout: 30 * 10000 }, async function () {
  return await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
    //setTimeout: 60000,
  });
});

//выбираем дату
Given("user choose a date", async function () {
  return await clickElement(this.page, "a:nth-child(3)", {
    //setTimeout: 20000,
  });
});

//когда выбираем сеанс
When(
  "user chose a time {string}",
  { timeout: 30 * 10000 },
  async function (string) {
    return await clickElement(this.page, "section:nth-child(3) li", {
      //setTimeout: 20000,
    });
  }
);

//выбираем сеанс
Given("user chose a seans", { timeout: 30 * 10000 }, async function () {
  return await clickElement(this.page, "section:nth-child(2) li", {
    //setTimeout: 20000,
  });
});

//выбираем место
Given("user chose a place", { timeout: 30 * 10000 }, async function () {
  return await clickElement(this.page, "div:nth-child(8) span:nth-child(8)", {
    //setTimeout: 20000,
  });
});

//когда место уже забронировано, кнопка неактивна должна быть
When("reserve plase reserved", { timeout: 60 * 10000 }, async function () {
  await this.page.waitForSelector("button");
  this.isDisabled = await this.page.$eval("button", (button) => {
    return button.disabled;
    //{setTimeout: 20000,}
  });
});

//когда нажимаем кнопку бронировать проверяем, забронировано ли уже место
When("The reserve", { timeout: 30 * 10000 }, async function () {
  this.isDisabled = await this.page.$eval("button", (button) => {
    return button.disabled;
  });
});

//бронируем или нет
Then("reserv", { timeout: 30 * 10000 }, async function () {
  this.isDisabled = await this.page.$eval("button", (button) => {});
  if (!this.isDisabled) {
    //забронировать
    await clickElement(this.page, "button");
    //получить код бронирования
    await clickElement(this.page, "button");
    //проверяем что электронный билет открылся
    actual = await getText(this.page, "h2");
    const expected = await "Электронный билет";
    expect(actual).contains(expected);
  }
});

Then(
  "user check the session {string}",
  { timeout: 30 * 10000 },
  async function (string) {
    const actual = await getText(this.page, "p.buying__info-start");
    const expected = await string;
    expect(actual).contains(expected);
  }
);
