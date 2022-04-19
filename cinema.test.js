// импортируем кастомные команды
const { clickElement } = require("./lib/commands.js");
const { getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php", {
    waitUntil: "load",
    timeout: 60000,
  });
});

afterEach(() => {
  page.close();
});

describe("The ticket reservation cinema test", () => {
  //выбираем время и проверяем время сеанса
  test("Session time check", async () => {
    //выбираем день недели
    await clickElement(page, "nav a:nth-child(3)");
    //выбираем время сеанса
    await clickElement(page, "section:nth-child(3) li");
    //проверяем время сеанса
    actual = await getText(page, "p.buying__info-start");

    expect(actual).toContain("Начало сеанса: 14:00");
  });

  //бронируем билет
  test("Bookable ticket cinema", async () => {
    //выбираем день
    await clickElement(page, "a:nth-child(3)");
    //выбираем сеанс
    await clickElement(page, "section:nth-child(2) li");
    //выбираем место
    await clickElement(page, "div:nth-child(10) span:nth-child(10)");

    const isDisabled = await page.$eval("button", (button) => {
      return button.disabled;
    });

    if (!isDisabled) {
      //забронировать
      await clickElement(page, "button");
      //получить код бронирования
      await clickElement(page, "button");
      //проверяем что электронный билет открылся
      actual = await getText(page, "h2");

      expect(actual).toContain("Электронный билет");
    } else {
      expect(isDisabled).toEqual(true);
    }
  });

  test("Should ticket reservation", async () => {
    //выбираем день недели
    await clickElement(page, "a:nth-child(3)");
    //выбираем сеанс
    await clickElement(page, "section:nth-child(2) li");
    //выбираем место
    await clickElement(page, "div:nth-child(10) span:nth-child(10)");

    const isDisabled = await page.$eval("button", (button) => {
      return button.disabled;
    });
    expect(isDisabled).toEqual(true);
  });
});
