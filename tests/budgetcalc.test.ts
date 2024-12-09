import { test, expect, chromium } from '@playwright/test';
import { verifySegmentAnalyticsEvents, visitAndVerifyScreens, ScreenData } from '../segmentdata.ts';
import { deleteImageIfExists } from '../utils.ts';
import fs from 'fs';
import path from 'path';

  
  test.describe('Visual Regression Testing Flow', () => {
    const imageDir = path.join(__dirname, '/snapshots');
    const imageFileName = 'budget-calc.png';
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    // Combine directory and filename into a full path
    const screenshotPath = path.join(imageDir, imageFileName);
    // Delete any existing screenshots before the test runs
    //deleteImageIfExists(imageDir, '.png');

    const expectedScreenNames: ScreenData[] = [
      { url: 'https://www.earnin.com/financial-calculators', screenName: 'Website EarnIn dotcom - Financial Calculators Page' },
      // { url: 'https://www.earnin.com/financial-tools/budget-calculator', screenName: 'Budget Calculator' },
    ];

    test.beforeEach(async ({ page }) => {
        
        verifySegmentAnalyticsEvents(page, expectedScreenNames);
        await visitAndVerifyScreens(page, expectedScreenNames);
        // Runs before each test and signs in each page.
        // await page.goto("https://www.earnin.com/financial-calculators");
        await page.click('button#onetrust-accept-btn-handler');
        await page.waitForTimeout(1000);
      });

    // First run: Capture baseline snapshot
    // test('capture baseline snapshot financial calc', async ({ page }) => {
    //   await page.screenshot({ path: screenshotPath, fullPage: true });
    //   // Capture screenshot of the current state and store as a baseline
    //   await expect(page).toHaveScreenshot(screenshotPath, {
    //     threshold: 1,  // Allow up to 1% of pixels to be different
    //   });
    // });
  
    // Subsequent runs: Compare future snapshots to the baseline
    test('should match the baseline snapshot financial calc', async ({ page }) => {
    //   // Navigate to the page
    //   await page.goto("https://www.earnin.com/financial-calculators");
    //   await page.click('button#onetrust-accept-btn-handler');
    //   await page.waitForTimeout(1000);
      // Compare the current page with the baseline snapshot
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await expect(page).toHaveScreenshot(screenshotPath, {
        threshold: 1,  // Allow up to 1% of pixels to be different
      });

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
        const expectedScreenNames1: ScreenData[] = [
          //{ url: 'https://www.earnin.com/financial-calculators', screenName: 'Website EarnIn dotcom - Financial Calculators Page' },
          { url: 'https://www.earnin.com/financial-tools/budget-calculator', screenName: 'Budget Calculator' },
        ];
        verifySegmentAnalyticsEvents(page, expectedScreenNames1);
        await visitAndVerifyScreens(page, expectedScreenNames1);
        // await page.waitForURL('https://www.earnin.com/financial-tools/budget-calculator');
    
        // Compare the current page with the baseline snapshot
        await expect(page).toHaveScreenshot(screenshotPath);
        await page.close();
      });
    
  });