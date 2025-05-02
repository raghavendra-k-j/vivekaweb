import { makeAutoObservable, observable, runInAction } from "mobx";
import { CategoryVm } from "./models/CategoryVm";
import type { KeyItemVm } from "./models/KeyItemVm";
import type { MathfieldElement, Selector } from "mathlive";
import { logger } from "~/core/utils/logger";
import { meLogger } from "./MathEditorContext";

export class MathEditorStore {

    category: CategoryVm;
    mf: MathfieldElement | null = null;

    constructor() {
        this.category = CategoryVm.items[0];
        makeAutoObservable(this, {
            mf: observable,
            category: observable,
        });
    }

    get hasMf() {
        return this.mf !== null;
    }

    onMfReady(mf: MathfieldElement) {
        runInAction(() => {
            meLogger.debug("MathEditorStore", "onMfReady", mf);
            this.mf = mf;
        });
        mf.mathVirtualKeyboardPolicy = "manual";
        mf.placeholder = "Enter a formula";
        mf.focus();
    }

    onChangeCategory(category: CategoryVm) {
        runInAction(() => {
            this.category = category;
        });
    }

    onKeyPress(item: KeyItemVm) {
        if (!this.mf) return;
        this.mf.insert(item.latex, {
            focus: true
        });
    }

    navigateLeft() {
        this.execKeyboardAction("moveToPreviousChar");
    }

    navigateRight() {
        this.execKeyboardAction("moveToNextChar");
    }

    backspace() {
        this.execKeyboardAction("deleteBackward");
    }

    execKeyboardAction(selector: Selector) {
        if (!this.mf) {
            logger.warn("MathEditorStore", "execKeyboardAction", "Mathfield is not ready");
            return;
        }
        this.mf.executeCommand(selector);
        this.mf.focus();
    }


}