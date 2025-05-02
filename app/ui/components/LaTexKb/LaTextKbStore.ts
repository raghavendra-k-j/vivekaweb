import type { MathfieldElement, Selector } from "mathlive";
import { makeAutoObservable, observable, runInAction } from "mobx"
import { AppError } from "~/core/error/AppError";
import { LaTexKbService } from "~/domain/latexkb/services/LaTexKbService";
import { DataState } from "~/ui/utils/DataState";
import { KbKeyVm } from "./models/KbKeyVm";
import { CategoryVm } from "./models/CategoryVm";
import { CategoriesVm } from "./models/CategoriesVm";

type LaTexKbStoreProps = {
    latexKbService: LaTexKbService;
}

export class LaTexKbStore {

    latexKbService: LaTexKbService;
    categoriesState: DataState<CategoriesVm>;
    mf: MathfieldElement | null = null;
    rxSelectedCategory: CategoryVm | null = null;


    constructor(props: LaTexKbStoreProps) {
        this.latexKbService = props.latexKbService;
        this.categoriesState = DataState.init<CategoriesVm>();
        makeAutoObservable(this, {
            categoriesState: observable,
            rxSelectedCategory: observable,
        });
    }

    loadCategories = async () => {
        try {
            const res = (await this.latexKbService.getCategories()).getOrError();
            runInAction(() => {
                const categoriesVm = CategoriesVm.fromCategoriesRes(res);
                this.rxSelectedCategory = categoriesVm.items[0];
                this.categoriesState = DataState.data(categoriesVm);
            });
        }
        catch (error) {
            const appError = AppError.fromAny(error);
            runInAction(() => {
                this.categoriesState = DataState.error(appError);
            });
        }
    }

    get hasMf() {
        return this.mf !== null;
    }

    get selectedCategory(): CategoryVm {
        return this.rxSelectedCategory!;
    }

    get categories(): CategoryVm[] {
        return this.categoriesState.data!.items;
    }

    isCategorySelected(category: CategoryVm): boolean {
        return this.rxSelectedCategory?.id === category.id;
    }


    onSelectCategory(category: CategoryVm) {
        runInAction(() => {
            this.rxSelectedCategory = category;
        });
    }


    onMfReady(mf: MathfieldElement) {
        runInAction(() => {
            this.mf = mf;
        });
        mf.mathVirtualKeyboardPolicy = "manual";
        mf.placeholder = "\\text{Enter a formula}";
        mf.focus();
    }

    onKeyPress(item: KbKeyVm): void {
        this.mf?.insert(item.base.latex, {
            focus: true,
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

    clear() {
        this.execKeyboardAction("deleteAll");
    }

    execKeyboardAction(selector: Selector) {
        if (!this.mf) return;
        this.mf.executeCommand(selector);
        this.mf.focus();
    }

}