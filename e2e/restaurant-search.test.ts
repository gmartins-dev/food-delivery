import { test, expect } from '@playwright/test'

test('complete restaurant search flow', async ({ page }) => {
  await page.goto('/')

  // Search for restaurants
  await page.fill('[placeholder*="outcode"]', 'ec4m')
  await page.click('button:has-text("Search")')

  // Wait for results
  await page.waitForSelector('h2:has-text("Restaurants")')

  // Check if restaurants are displayed
  const restaurants = page.locator('[data-testid="restaurant-card"]')
  await expect(restaurants).toHaveCount.greaterThan(0)

  // Test cuisine filtering
  const firstCuisine = page.locator('[data-testid="cuisine-filter"] button').first()
  await firstCuisine.click()

  // Verify filtered results
  await expect(page.locator('text=Filtered')).toBeVisible()
})

test('pagination works correctly', async ({ page }) => {
  await page.goto('/')
  await page.fill('[placeholder*="outcode"]', 'ec4m')
  await page.click('button:has-text("Search")')

  // Check initial page
  await expect(page.locator('[data-testid="restaurant-card"]')).toHaveCount(10)

  // Go to next page
  await page.click('button:has-text("Next")')
  await expect(page.locator('text="Page 2 of"')).toBeVisible()
});

test('theme toggle works correctly', async ({ page }) => {
  await page.goto('/')

  // Check initial theme
  await expect(page.locator('html')).not.toHaveClass(/dark/)

  // Toggle theme
  await page.click('[aria-label="Switch to dark theme"]')
  await expect(page.locator('html')).toHaveClass(/dark/)
});

test('multiple cuisine filters work together', async ({ page }) => {
  await page.goto('/')
  await page.fill('[placeholder*="outcode"]', 'ec4m')
  await page.click('button:has-text("Search")')

  // Select multiple cuisines
  await page.click('text=Italian')
  await page.click('text=Pizza')

  // Verify filtered results
  await expect(page.locator('text="(Filtered)"')).toBeVisible()
  await expect(page.locator('[data-testid="cuisine-filter"]')).toContainText('2 cuisines selected')
});
