export type ErrorPageProps = {
    message: string;
    description: string;
    stack?: string;
}


function ErrorPage(props: ErrorPageProps) {
    return (<div>
        <h1>{props.message}</h1>
        <p>{props.description}</p>
        {props.stack && (
            <pre className="w-full p-4 overflow-x-auto">
                <code>{props.stack}</code>
            </pre>
        )}
    </div>);
}

export default ErrorPage;