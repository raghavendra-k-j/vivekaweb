import clsx from "clsx";

const buttonStyle = clsx(
    "px-4 py-2 rounded-sm transition-colors",
    "bg-[--color-primary] text-[--color-on-primary]",
    "hover:bg-[--color-primary-hover] hover:text-[--color-on-primary-hover]"
);

function Button() {
    return <button className={buttonStyle}>Click On Me</button>;
}

export default Button;
