import { makeAutoObservable, observable, runInAction } from "mobx";
import type { FormDetail } from "~/domain/forms/models/FormDetail";
import { CurrentFragment } from "./models/CurrentFragment";
import type { Language } from "~/domain/forms/models/Language";

export class SubmitStore {
    

    formDetail: FormDetail;
    currentFragment: CurrentFragment;
    selectedLanguage: Language | null = null;

    constructor({ ...props }: { formDetail: FormDetail }) {
        this.formDetail = props.formDetail;

        if(this.formDetail.hasResponse) {
            this.currentFragment = CurrentFragment.AlreadySubmitted;
        }
        else {
            this.currentFragment = CurrentFragment.Preview;
        }

        makeAutoObservable(this, {
            currentFragment: observable,
            selectedLanguage: observable,
        });
    }

    onLanguageSelected(selected: Language) {
        runInAction(() => {
            this.selectedLanguage = selected;
        });
    }

}