import { makeAutoObservable, runInAction } from "mobx";
import { QuestionVm } from "./QuestionVm";

export class SubmitPageStore {
    next(): void {
        runInAction(() => {
            if (this.currentIndex < this.questions.length - 1) {
                this.currentIndex++;
            }
        });
    }
    prev(): void {
        runInAction(() => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        });
    }

    questions: QuestionVm[];
    currentIndex: number;

    constructor() {
        this.questions = QuestionVm.createSampleQuestions();
        this.currentIndex = 0;
        makeAutoObservable(this, {
            currentIndex: true,
        });
    }


}