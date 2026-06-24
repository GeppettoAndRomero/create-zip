import { describe, it, expect } from 'vitest';
import { configure, ZipReader, BlobReader } from '@zip.js/zip.js';
import { createZip } from '@/utils/zipEngine';

// In Node (vitest) there are no Web Workers; compress inline.
configure({ useWebWorkers: false });

const file = (name: string, content: string) =>
  new File([content], name, { type: 'text/plain' });

async function entryNames(blob: Blob): Promise<string[]> {
  const reader = new ZipReader(new BlobReader(blob));
  const entries = await reader.getEntries();
  await reader.close();
  return entries.map((e) => e.filename);
}

describe('createZip', () => {
  it('archives multiple files and reads them back', async () => {
    const blob = await createZip([file('a.txt', 'AAA'), file('日本語.txt', 'BBB')]);
    expect(blob.type).toBe('application/zip');
    expect((await entryNames(blob)).sort()).toEqual(['a.txt', '日本語.txt'].sort());
  });

  it('sets the UTF-8 flag (bit 11) so non-ASCII names survive on Windows', async () => {
    const blob = await createZip([file('日本語.txt', 'x')]);
    const reader = new ZipReader(new BlobReader(blob));
    const entries = await reader.getEntries();
    await reader.close();
    expect(entries[0].filenameUTF8).toBe(true);
  });

  it('disambiguates duplicate names', async () => {
    const blob = await createZip([file('a.txt', '1'), file('a.txt', '2'), file('a.txt', '3')]);
    expect((await entryNames(blob)).sort()).toEqual(['a (1).txt', 'a (2).txt', 'a.txt'].sort());
  });

  it('disambiguates duplicate names that have no extension', async () => {
    const blob = await createZip([file('LICENSE', '1'), file('LICENSE', '2')]);
    expect((await entryNames(blob)).sort()).toEqual(['LICENSE', 'LICENSE (1)'].sort());
  });

  it('uses the folder-relative path when present', async () => {
    const f = file('photo.txt', 'x');
    Object.defineProperty(f, 'webkitRelativePath', { value: 'album/photo.txt' });
    expect(await entryNames(await createZip([f]))).toEqual(['album/photo.txt']);
  });

  it('reports progress per file', async () => {
    const seen: number[] = [];
    await createZip([file('a', '1'), file('b', '2')], (p) => seen.push(p.index));
    expect(seen).toEqual([0, 1]);
  });

  it('rejects an empty file list', async () => {
    await expect(createZip([])).rejects.toThrow();
  });
});
