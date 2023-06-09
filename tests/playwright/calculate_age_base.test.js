import { test, expect } from "@playwright/test";
import { setFakeTime, fillBirthday } from "./utils/pageUtils";

test("basic test", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();

  expect(title).toBe("Frontend Mentor | Age calculator app");
});

test.describe("Calculate age with valid inputs ", () => {
  test.describe("Birthday is in future (Birthday: 10/10/1989, today: 20/09/2020)", () => {
    const birthday = new Date(1989, 10, 10);
    const today = new Date("September 20 2020 00:00:00");

    test.beforeEach(async ({ page }) => setFakeTime(page, today.valueOf()));

    test("Calculated year to be 30", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputYear = await page.locator("#yearAge").textContent();
      expect(outputYear).toBe("30");
    });

    test("Calculated month to be 11", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputMonth = await page.locator("#monthAge").textContent();
      expect(outputMonth).toBe("11");
    });

    test("Calculated day to be 10", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputDay = await page.locator("#dayAge").textContent();
      expect(outputDay).toBe("10");
    });
  });

  test.describe("Birthday is in (month) past (Birthday: 10/10/1989, today: 20/11/2020)", () => {
    const birthday = new Date(1989, 10, 10);
    const today = new Date("November 20 2020 00:00:00");

    test.beforeEach(async ({ page }) => setFakeTime(page, today.valueOf()));

    test("Calculated year to be 31", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputYear = await page.locator("#yearAge").textContent();
      expect(outputYear).toBe("31");
    });

    test("Calculated month to be 1", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputMonth = await page.locator("#monthAge").textContent();
      expect(outputMonth).toBe("1");
    });

    test("Calculated day to be 10", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputDay = await page.locator("#dayAge").textContent();
      expect(outputDay).toBe("10");
    });
  });

  test.describe("Birthday is in (day) past (Birthday: 10/10/1989, today: 11/10/2020)", () => {
    const birthday = new Date(1989, 10, 10);
    const today = new Date("October 11 2020 00:00:00");

    test.beforeEach(async ({ page }) => setFakeTime(page, today.valueOf()));

    test("Calculated year to be 31", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputYear = await page.locator("#yearAge").textContent();
      expect(outputYear).toBe("31");
    });

    test("Calculated month to be 0", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputMonth = await page.locator("#monthAge").textContent();
      expect(outputMonth).toBe("0");
    });

    test("Calculated day to be 1", async ({ page }) => {
      await page.goto("/");
      await fillBirthday(page, birthday);

      await page.getByRole("button").click();

      const outputDay = await page.locator("#dayAge").textContent();
      expect(outputDay).toBe("1");
    });
  });


});
