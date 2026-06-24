import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { waitReady, convert } from './_helpers';

const isZip = (b: Buffer) => b[0] === 0x50 && b[1] === 0x4b; // local file header 'PK'

test.describe('ZIP creation', () => {
  test('zips files in the browser with no upload', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (
        !url.startsWith('http://localhost:4321') &&
        !url.startsWith('data:') &&
        !url.startsWith('blob:')
      ) {
        external.push(url);
      }
    });

    await page.goto('/create-zip/');
    await waitReady(page);

    const download = await convert(page);
    expect(download.suggestedFilename()).toMatch(/\.zip$/);

    const buf = readFileSync((await download.path()) as string);
    expect(buf.length).toBeGreaterThan(50);
    expect(isZip(buf)).toBe(true);

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });
});
