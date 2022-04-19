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
        <div class='w-screen min-h-screen overflow-hidden '>
            <div class='flex gap-2 h-24 justify-between items-center px-16 overflow-x-auto'>
                <div class='font-bold text-3xl'>
                    Logo
                </div>
                <div class='flex gap-2'>
                    <a href='/' class='text-gray-600 hover:text-gray-800'>
                        Home
                    </a>
                </div>
            </div>
            <div class='grid grid-cols-9 w-full min-h-full gap-8'>
                <Sidebar />

                <div class='col-span-5 py-10 w-full h-full bg-white overflow-y-auto px-2'>
                    <Show when={data().length > 0}>
                        <Markdown text={data() ?? ""} />
                    </Show>
                </div>
                <div class='col-span-2 py-10 w-full h-full '>
                    <Show when={data().length > 0}>
                        <Toc text={data() ?? ""} />
                    </Show>
                </div>
            </div>
        </div >
    )
}

export default Base