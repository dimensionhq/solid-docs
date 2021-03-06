import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from "rehype-highlight";
import { unified } from 'unified'
import { createSignal } from 'solid-js'
import javascript from "highlight.js/lib/languages/javascript.js"
import markdown from "highlight.js/lib/languages/markdown.js"

const read = async () => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkGemoji)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeHighlight, {
            languages: { javascript, markdown },
            subset: false, plainText: ['txt', 'text']
        })
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)

    return file
}
const Markdown = ({ text }) => {
    const [result, setResult] = createSignal("")
    read().then((reader) => {
        let result = reader.processSync(text)
        console.log(String(result))
        setResult(String(result))
    }).catch((err) => {
        console.log(err)
    })
    return (
        <div
            class="overflow-auto"
            innerHTML={result()}
        />
    );
};

export default Markdown;