import { test, expect } from "@playwright/test";
import { setFakeTime, fillBirthday } from "./utils/pageUtils";

for (const param of [
  {year: 1986, expectedDay: "21", expectedMonth: "0", expectedYear: "34"}, 
  {year: 1987, expectedDay: "21", expectedMonth: "0", expectedYear: "33"}, 
  {year: 1988, expectedDay: "21", expectedMonth: "0", expectedYear: "32"}, 
  {year: 1989, expectedDay: "21", expectedMonth: "0", expectedYear: "31"}]) {
  test.describe(`Birthday is around february (past) (Birthday: 02/10/${param.year}, today: 02/03/2020)`, () => {
    const birthday = new Date(param.year, 2, 10);
    const today = new Date("March 02 2020 00:00:00");

    test.beforeEach(async ({ page }) => setFakeTime(page, today.valueOf()));

    test(`Calculated year to be ${param.expectedYear}`, async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputYear = await page.locator("#yearAge").textContent();
      expect(outputYear).toBe(param.expectedYear);
    });

    test(`Calculated month to be ${param.expectedMonth}`, async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputMonth = await page.locator("#monthAge").textContent();
      expect(outputMonth).toBe(param.expectedMonth);
    });

    test(`Calculated day to be ${param.expectedDay}`, async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputDay = await page.locator("#dayAge").textContent();
      expect(outputDay).toBe(param.expectedDay);
    });
  });
}