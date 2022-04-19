import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from "rehype-highlight";
import { createSignal, onMount } from "solid-js";
import remarkToc from "remark-toc"
import { remark } from "remark";
import { unified } from "unified";

const reader_toc = async () => {
    const file = await remark()
        .use(remarkParse)
        .use(remarkToc, { ordered: true })

    return file
}

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

const Toc = ({ text }) => {
    const [result, setResult] = createSignal("")
    let rootRef: HTMLDivElement;

    reader_toc().then((reader) => {

        let result = reader.process(text).then((result) => {
            read().then((read) => {
                read.process(result).then((result) => {
                    setResult(String(result))
                    // get all heading tags from page
                    let headings = rootRef.querySelectorAll('h1, h2, h3, h4, h5, h6')
                    // encapsulate them with an a tag 
                    headings.forEach(heading => {
                        let link = document.createElement('a')
                        link.setAttribute('href', '#' + heading.id)
                        link.innerHTML = heading.innerHTML
                        heading.innerHTML = ''
                        heading.appendChild(link)
                    })
                    // add a class to all other elements other than headings
                    let otherElements = rootRef.querySelectorAll('p, li, span, img, table, tr, td, th, blockquote, pre, code, em, strong, ul, ol, hr, br')
                    otherElements.forEach(element => {
                        element.classList.add("hidden")
                    })
                })
            })
        })
    })

    onMount(() => {


    })
    return (
        <div ref={rootRef} class="toc px-4 py-8">
            <div innerHTML={result()}></div>
        </div>
    )
}

export default Toc