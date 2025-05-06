import { useAppContext } from "../_layout/AppContext";

export default function IndexRoute() {
    const appContext = useAppContext();
    return (
        <div>
            <h1>Index Route</h1>
            <div>{appContext.appEnv.webBase}</div>
        </div>
    );
}