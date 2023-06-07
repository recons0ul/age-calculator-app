import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("/");
  const title = await page.title()

  expect(title).toBe("Frontend Mentor | Age calculator app");
})

test("Calculate age", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Day").fill("10");
  await page.getByLabel("Month").fill("10");
  await page.getByLabel("Year").fill("1989");

  await page.getByRole("button").click();

  const outputYear = await page.locator("#yearAge").textContent();

  expect(outputYear).toBe("33");
})