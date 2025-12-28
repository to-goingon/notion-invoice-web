import { test, expect } from "@playwright/test";

// Helper function to navigate to invoice detail page
async function goToFirstInvoiceDetail(page: any) {
  await page.goto("/invoices");
  await page.waitForSelector("table tbody tr", { timeout: 15000 });
  const firstRow = page.locator("table tbody tr").first();
  await firstRow.click();
  await page.waitForURL(/\/invoices\/[a-f0-9]+/, { timeout: 15000 });
}

test.describe("인보이스 상세 페이지", () => {
  test("인보이스 상세 정보가 올바르게 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Check that page title "인보이스" is visible
    await expect(page.getByRole("heading", { name: "인보이스" })).toBeVisible({ timeout: 10000 });

    // Check sections are visible
    await expect(page.getByText("발행자")).toBeVisible();
    await expect(page.getByText("클라이언트")).toBeVisible();
    await expect(page.getByText("발행일")).toBeVisible();
    await expect(page.getByText("유효기간")).toBeVisible();
    await expect(page.getByText("청구 항목")).toBeVisible();
  });

  test("뒤로가기 버튼이 작동해야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Click back button
    const backButton = page.getByRole("button", { name: /목록으로/i });
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Should return to list page
    await expect(page).toHaveURL("/invoices");
  });

  test("인쇄 버튼이 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Check print button is visible
    const printButton = page.getByRole("button", { name: /인쇄/i });
    await expect(printButton).toBeVisible();
  });

  test("PDF 다운로드 버튼이 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Check PDF download button is visible
    const pdfButton = page.getByRole("button", { name: /PDF 다운로드/i });
    await expect(pdfButton).toBeVisible();
  });

  test("청구 항목 테이블이 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Wait for items section
    await expect(page.getByText("청구 항목")).toBeVisible();

    // Check table headers in items section
    const itemsTable = page.locator("table").last();
    await expect(itemsTable.getByRole("columnheader", { name: "항목" })).toBeVisible();
    await expect(itemsTable.getByRole("columnheader", { name: "수량" })).toBeVisible();
    await expect(itemsTable.getByRole("columnheader", { name: "단가" })).toBeVisible();
    await expect(itemsTable.getByRole("columnheader", { name: "금액" })).toBeVisible();
  });

  test("총액이 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Check total amount is visible
    await expect(page.getByText("총액")).toBeVisible();

    // Total amount should be displayed (with won symbol or currency)
    const totalSection = page.locator("text=총액").locator("..");
    await expect(totalSection).toBeVisible();
  });

  test("404 페이지가 올바르게 표시되어야 함", async ({ page }) => {
    // Navigate to non-existent invoice
    await page.goto("/invoices/nonexistent123");

    // Should show 404 message
    await expect(page.getByRole("heading", { name: /인보이스를 찾을 수 없습니다/i })).toBeVisible();
  });

  test("발행자 정보 카드가 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Check issuer card
    const issuerCard = page.locator("text=발행자").locator("..");
    await expect(issuerCard).toBeVisible();
  });

  test("클라이언트 정보 카드가 표시되어야 함", async ({ page }) => {
    await goToFirstInvoiceDetail(page);

    // Check client card
    const clientCard = page.locator("text=클라이언트").locator("..");
    await expect(clientCard).toBeVisible();
  });
});
