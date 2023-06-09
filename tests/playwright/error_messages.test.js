import { test, expect } from "@playwright/test";

test.describe("Show error message `Field is required` when an input is missing", () => {
  test("output error when day input is empty", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Day").fill(" ");
    await page.getByLabel("Month").fill("12");
    await page.getByLabel("Year").fill("2020");

    await page.getByRole("button").click();

    const errorMessageDay = await page.locator("#day-input-error").textContent();
    expect(errorMessageDay).toBe("Field is required.");
    const errorMessageMonth = await page.locator("#month-input-error").textContent();
    expect(errorMessageMonth).toBe("")
    const errorMessageYear = await page.locator("#year-input-error").textContent();
    expect(errorMessageYear).toBe("");
  })

  test("output error when month input is empty", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Day").fill("31");
    await page.getByLabel("Month").fill(" ");
    await page.getByLabel("Year").fill("2020");

    await page.getByRole("button").click();

    const errorMessageDay = await page.locator("#day-input-error").textContent();
    expect(errorMessageDay).toBe("");
    const errorMessageMonth = await page.locator("#month-input-error").textContent();
    expect(errorMessageMonth).toBe("Field is required.")
    const errorMessageYear = await page.locator("#year-input-error").textContent();
    expect(errorMessageYear).toBe("");
  })

  test("output error when year input is empty", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Day").fill("31");
    await page.getByLabel("Month").fill("12");
    await page.getByLabel("Year").fill(" ");

    await page.getByRole("button").click();

    const errorMessageDay = await page.locator("#day-input-error").textContent();
    expect(errorMessageDay).toBe("");
    const errorMessageMonth = await page.locator("#month-input-error").textContent();
    expect(errorMessageMonth).toBe("")
    const errorMessageYear = await page.locator("#year-input-error").textContent();
    expect(errorMessageYear).toBe("Field is required.");
  })

  test("output error when year is in future", async({ page }) => {
    await page.goto("/");
    await page.getByLabel("Day").fill("31");
    await page.getByLabel("Month").fill("12");
    await page.getByLabel("Year").fill("2030");

    await page.getByRole("button").click();

    const errorMessageDay = await page.locator("#day-input-error").textContent();
    expect(errorMessageDay).toBe("");
    const errorMessageMonth = await page.locator("#month-input-error").textContent();
    expect(errorMessageMonth).toBe("")
    const errorMessageYear = await page.locator("#year-input-error").textContent();
    expect(errorMessageYear).toBe("Must be in the past.");

  })
})