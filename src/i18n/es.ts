import type { ToolContent } from './types';

// Español (pan-regional). Transcreación + QA independiente.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Crear un archivo ZIP online — en tu navegador, sin subir nada | runlocally',
    description:
      'Comprime tus archivos en un único .zip directamente en tu navegador. Los archivos se leen en tu dispositivo y nunca se suben. Los nombres con caracteres no ASCII se mantienen correctos en Windows. Código abierto, funciona sin conexión.',
    ogTitle: 'Crear un archivo ZIP — en tu navegador, sin subir nada',
    ogDescription:
      'Crea un .zip a partir de cualquier archivo, directamente en tu navegador. No se sube nada. Los nombres en japonés y otros caracteres no ASCII se mantienen correctos en Windows. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Crear un archivo ZIP',
    tagline:
      'Comprime cualquier archivo en un único .zip — en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Comprimir archivos en tu navegador',
    paras: [
      'Esta herramienta agrupa los archivos que elijas — documentos, fotos, código, carpetas enteras — en un único archivo .zip. Añade los que quieras; los nombres duplicados se diferencian, así que nada se sobrescribe sin que lo notes.',
      'La compresión se ejecuta en tu navegador con @zip.js/zip.js. Los archivos se leen en tu dispositivo y el .zip se genera de forma local, así que no hay subida ni espera de un servidor.',
      'Los nombres se escriben con la marca UTF-8 activada, de modo que los nombres en japonés y otros caracteres no ASCII se extraen correctamente en el Explorador de Windows, en lugar de convertirse en caracteres extraños (texto ilegible) — un problema habitual con los archivos comprimidos de la manera equivocada.',
    ],
  },

  privacy: {
    h2: 'Por qué tus archivos no salen de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'El archivo comprimido se arma por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición con los datos de tus archivos.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo por tu cuenta, abre el panel de Red de tu navegador mientras creas un zip — ninguna petición lleva tus archivos.',
    sourceLinkText: 'Lee el código.',
  },

  howto: {
    h2: 'Cómo usarla',
    steps: [
      {
        h3: 'Añade archivos',
        p: 'Haz clic para seleccionar archivos, o arrástralos a cualquier parte de la página. Añade los que quieras, incluidas carpetas.',
      },
      {
        h3: 'Revisa la lista',
        p: 'Comprueba qué va a entrar. Los nombres duplicados se diferencian, y puedes quitar lo que no quieras antes de comprimir.',
      },
      {
        h3: 'Descarga el zip',
        p: 'Crea el archivo y descarga un único .zip. Los nombres conservan sus caracteres originales, incluidos los nombres no ASCII en Windows.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se suben mis archivos a algún sitio?',
      a: 'No. El archivo comprimido se arma por completo en tu navegador. No hay ningún componente de servidor, así que tus archivos no tienen ninguna vía para salir de tu dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Puedo comprimir cualquier tipo de archivo?',
      a: 'Sí. Funciona con cualquier archivo — documentos, fotos, código, otros comprimidos, carpetas enteras. No se limita a un solo tipo, y no convierte ni recodifica nada; tus archivos entran en el .zip tal como están.',
    },
    {
      q: '¿Por qué los nombres en japonés a veces se convierten en caracteres extraños dentro de un zip?',
      a: 'El formato ZIP daba por hecho originalmente páginas de códigos heredadas, no Unicode. Si un archivo comprimido guarda nombres no ASCII sin marcarlos como UTF-8, el Explorador de Windows los decodifica con la codificación equivocada y aparecen caracteres extraños. Esta herramienta activa la marca UTF-8 en los nombres, de modo que los nombres en japonés y otros caracteres no ASCII se extraen correctamente.',
    },
    {
      q: '¿Qué pasa si dos archivos tienen el mismo nombre?',
      a: 'Los nombres duplicados se diferencian, así que un segundo archivo con el mismo nombre no sobrescribe al primero sin que lo notes. Cada entrada se mantiene distinta dentro del .zip.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda en caché, así que crear un zip funciona sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
    {
      q: '¿Hay un límite de tamaño o de cantidad de archivos?',
      a: 'No hay un límite fijo. Como todo se ejecuta en tu navegador, el techo práctico depende de la memoria de tu dispositivo. Un conjunto de archivos muy grande puede ir más lento o necesitar más memoria.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— herramientas pequeñas que funcionan de forma local en tu dispositivo.',
    colophon:
      'Creada y mantenida por Geppetto. Parte del código se escribe con ayuda de IA; toda la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },
};
