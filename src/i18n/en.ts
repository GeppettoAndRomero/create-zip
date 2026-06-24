import type { ToolContent } from './types';

// create-zip. English source content.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Create a ZIP file online — in your browser, no upload | runlocally',
    description:
      'Zip files into a single .zip archive directly in your browser. Files are read on your device and never uploaded. Non-ASCII filenames stay correct on Windows. Open source, works offline.',
    ogTitle: 'Create a ZIP file — in your browser, no upload',
    ogDescription:
      'Make a .zip from any files, right in your browser. Nothing is uploaded. Japanese and other non-ASCII filenames stay correct on Windows. Open source, works offline.',
  },

  hero: {
    h1: 'Create a ZIP file',
    tagline:
      'Zip any files into a single .zip archive — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Zip files in your browser',
    paras: [
      'This tool packs the files you choose — documents, photos, code, whole folders — into a single .zip archive. Add as many as you like; duplicate names are de-duplicated so nothing is silently overwritten.',
      'The zipping runs in your browser with @zip.js/zip.js. Files are read on your device and the archive is built locally, so there is no upload and no waiting on a server.',
      'Filenames are written with the UTF-8 flag set, so Japanese and other non-ASCII names extract correctly in Windows Explorer instead of turning into mojibake (garbled text) — a common problem with archives made the wrong way.',
    ],
  },

  privacy: {
    h2: 'Why your files stay on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The archive is built entirely in your browser.',
      'The page is served as static files and makes no request with your file data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while you build a zip — no request carries your files.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Add files',
        p: 'Click to select files, or drop them anywhere on the page. Add as many as you like, including folders.',
      },
      {
        h3: 'Check the list',
        p: 'Review what\'s going in. Duplicate names are de-duplicated, and you can remove anything you don\'t want before zipping.',
      },
      {
        h3: 'Download the zip',
        p: 'Build the archive and download a single .zip. Filenames keep their original characters, including non-ASCII names on Windows.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Are my files uploaded anywhere?',
      a: 'No. The archive is built entirely in your browser. There is no server component, so your files have no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'Can I zip any kind of file?',
      a: 'Yes. It works on any files — documents, photos, code, archives, whole folders. It is not limited to one type, and it does not convert or re-encode anything; your files go into the archive exactly as they are.',
    },
    {
      q: 'Why do Japanese filenames sometimes turn into garbled text in a zip?',
      a: 'The ZIP format originally assumed legacy code pages, not Unicode. If an archive stores non-ASCII names without marking them as UTF-8, Windows Explorer decodes them with the wrong encoding and you get mojibake. This tool sets the UTF-8 filename flag, so Japanese and other non-ASCII names extract correctly.',
    },
    {
      q: 'What happens if two files have the same name?',
      a: 'Duplicate names are de-duplicated, so a second file with the same name won\'t silently overwrite the first. Each entry stays distinct in the archive.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so building a zip works without a network connection. You can also install it to your home screen.',
    },
    {
      q: 'Is there a file size or count limit?',
      a: 'There is no fixed limit. Because everything runs in your browser, the practical ceiling depends on your device\'s memory. Very large sets of files may be slower or need more memory.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },
};
