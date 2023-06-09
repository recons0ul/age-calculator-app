// @vitest-environment jsdom

import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from "vitest";
import InputValidator from "./validation";

const validator = new InputValidator();
const outputHandler = validator.outputHandler;

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

describe("validateInputIsNotEmpty()", () => {
  vi.mock("./output.js");

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should output birthday error if birthday is empty", () => {
    const birthDay = "";
    const birthMonth = "12";
    const birthYear = "1998";

    const isError = validator.validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    expect(isError).toBeTruthy();
    expect(outputHandler.outputBirthdayIsEmptyError).toHaveBeenCalledOnce();
    expect(outputHandler.outputBirthMonthIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputHandler.outputBirthYearIsEmptyError).toHaveBeenCalledTimes(0);
  });

  it("should output birth month error if birth month is empty", () => {
    const birthDay = "10";
    const birthMonth = "";
    const birthYear = "1998";

    const isError = validator.validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    expect(isError).toBeTruthy();
    expect(outputHandler.outputBirthdayIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputHandler.outputBirthMonthIsEmptyError).toHaveBeenCalledOnce();
    expect(outputHandler.outputBirthYearIsEmptyError).toHaveBeenCalledTimes(0);
  });

  it("should output birth year error if birth year is empty", () => {
    const birthDay = "10";
    const birthMonth = "12";
    const birthYear = "";

    const isError = validator.validateInputIsNotEmpty(birthDay, birthMonth, birthYear);

    expect(isError).toBeTruthy();
    expect(outputHandler.outputBirthdayIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputHandler.outputBirthMonthIsEmptyError).toHaveBeenCalledTimes(0);
    expect(outputHandler.outputBirthYearIsEmptyError).toHaveBeenCalledOnce();
  });
});

describe("validateInput()", () => {
  beforeAll(() => {
    vi.spyOn(validator, "validateInputIsNotEmpty");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call validateInputIsNotEmpty", () => {
    try {
      validator.validateInput();
    } catch (error) {
      //ignore
    }

    expect(validator.validateInputIsNotEmpty).toBeCalled();
  });
});

afterEach(() => {
  dom.window.close();
});
