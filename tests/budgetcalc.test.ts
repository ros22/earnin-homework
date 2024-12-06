import { test, expect, chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

  
  test.describe('Visual Regression Testing Flow', () => {

    test.beforeEach(async ({ page }) => {
        // // Function to delete the image file if it exists
        // function deleteImageIfExists(imagePath: string): void {
        //     if (fs.existsSync(imagePath)) {
        //     fs.unlinkSync(imagePath);
        //     console.log(`Deleted image at: ${imagePath}`);
        //     }
        // }
        // const imagePath = path.join(__dirname, './tests/budgetcalc.test.ts-snapshots/*.png');
        // deleteImageIfExists(imagePath); // Delete image before tests run
        
        // Runs before each test and signs in each page.
        await page.goto("https://www.earnin.com/financial-calculators");
        await page.click('button#onetrust-accept-btn-handler');
        await page.waitForTimeout(1000);
      });

    // First run: Capture baseline snapshot
    test('capture baseline snapshot financial calc', async ({ page }) => {
      // Capture screenshot of the current state and store as a baseline
      await expect(page).toHaveScreenshot('budget-calc.png');
    });
  
    // Subsequent runs: Compare future snapshots to the baseline
    test('should match the baseline snapshot financial calc', async ({ page }) => {
    //   // Navigate to the page
    //   await page.goto("https://www.earnin.com/financial-calculators");
    //   await page.click('button#onetrust-accept-btn-handler');
    //   await page.waitForTimeout(1000);
      // Compare the current page with the baseline snapshot
      await expect(page).toHaveScreenshot('budget-calc.png');

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
        await expect(page).toHaveScreenshot('budget-calc.png');
        await page.close();
      });
    
  });