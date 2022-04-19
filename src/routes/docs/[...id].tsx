import { RouteDataFunc, useRouteData } from "solid-app-router";
import Base from "~/components/docs"
import fs from "fs"
import { createSignal, onMount } from "solid-js";

export const routeData: RouteDataFunc = props => {
    let user = "# 1";
    let path = props.location.pathname + ".md"
    path = path.replace("docs/", "md/")


    return path;
};

const Introduction = () => {
    return (
        <Base>
        </Base>
    )
}

export default Introduction