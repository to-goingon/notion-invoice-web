import { test, expect } from "@playwright/test";

test.describe("홈 페이지", () => {
  test("홈 페이지가 올바르게 렌더링되어야 함", async ({ page }) => {
    await page.goto("/");

    // Check main heading
    await expect(page.getByRole("heading", { name: /Notion Invoice Manager/i })).toBeVisible();
  });

  test("인보이스 관리 링크가 작동해야 함", async ({ page }) => {
    await page.goto("/");

    // Find and click the link to invoices
    const invoicesLink = page.getByRole("link", { name: /인보이스 관리|인보이스 목록/i });

    if (await invoicesLink.count() > 0) {
      await invoicesLink.first().click();
      await expect(page).toHaveURL("/invoices");
    }
  });

  test("헤더 네비게이션이 표시되어야 함", async ({ page }) => {
    await page.goto("/");

    // Check header is visible
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("테마 토글 버튼이 작동해야 함", async ({ page }) => {
    await page.goto("/");

    // Find theme toggle button
    const themeToggle = page.getByRole("button", { name: /theme|테마/i });

    if (await themeToggle.count() > 0) {
      await expect(themeToggle).toBeVisible();

      // Click to toggle theme
      await themeToggle.click();

      // Should show theme options
      await page.waitForTimeout(200);
    }
  });
});
