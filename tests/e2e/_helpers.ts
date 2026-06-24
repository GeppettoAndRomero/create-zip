import { type Page, type Download } from '@playwright/test';

/** Wait until the island has hydrated and is ready to accept files. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/**
 * create-zip flow: drop a couple of files (incl. a Japanese-named one, to exercise the
 * UTF-8 filename path), then click "Create ZIP" and return the resulting download.
 */
export async function convert(page: Page): Promise<Download> {
  const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
  await page.evaluate(() => {
    const files = [
      new File(['hello'], 'readme.txt', { type: 'text/plain' }),
      new File(['日本語の内容'], '日本語.txt', { type: 'text/plain' }),
    ];
    window.dispatchEvent(new CustomEvent('filesDropped', { detail: files }));
  });
  await page.click('#create-zip-action');
  return downloadPromise;
}
