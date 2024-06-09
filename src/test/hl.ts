const PREFIX = 'rt-';
const GRAMMAR: any = {
  "in-quotes": "(\"[^\"].*?\")",
  "in-parentheses": "(\\(.*\\))",
  "in-single-quotes": "('[^\'].*?')",
  "common-word": {
    "regexp": "(\\b(?:the|of|and|is|am|are|be|was|were|at|because|or|than|then|from|as|to)\\b)",
    "insensitive": true
  },
  "number": "(\\d+(?:\\.\\d+)?)",
  "period": "(\\.)",
  "comma": "(,)",
  "semicolon": "(;)",
  "question-mark": "(\\?)",
  "exclamation-point": "(!)",
  "dash": "(--)",
};

function highlight (text: string) {
  let result = text.
    replace('<', '&lt;').
    replace('>', '&gt;').
    replace('&', '&amp;');

  let keys = Object.keys(GRAMMAR);
  for (let i = 0, len = keys.length; i < len; i++) {
    let name = keys[i];
    let regexp;
    if (GRAMMAR[name].big) {
      regexp = new RegExp(GRAMMAR[name], 'g');
    } else {
      let str = GRAMMAR[name]['regexp'];
      let insensitive = GRAMMAR[name]['insensitive'];
      let flags = 'g';
      if (insensitive)
        flags += 'i';
      regexp = new RegExp(str, flags);
    }

    let openTag = '<span class="' + PREFIX + name + '">';
    let closeTag = '</span>';
    result = result.replace(regexp, openTag + '$1' + closeTag);
  }

  return result;
}


const str = `I know not why I am so sad, it wearies me; you say it wearies you; but how I caught it, found it, or came by it, what stuff 'tis made of, whereof it is born, I am to learn; and such a want-wit sadness makes of me, that I have much ado to know myself. --William Shakespeare

"Hello, world!" is a common first program for beginning programmers. --Wikipedia`;

const result = highlight(str);
console.log(result);