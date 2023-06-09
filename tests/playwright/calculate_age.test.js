import { test, expect } from "@playwright/test";

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

  // to test the leap year cycle
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

  async function setFakeTime(page, value) {
    await page.addInitScript(`{
    // Extend Date constructor to default to fakeNow
    Date = class extends Date {
      constructor(...args) {
        if (args.length === 0) {
          super(${value});
        } else {
          super(...args);
        }
      }
    }
    // Override Date.now() to start from value
    const __DateNowOffset = ${value} - Date.now();
    const __DateNow = Date.now;
    Date.now = () => __DateNow() + __DateNowOffset;
  }`);
  }

  async function fillBirthday(page, birthday) {
    await page.getByLabel("Day").fill(birthday.getDate().toString());
    await page.getByLabel("Month").fill(birthday.getMonth().toString());
    await page.getByLabel("Year").fill(birthday.getFullYear().toString());
  }
});
