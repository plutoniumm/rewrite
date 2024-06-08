interface Freq {
  [key: string]: number;
};
function frequency (array: string[]) {
  const freq: Freq = {};
  for (let i = 0; i < array.length; i++) {
    const word = array[i];
    if (freq[word]) {
      freq[word]++;
    } else {
      freq[word] = 1;
    };
  };
};

interface Options {
  w5000: string[];
};

export function Stats (string: string, opts: Options) {
  const words = string.split(" ").filter((w) => /\w/.test(w));
  const sentences = string.split(/[.!?]/).filter((s) => s.length > 0);

  const filtered = string.split(" ").filter((w) => !opts.w5000.includes(w));

  return {
    count: string.length,
    words: words.length,
  };
}