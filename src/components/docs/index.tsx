import { Component, createSignal, onMount, Show } from 'solid-js';
import Markdown from '../markdown';
import Sidebar from './sidebar';
import { useRouteData } from "solid-app-router";
import Toc from '../toc';


const Base: Component = () => {
    const path = useRouteData();
    const [data, setData] = createSignal("")

    onMount(() => {
        let f_path = "http://" + window.location.host + path;

        let res = fetch(f_path).then((res) => {
            res.text().then((result) => {
                setData(result)
            })
        }).catch((err) => console.log(err))
    })

    return (
        <div class='w-screen h-screen grid grid-cols-8 gap-8 overflow-hidden'>
            <Sidebar />

            <div class='col-span-4 w-full h-full bg-white overflow-y-auto'>
                <Show when={data().length > 0}>
                    <Markdown text={data() ?? ""} />
                </Show>
            </div>
            <div class='col-span-2 w-full h-full bg-blue-300'>
                <Show when={data().length > 0}>
                    <Toc text={data() ?? ""} />
                </Show>
            </div>
        </div>
    )
}

export default Base