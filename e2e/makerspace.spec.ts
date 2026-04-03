import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and displays hero content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Tinker Lab/)
    // Hero title comes from Drupal content or fallback
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('displays navigation links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/workshops"]').first()).toBeVisible()
    await expect(page.locator('a[href="/equipment"]').first()).toBeVisible()
    await expect(page.locator('a[href="/events"]').first()).toBeVisible()
  })
})

test.describe('Workshops', () => {
  test('lists workshop content', async ({ page }) => {
    await page.goto('/workshops')
    await expect(page.locator('h1')).toContainText('Workshops')
    await expect(page.locator('text=Laser Cutting 101').first()).toBeVisible()
    await expect(page.locator('text=Intro to Woodworking').first()).toBeVisible()
  })

  test('workshop detail page loads', async ({ page }) => {
    await page.goto('/workshops/laser-cutting-101')
    await expect(page.locator('text=Laser Cutting 101').first()).toBeVisible()
  })
})

test.describe('Equipment', () => {
  test('lists equipment content', async ({ page }) => {
    await page.goto('/equipment')
    await expect(page.locator('h1')).toContainText('Equipment')
    await expect(page.locator('text=Laser Cutters').first()).toBeVisible()
    await expect(page.locator('text=3D Printers').first()).toBeVisible()
  })

  test('equipment detail page loads', async ({ page }) => {
    await page.goto('/equipment/laser-cutters')
    await expect(page.locator('text=Laser Cutters').first()).toBeVisible()
  })
})

test.describe('Events', () => {
  test('lists event content', async ({ page }) => {
    await page.goto('/events')
    await expect(page.locator('h1')).toContainText('Events')
    await expect(page.locator('text=Spring Open House').first()).toBeVisible()
  })

  test('event detail page loads', async ({ page }) => {
    await page.goto('/events/open-house')
    await expect(page.locator('text=Spring Open House').first()).toBeVisible()
  })
})

test.describe('Static Pages', () => {
  test('about page loads', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=About').first()).toBeVisible()
  })
})
