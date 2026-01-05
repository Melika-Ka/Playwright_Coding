import { test, expect } from "@playwright/test";
import exceljs from "exceljs";
// way2
async function excelTest(
  searchText,
  replaceText,
  change,
  filePath,
  uploadPath
) {
  const newWorkbook = new exceljs.Workbook();
  await newWorkbook.xlsx.readFile(filePath);
  const workSheet = newWorkbook.getWorksheet("Sheet1");
  const output = await readExcel(workSheet, searchText);
  const cell = workSheet.getCell(
    output.row + change.rowChange,
    output.col + change.colChange
  );
  cell.value = replaceText;
  await newWorkbook.xlsx.writeFile(uploadPath);
}
async function readExcel(workSheet, searchText) {
  let output = { row: -1, col: -1 };

  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value == searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}

test("handle download upload file", async ({ page }) => {
  const textSearch = "Mango";
  const updateValue = "350";
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  page.locator("#downloadButton").click();
  const download = await downloadPromise;
  // const path = await download.path();
  await download.saveAs("tests/download.xlsx");
  await excelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    "tests/download.xlsx",
    "tests/updatedFile.xlsx"
  );
  await page.locator(".upload").click();
  await page.locator(".upload").setInputFiles("tests/updatedFile.xlsx");
  // const searchLocator = page.getByText(textSearch);
  const row = page.getByRole("row").filter({ hasText: textSearch });
  await expect(row.locator("#cell-4-undefined")).toHaveText(updateValue);
});
