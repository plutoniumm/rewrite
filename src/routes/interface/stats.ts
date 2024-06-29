interface Options {
  w5000: string[];
  raw: any;
};

// returning innermost 'text'
function recurse (node) {
  if (node.text) return node.text;
  if (node.content) return recurse(node.content);
  if (typeof node === 'object' && node.length)
    return node.map(recurse).join('.');
}

export function Stats (string: string, opts: Options) {
  const words = string
    .replace(/[.!?|\(|\)<>\[\]{}@#\$\%\^\&\*]/g, " ")
    .replace(/[,\-\\\/'"`:;=_]/g, " ")
    .replaceAll('\n', ' ')
    .split(" ")
    .filter((w) => w.length > 1);

  let longs = [];
  if (opts.raw.content?.content) {
    const textNodes = opts
      .raw.content.content
      .filter(e => ['bullet_list', 'ordered_list', 'paragraph'].includes(e.type.name))
      .map(e => e.toJSON())
      .map(recurse)
      .join('.')
      .split('.')

    for (let i = 0; i < textNodes.length; i++) {
      // obviously like 10 words is not 30 words
      if (textNodes[i].length < 50) continue;
      const words = textNodes[i].split(' ');
      if (words.length > 30) longs.push(textNodes[i]);
    };
  }

  return {
    count: string.length,
    words: words.length,
    longs: longs,
  };
}