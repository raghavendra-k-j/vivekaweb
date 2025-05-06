import type { ResEither } from "~/core/utils/ResEither";
import type { FormDetail } from "../models/FormDetail";
import type { AppError } from "~/core/error/AppError";
import type { FormRepo } from "~/infra/repos/FormRepo";

export class FormService {

    private formRepo: FormRepo;

    constructor({ formRepo }: { formRepo: FormRepo }) {
        this.formRepo = formRepo;
    }

    async getFormDetail({ permalink }: { permalink: string }): Promise<ResEither<AppError, FormDetail>> {
        const res = await this.formRepo.getFormDetail({ permalink });
        return res;
    }
}

export let _formService: FormService | undefined = undefined;
export const createFormService = (formRepo: FormRepo) => {
    _formService = new FormService({ formRepo });
}
export const getFormService = (): FormService => {
    if (!_formService) {
        throw new Error("FormService not initialized. Call createFormService() first.");
    }
    return _formService;
};