import clsx from "clsx";
import style from "./../style.module.css";
import AppBarLogo from "~/ui/components/AppBarLogo";

export function AppBar() {
    return (<div className={clsx(style.appbar, "flex flex-row items-center justify-between shadow-sm min-h-[48px] px-3 py-2")}>
        <div>
            <AppBarLogo />
        </div>
    </div>);
}