import { Component, createSignal, onMount, Show } from 'solid-js';
import Markdown from '../markdown';
import Sidebar from './sidebar';
import { useRouteData } from "solid-app-router";
import Toc from '../toc';


const Base: Component = () => {
    const path = useRouteData();
    const [data, setData] = createSignal("")
    let ref: HTMLDivElement;
    onMount(() => {
        let f_path = "http://" + window.location.host + path;

        let res = fetch(f_path).then((res) => {
            res.text().then((result) => {
                setData(result)
            })
        }).catch((err) => console.log(err))
    })

    return (
        <div class='w-screen min-h-screen '>
            <div class='flex  gap-2 h-24 justify-between items-center px-16'>
                <div class='font-bold text-3xl'>
                    Logo
                </div>
                <div class='flex gap-2'>
                    <a href='/' class='text-gray-600 hover:text-gray-800'>
                        Home
                    </a>
                </div>
            </div>
            <div class='grid grid-cols-9 w-full min-h-full gap-8 relative'>
                <Sidebar ref={ref} />

                <div class={`col-span-9 lg:col-span-5 px-2  w-full h-full bg-white lg:px-2 min-w-full overflow-auto  lg:ml-[35%]`}>
                    <Show when={data().length > 0}>
                        <Markdown text={data() ?? ""} />
                    </Show>
                </div>
                <div class='col-span-2 py-10 min-w-fit h-full hidden lg:block fixed right-8 top-0 '>
                    <Show when={data().length > 0}>
                        <Toc text={data() ?? ""} />
                    </Show>
                </div>
            </div>
        </div >
    )
}

export default Base