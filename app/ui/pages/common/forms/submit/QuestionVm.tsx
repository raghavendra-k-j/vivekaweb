import { QuestionRenderer } from "./QuestionRenderer";
import { makeAutoObservable, observable, runInAction } from "mobx";


export class QuestionVm {

    static createSampleQuestions(): QuestionVm[] {
        return Array.from({ length: 200 }, (_, index) => 
            new QuestionVm({ id: index + 1, question: `Question ${index + 1}` })
        );
    }

    id: number;
    question: string;
    answer: string;

    constructor({ id, question }: { id: number, question: string }) {
        this.id = id;
        this.question = question;
        this.answer = "";
        makeAutoObservable(this, {
            answer: observable
        });
    }

    setAnswer(answer: string) {
        runInAction(() => {
            this.answer = answer;
        });
    }

    render(): React.ReactNode {
        return (<QuestionRenderer key={this.id} questionVm={this} />);
    }
}