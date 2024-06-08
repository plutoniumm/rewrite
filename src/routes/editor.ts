export const dummy = `
# Hello World

- List **shiße** 2
- List _shade_ 1
- List item 3

## Subheading
[Link](https://example.com)

===

\`\`\`
// ts
console.log('Hello World');
interface Foo {
  bar: (a: number, b: string) => void;

  baz: (c: boolean) => string;
}
\`\`\`

\`\`\`
// rust
fn main() {
  println!("Hello World");
}

async fn async_fn() -> Result<(), ()> {
  Ok(())
}
\`\`\`

\`\`\`
not a lang
console.log('Hello World');
\`\`\`

> (Blockquote)
`.trim();