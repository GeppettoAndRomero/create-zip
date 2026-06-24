import type { ToolContent } from './types';

// Deutsch. Transkreation + unabhängige QA.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'ZIP-Datei erstellen online — im Browser, ohne Upload | runlocally',
    description:
      'Packe deine Dateien direkt im Browser in ein einziges .zip-Archiv. Die Dateien werden auf deinem Gerät gelesen und nie hochgeladen. Umlaute und andere Sonderzeichen in Dateinamen bleiben unter Windows korrekt. Open Source, funktioniert offline.',
    ogTitle: 'ZIP-Datei erstellen — im Browser, ohne Upload',
    ogDescription:
      'Erstelle aus beliebigen Dateien ein .zip, direkt im Browser. Nichts wird hochgeladen. Japanische und andere Dateinamen mit Sonderzeichen bleiben unter Windows korrekt. Open Source, funktioniert offline.',
  },

  hero: {
    h1: 'ZIP-Datei erstellen',
    tagline:
      'Packe beliebige Dateien in ein einziges .zip-Archiv — im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'Dateien im Browser packen',
    paras: [
      'Dieses Tool packt die Dateien, die du auswählst — Dokumente, Fotos, Code, ganze Ordner — in ein einziges .zip-Archiv. Füge so viele hinzu, wie du magst; doppelte Namen werden umbenannt, sodass nichts unbemerkt überschrieben wird.',
      'Das Packen läuft in deinem Browser über @zip.js/zip.js. Die Dateien werden auf deinem Gerät gelesen und das Archiv wird lokal erstellt, also gibt es keinen Upload und kein Warten auf einen Server.',
      'Dateinamen werden mit gesetztem UTF-8-Flag geschrieben, sodass japanische Namen und andere Namen mit Sonderzeichen im Windows-Explorer korrekt entpackt werden, statt zu Zeichensalat (mojibake) zu werden — ein häufiges Problem bei Archiven, die auf die falsche Art erstellt wurden.',
    ],
  },

  privacy: {
    h2: 'Warum deine Dateien auf deinem Gerät bleiben',
    lead: 'Der Datenschutz ist hier strukturell bedingt, kein bloßes Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem hochgeladen werden könnte:',
    points: [
      'Das Archiv wird vollständig in deinem Browser erstellt.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit deinen Dateidaten.',
      'Der Quellcode ist offen, und jeder kann ihn lesen (MIT).',
      'Es funktioniert offline, was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne das Netzwerk-Panel deines Browsers, während du ein ZIP-Archiv erstellst — keine Anfrage trägt deine Dateien nach außen.',
    sourceLinkText: 'Lies den Quellcode.',
  },

  howto: {
    h2: 'So benutzt du es',
    steps: [
      {
        h3: 'Dateien hinzufügen',
        p: 'Klicke, um Dateien auszuwählen, oder zieh sie irgendwo auf die Seite. Füge so viele hinzu, wie du magst, auch ganze Ordner.',
      },
      {
        h3: 'Die Liste prüfen',
        p: 'Sieh dir an, was ins Archiv kommt. Doppelte Namen werden umbenannt, und du kannst vor dem Packen alles entfernen, was du nicht dabeihaben willst.',
      },
      {
        h3: 'Das ZIP-Archiv herunterladen',
        p: 'Erstelle das Archiv und lade ein einziges .zip-Archiv herunter. Die Dateinamen behalten ihre ursprünglichen Zeichen, auch Namen mit Sonderzeichen unter Windows.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Werden meine Dateien irgendwohin hochgeladen?',
      a: 'Nein. Das Archiv wird vollständig in deinem Browser erstellt. Es gibt keine Server-Komponente, also haben deine Dateien keinen Weg von deinem Gerät weg. Der Quellcode ist offen, und du kannst das im Netzwerk-Panel deines Browsers nachprüfen.',
    },
    {
      q: 'Kann ich beliebige Dateitypen packen?',
      a: 'Ja. Es funktioniert mit beliebigen Dateien — Dokumenten, Fotos, Code, Archiven, ganzen Ordnern. Es ist nicht auf einen Typ beschränkt, und es konvertiert oder kodiert nichts neu; deine Dateien landen genau so im Archiv, wie sie sind.',
    },
    {
      q: 'Warum wird aus japanischen Dateinamen in einem Zip manchmal Zeichensalat?',
      a: 'Das ZIP-Format ging ursprünglich von alten Codepages aus, nicht von Unicode. Wenn ein Archiv Namen mit Sonderzeichen speichert, ohne sie als UTF-8 zu kennzeichnen, dekodiert der Windows-Explorer sie mit der falschen Kodierung, und du bekommst Zeichensalat (mojibake). Dieses Tool setzt das UTF-8-Flag für Dateinamen, sodass japanische Namen und andere Namen mit Sonderzeichen korrekt entpackt werden.',
    },
    {
      q: 'Was passiert, wenn zwei Dateien denselben Namen haben?',
      a: 'Doppelte Namen werden umbenannt, sodass eine zweite Datei mit demselben Namen die erste nicht unbemerkt überschreibt. Jeder Eintrag bleibt im Archiv eigenständig.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch wird es zwischengespeichert, sodass das Erstellen eines ZIP-Archivs ohne Netzwerkverbindung funktioniert. Du kannst es auch zu deinem Startbildschirm hinzufügen.',
    },
    {
      q: 'Gibt es eine Grenze für Dateigröße oder Anzahl?',
      a: 'Es gibt keine feste Grenze. Da alles in deinem Browser läuft, hängt die praktische Obergrenze vom Arbeitsspeicher deines Geräts ab. Bei sehr großen Dateimengen kann es langsamer werden oder mehr Speicher brauchen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; sämtliche Prüfung und alle Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
