import { MathEditor } from "~/ui/components/MathEditor/MathEditor";
import SubmitPageProvider, { useSubmitPageStore } from "./SubmitContext";
import { observer } from "mobx-react-lite";


function SubmitPage() {
    return (<SubmitPageProvider>
        <Body />
    </SubmitPageProvider>);
}

const Body = observer(() => {
    const store = useSubmitPageStore();
    const question = store.questions[store.currentIndex];
    return (<div className="border border-slate-200 shadow-lg max-w-[576px] mx-auto">
        <MathEditor onSubmit={(value) => { }} />
    </div>);
});


export default SubmitPage;