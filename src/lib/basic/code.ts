import { getHighlighter, type Highlighter, type BuiltinLanguage } from 'shiki';
import { createParser, type Parser } from 'prosemirror-highlight/shiki';
import { createHighlightPlugin } from 'prosemirror-highlight';

let highlighterPromise: U<Promise<void>>;
let highlighter: U<Highlighter>;
let parser: U<Parser>;
const loadedLanguages = new Set<string>()

const validLangs = ['typescript', 'pyth', 'javascript', 'json', 'html', 'css', 'shell', 'yaml', 'markdown', 'xml', 'ocaml', 'rust', 'go', 'c', 'cpp', 'c++', 'java', 'kotlin', 'swift', 'php', 'ruby', 'fortran', 'perl', 'lua', 'r', 'sql', 'scala', 'clojure', 'lisp', 'haskell', 'erlang', 'elixir'];
const langExts = ['ts', 'js', 'json', 'html', 'css', 'sh', 'yaml', 'md', 'xml', 'ml', 'rs', 'go', 'c', 'cpp', 'java', 'kt', 'swift', 'php', 'rb', 'f90', 'pl', 'lua', 'r', 'sql', 'scala', 'clj', 'lisp', 'hs', 'erl', 'ex'];

const lazyParser: Parser = (options): any => {
  console.log('lazyParser', options);
  const lang = options.content.split('\n')[0].toLowerCase().trim();
  if (validLangs.includes(lang) || langExts.includes(lang)) {
    options.language = lang;
  } else {
    options.language = 'typescript';
  }


  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: ['github-dark'],
      langs: ['typescript', 'python']
    }).then((h) => highlighter = h)

    return highlighterPromise
  }

  if (!highlighter) return highlighterPromise;

  const language = options.language
  if (language && !loadedLanguages.has(language)) {
    return highlighter.loadLanguage(language as BuiltinLanguage).then(() => {
      loadedLanguages.add(language)
    });
  };

  if (!parser) parser = createParser(highlighter)
  return parser(options)
}

export const shikiLazyPlugin = createHighlightPlugin({ parser: lazyParser });