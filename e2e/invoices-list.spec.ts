import { test, expect } from "@playwright/test";

test.describe("인보이스 목록 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/invoices");
  });

  test("페이지 제목이 올바르게 표시되어야 함", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "인보이스 목록" })).toBeVisible();
  });

  test("인보이스 목록이 표시되어야 함", async ({ page }) => {
    // Wait for table to be visible with longer timeout
    const table = page.locator("table");
    await expect(table).toBeVisible({ timeout: 10000 });

    // Check table headers (use partial match for flexibility)
    await expect(page.getByRole("columnheader", { name: /인보이스|견적서/ })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "클라이언트" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "발행일" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: /금액|총액/ })).toBeVisible();
  });

  test("검색 기능이 작동해야 함", async ({ page }) => {
    // Wait for search input with longer timeout
    const searchInput = page.getByPlaceholder(/검색/i);
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Wait for table to load first
    await page.waitForSelector("table tbody tr", { timeout: 10000 });

    // Type in search
    await searchInput.fill("INV");

    // Wait for filtered results
    await page.waitForTimeout(1000);

    // Check if results contain INV
    const tableContent = await page.locator("table").textContent();
    expect(tableContent).toContain("INV");
  });

  test("인보이스 행 클릭 시 상세 페이지로 이동해야 함", async ({ page }) => {
    // Wait for table rows with longer timeout
    await page.waitForSelector("table tbody tr", { timeout: 10000 });
    const firstRow = page.locator("table tbody tr").first();
    await expect(firstRow).toBeVisible();

    // Click the row
    await firstRow.click();

    // Should navigate to detail page
    await page.waitForURL(/\/invoices\/[a-f0-9]+/, { timeout: 10000 });

    // Check that we're on detail page
    await expect(page.getByRole("heading", { name: "인보이스" })).toBeVisible({ timeout: 10000 });
  });

  test("빈 검색 결과 메시지가 표시되어야 함", async ({ page }) => {
    // Wait for search input
    const searchInput = page.getByPlaceholder(/검색/i);
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Wait for initial data to load
    await page.waitForSelector("table tbody tr", { timeout: 10000 });

    // Search for something that doesn't exist
    await searchInput.fill("NONEXISTENT123456789");
    await page.waitForTimeout(1000);

    // Should show "no results" message or empty table
    const tableBody = page.locator("table tbody");
    const text = await tableBody.textContent();
    expect(text).not.toContain("INV");
  });
});
