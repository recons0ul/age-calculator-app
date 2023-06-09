import { vi } from "vitest";
export default class OutputHandler {
  outputBirthdayIsEmptyError = vi.fn(() => {});
  outputBirthMonthIsEmptyError = vi.fn(() => {});
  outputBirthYearIsEmptyError = vi.fn(() => {});
}
