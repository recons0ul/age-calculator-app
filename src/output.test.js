// @vitest-environment jsdom

import { describe, it, afterEach, beforeEach, vi, expect } from "vitest";
import { JSDOM } from "jsdom";
import OutputHandler from "./output";
import fs from "fs";
import path from "path";

const outputHandler = new OutputHandler();
const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath, "utf-8").toString();
// This is necessary otherwise the test gets a SecurityException
let dom = new JSDOM(htmlDocumentContent, {
  url: "http://localhost:8080",
});
const document = dom.window.document;
vi.stubGlobal("document", document);

beforeEach(() => {
  // reset changes
  document.body.innerHTML = "";
  document.write(htmlDocumentContent);
});

describe("outputBirthdayIsEmptyError()", () => {
  it("innerHTML for day-input-error is set after method call", () => {
    outputHandler.outputBirthdayIsEmptyError();

    const errorElementDay = document.querySelector("#day-input-error");

    expect(errorElementDay.innerHTML).toBe("Field is required.");
  });

  it("innerHTML for month-input-error is not set after method call", () => {
    outputHandler.outputBirthdayIsEmptyError();

    const errorElementMonth = document.querySelector("#month-input-error");
    expect(errorElementMonth.innerHTML).toBe("");
  });

  it("innerHTML for year-input-error is not set after method call", () => {
    outputHandler.outputBirthdayIsEmptyError();

    const errorElementYear = document.querySelector("#year-input-error");
    expect(errorElementYear.innerHTML).toBe("");
  });
});

describe("outputBirthMonthIsEmptyError()", () => {
  it("innerHTML for month-input-error is set after method call", () => {
    outputHandler.outputBirthMonthIsEmptyError();

    const errorElementMonth = document.querySelector("#month-input-error");

    expect(errorElementMonth.innerHTML).toBe("Field is required.");
  });

  it("innerHTML for day-input-error is not set after method call", () => {
    outputHandler.outputBirthMonthIsEmptyError();

    const errorElementDay = document.querySelector("#day-input-error");
    expect(errorElementDay.innerHTML).toBe("");
  });

  it("innerHTML for year-input-error is not set after method call", () => {
    outputHandler.outputBirthMonthIsEmptyError();

    const errorElementYear = document.querySelector("#year-input-error");
    expect(errorElementYear.innerHTML).toBe("");
  });
});

describe("outputBirthYearIsEmptyError()", () => {
  it("innerHTML for year-input-error is set after method call", () => {
    outputHandler.outputBirthYearIsEmptyError();

    const errorElementYear = document.querySelector("#year-input-error");

    expect(errorElementYear.innerHTML).toBe("Field is required.");
  });

  it("innerHTML for day-input-error is not set after method call", () => {
    outputHandler.outputBirthYearIsEmptyError();

    const errorElementDay = document.querySelector("#day-input-error");
    expect(errorElementDay.innerHTML).toBe("");
  });

  it("innerHTML for month-input-error is not set after method call", () => {
    outputHandler.outputBirthYearIsEmptyError();

    const errorElementMonth = document.querySelector("#month-input-error");
    expect(errorElementMonth.innerHTML).toBe("");
  });
});


afterEach(() => {
  dom.window.close();
});
