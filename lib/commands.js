//вносим команды с действиями пользователя
module.exports = {
    //клик на элемент
    clickElement: async function (page, selector) {
        try { 
            await page.waitForSelector(selector); // ждём пока появится селектор
            await page.click(selector);           
        } catch (error) {
            throw new Error(`Selector $(selector) is not clicable`) 
        }

    },

    //выводим текст
   getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, (link) => link.textContent); //когда get... , необходимо результат сохранять в return
        } catch (error) {
            throw new Error(`Not possible to get text from $(selector) selector`)
        }
    }
}