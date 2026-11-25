import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema, type Options } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

/**
 * Strict allow-list. Raw HTML inside the Markdown is dropped (remark-rehype is not told to pass it through),
 * images are removed (relative README images would break anyway), and only http(s)/mailto links survive.
 */
const schema: Options = {
  ...defaultSchema,
  tagNames: [
    "h2", "h3", "h4", "p", "br", "hr", "ul", "ol", "li", "blockquote", "pre", "code", "em", "strong", "del", "a",
    "table", "thead", "tbody", "tr", "th", "td",
  ],
  attributes: { a: ["href"], code: [["className", /^language-[\w-]+$/]] },
  protocols: { href: ["http", "https", "mailto"] },
  clobberPrefix: "readme-",
};

export async function sanitizeReadme(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype) // allowDangerousHtml deliberately NOT set: embedded HTML/scripts are discarded
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(markdown.slice(0, 60_000));
  // Every external link gets rel/target hardening after sanitising.
  return String(file).replace(/<a href=/g, '<a rel="noopener noreferrer nofollow" target="_blank" href=');
}
