import { Page } from '@playwright/test';

export interface ScreenData {
  url: string;
  screenName: string;
}

/**
 * Set up an event listener to verify Segment analytics events ("User viewed Screen") via requests.
 * @param page - The Playwright Page object.
 * @param expectedScreenNames - Array of expected screen names and URLs.
 */
export function verifySegmentAnalyticsEvents(page: Page, expectedScreenNames: ScreenData[]): void {
  page.on('request', async (request) => {
    // Segment's endpoint URL, typically something like 'https://api.segment.io/v1/track'
    const segmentEndpoint = 'https://api.segment.io/v1/t';

    // Check if the request URL matches the Segment API endpoint
    if (request.url().includes(segmentEndpoint)) {
      // Only consider POST requests to the Segment endpoint
      if (request.method() === 'POST') {
        try {
          // Parse the POST body (request data)
          const postData = request.postData();
          if (postData) {
            const parsedData = JSON.parse(postData);

            // Check if the event is "User viewed Screen"
            if (parsedData.event === 'User viewed Screen') {
              const screenName = parsedData.properties.screenName;

              // Validate that screenName is expected
              if (screenName) {
                const isValidScreenName = expectedScreenNames.some(page => page.screenName === screenName);
                if (isValidScreenName) {
                  console.log(`Verified event for screen: ${screenName}`);
                } else {
                  console.warn(`Unexpected screenName: ${screenName}`);
                }
              } else {
                console.warn('No screenName in event');
              }
            }
          }
        } catch (error) {
          console.error('Error parsing request data:', error);
        }
      }
    }
  });
}

/**
 * Utility to navigate to pages and verify Segment events are tracked.
 * @param page - The Playwright Page object.
 * @param expectedScreenNames - Array of expected screen names and URLs.
 */
export async function visitAndVerifyScreens(page: Page, expectedScreenNames: ScreenData[]): Promise<void> {
  for (const { url, screenName } of expectedScreenNames) {
    // Navigate to the page
    await page.goto(url);
    console.log(`Visiting page: ${screenName}`);

    // Wait for a bit to ensure the event is fired and processed
    await page.waitForTimeout(1000); // Adjust timeout as needed
  }
}
