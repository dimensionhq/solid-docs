import { For, Show } from "solid-js";
import "solid-js/web"
import contents from "~/utils/contents";
import { Link } from "solid-app-router"

const Sidebar = () => {
    return (
        <div class='col-span-2 min-w-fit w-[300px] h-full items-start justify-start text-black py-24 px-16 flex-col gap-2 overflow-y-auto fixed top-0 left-0 hidden lg:flex'>
            <Show when={contents !== undefined}>
                <For each={contents}>
                    {(page, index) => (
                        <div class="w-full">
                            <div class="flex items-center w-full font-bold px-2">
                                {page.title}
                            </div>
                            <For each={page.contents}>
                                {(content, index) => (
                                    <a onClick={() => window.location.replace(content.slug)} href={content.slug}>
                                        <div class="flex p-2 hover:bg-primary-100">
                                            {content.title}
                                        </div>
                                    </a>
                                )}
                            </For>
                        </div>
                    )}
                </For >
            </Show>
        </div >
    )
}

export default Sidebar;