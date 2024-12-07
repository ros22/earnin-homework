import { test, expect, chromium } from '@playwright/test';
import { deleteImageIfExists } from '../utils.ts';
import fs from 'fs';
import path from 'path';

  
  test.describe('Visual Regression Testing Flow', () => {
    const imageDir = path.join(__dirname, '/snapshots');
    const imageFileName = 'budget-calc.png';
    
    // Combine directory and filename into a full path
    const screenshotPath = path.join(imageDir, imageFileName);
    // Delete any existing screenshots before the test runs
    //deleteImageIfExists(imageDir, '.png');

    test.beforeEach(async ({ page }) => {
        // Runs before each test and signs in each page.
        await page.goto("https://www.earnin.com/financial-calculators");
        await page.click('button#onetrust-accept-btn-handler');
        await page.waitForTimeout(1000);
      });

    // First run: Capture baseline snapshot
    test('capture baseline snapshot financial calc', async ({ page }) => {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      // Capture screenshot of the current state and store as a baseline
      await expect(page).toHaveScreenshot(screenshotPath);
    });
  
    // Subsequent runs: Compare future snapshots to the baseline
    test('should match the baseline snapshot financial calc', async ({ page }) => {
    //   // Navigate to the page
    //   await page.goto("https://www.earnin.com/financial-calculators");
    //   await page.click('button#onetrust-accept-btn-handler');
    //   await page.waitForTimeout(1000);
      // Compare the current page with the baseline snapshot
      await expect(page).toHaveScreenshot(screenshotPath);

    });

    test('should failed the baseline snapshot matching', async ({ page }) => {
        test.fail();
        // Navigate to the page
        // await page.goto("https://www.earnin.com/financial-calculators");
        // await page.click('button#onetrust-accept-btn-handler');
        // await page.waitForTimeout(1000);
  
        const imageLocator = page.locator('[data-testid="financial-calculator-Budget calculator-card"]');
        await imageLocator.hover();
        await page.waitForTimeout(1000); // Wait for 1 second
        await imageLocator.click();
        await page.waitForURL('https://www.earnin.com/financial-tools/budget-calculator');
    
        // Compare the current page with the baseline snapshot
        await expect(page).toHaveScreenshot(screenshotPath);
        await page.close();
      });
    
  });