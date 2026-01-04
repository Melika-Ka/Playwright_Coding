import { test, except } from "@playwright/test";
import exceljs from "exceljs";
// way2
// async function excelTest(searchText, replaceText, change, filePath) {
//   const newWorkbook = new exceljs.Workbook();
//   await newWorkbook.xlsx.readFile(filePath);
//   const workSheet = newWorkbook.getWorksheet("Sheet1");
//   const output = await readExcel(workSheet, searchText);
//   const cell = workSheet.getCell(
//     output.row + change.rowChange,
//     output.col + change.colChange
//   );
//   cell.value = replaceText;
//   await newWorkbook.xlsx.writeFile("E:\playwright\playwright\tests\updatedFile.xlsx");
// }
// async function readExcel(workSheet, searchText) {
//   let output = { row: -1, col: -1 };

//   workSheet.eachRow((row, rowNumber) => {
//     row.eachCell((cell, colNumber) => {
//       if (cell.value == searchText) {
//         output.row = rowNumber;
//         output.col = colNumber;
//       }
//     });
//   });
//   return output;
// }
// excelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "E:\playwright\playwright\tests\download.xlsx");

test("handle download file", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html"
  );
  const downloadPromise = page.waitForEvent("download");
  page.locator("#downloadButton").click();
  const download = await downloadPromise;
});
