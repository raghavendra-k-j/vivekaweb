import { type RouteConfig, index, layout, route, } from "@react-router/dev/routes";
import { AppRoutes } from "./routes/AppRoutes";


function p(path: string) {
    return "./ui/pages/" + path + ".tsx";
}


const routes = [
    layout(p("_layout/AppLayout"), {id: AppRoutes.defaultLayoutId}, [
        index(p("index/IndexRoute"), {id: AppRoutes.indexId}),
        route("keyboard", p("keyboard/KeyBoardRoute"), {id: AppRoutes.keyboardId}),
        route("forms/:permalink/submit", p("forms/submit/SubmitRoute"), { id: AppRoutes.submitFormId }),
    ],),
];



export default routes satisfies RouteConfig;
