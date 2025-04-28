import clsx from "clsx";
import { buttonStyle } from "~/ui/ds/core/core.css";


function Button() {
    return ( <button className={clsx(buttonStyle)}>Click On Me</button> );
}

export default Button;