import UserAnswerEditor from "~/ui/components/QuestionEditor/UserAnswerEditor";
import type { QuestionVm } from "./QuestionVm";
import { MathEditor } from "~/ui/components/MathEditor/MathEditor";



export function QuestionRenderer(props: { questionVm: QuestionVm }) {
    const { questionVm } = props;
    return (
        <div key={questionVm.id} className="bg-white border border-slate-200 shadow-sm">
            <h3>{questionVm.id} {questionVm.question}</h3>
            <UserAnswerEditor initialValue={questionVm.answer} onAnswerChanged={(answer) => questionVm.setAnswer(answer)} />
            <MathEditor onSubmit={(value) => {}}/>
        </div>
    );
}