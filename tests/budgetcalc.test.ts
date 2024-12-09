import { test, expect } from '@playwright/test';
import { verifySegmentAnalyticsEvents, visitAndVerifyScreens, ScreenData } from '../utils/segmentdata.ts';
import fs from 'fs';
import path from 'path';

  
  test.describe('Visual Regression Testing Flow', () => {
    const imageDir = path.join(process.cwd(), 'tests', 'snapshots');
    const imageFileName = 'budget-calc.png';
    const screenshotPath = path.join(imageDir, imageFileName);
    // Create the directory if it doesn't exist
    if (!fs.existsSync(imageDir)) {
      console.log(`Creating snapshot directory: ${imageDir}`);
      fs.mkdirSync(imageDir, { recursive: true });
    }

    const expectedScreenNames: ScreenData[] = [
      { url: 'https://www.earnin.com/financial-calculators', screenName: 'Website EarnIn dotcom - Financial Calculators Page' },
    ];

    test.beforeEach(async ({ page }) => {
        //segmentsanalytics
        verifySegmentAnalyticsEvents(page, expectedScreenNames);
        await visitAndVerifyScreens(page, expectedScreenNames);
        // Runs before each test and signs in each page.
        await page.click('button#onetrust-accept-btn-handler');
        await page.waitForTimeout(1000);
      });

    //First run: Capture baseline snapshot always fail
    test('capture baseline snapshot financial calc', async ({ page }) => {
      test.fail();
      await expect(page).toHaveScreenshot(screenshotPath, {
        threshold: 1,  // Allow up to 1% of pixels to be different
      });
    });
  
    // Subsequent runs: Compare future snapshots to the baseline
    test('should match the baseline snapshot financial calc', async ({ page }) => {
      await expect(page).toHaveScreenshot(screenshotPath, {
        threshold: 1,  // Allow up to 1% of pixels to be different
      });

    });

    //Last test: always fail comparing current page with the baseline snapshot
    test('should failed the baseline snapshot matching', async ({ page }) => {
        test.fail();
        const imageLocator = page.locator('[data-testid="financial-calculator-Budget calculator-card"]');
        await imageLocator.hover();
        await page.waitForTimeout(1000); // Wait for 1 second
        await imageLocator.click();
        const expectedScreenNames1: ScreenData[] = [
          { url: 'https://www.earnin.com/financial-tools/budget-calculator', screenName: 'Budget Calculator' },
        ];
        verifySegmentAnalyticsEvents(page, expectedScreenNames1);
        await visitAndVerifyScreens(page, expectedScreenNames1);
        // Compare the current page with the baseline snapshot
        await expect(page).toHaveScreenshot(screenshotPath);
        await page.close();
      });
    
  });