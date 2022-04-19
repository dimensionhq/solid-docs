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

const read = async () => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkGemoji)
        .use(remarkRehype)
        .use(rehypeFormat)
        .use(rehypeHighlight)
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
    })
    return (
        <div
            innerHTML={result()}
        />
    );
};

export default Markdown;