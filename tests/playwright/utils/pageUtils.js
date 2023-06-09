export async function setFakeTime(page, value) {
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

export async function fillBirthday(page, birthday) {
  await page.getByLabel("Day").fill(birthday.getDate().toString());
  await page.getByLabel("Month").fill(birthday.getMonth().toString());
  await page.getByLabel("Year").fill(birthday.getFullYear().toString());
}