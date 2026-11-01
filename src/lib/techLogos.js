import { brandIcons as b } from './brandIcons'

/* Maps a technology label (as written in the content files) to its official logo.
   Logos supplied by Yogya are used first (images); the rest are Simple Icons marks.
   No entry = no logo (never a generic or look-alike icon). */
const img = (src, title, wide = false) => ({ kind: 'img', src, title, wide })
const icon = (key) => ({ kind: 'svg', ...b[key] })

const map = {
  python: img('images/logos/python.png', 'Python'),
  mysql: img('images/logos/mysql.png', 'MySQL', true),
  claude: img('images/logos/claude-mark.png', 'Claude'),
  gemini: icon('googlegemini'),
  'gemini api': icon('googlegemini'),
  'gemini (enterprise cloud)': icon('googlegemini'),
  pandas: icon('pandas'),
  numpy: icon('numpy'),
  postgresql: icon('postgresql'),
  snowflake: icon('snowflake'),
  'snowflake (cloud data warehouse)': icon('snowflake'),
  'apache superset': icon('apachesuperset'),
  pytorch: icon('pytorch'),
  tensorflow: icon('tensorflow'),
  'hugging face': icon('huggingface'),
  langchain: icon('langchain'),
  'scikit-learn': icon('scikitlearn'),
  html: icon('html5'),
  css: icon('css'),
  javascript: icon('javascript'),
  'google cloud': icon('googlecloud'),
  github: icon('github'),
}

export const techLogo = (label) => map[String(label).toLowerCase().trim()] ?? null
