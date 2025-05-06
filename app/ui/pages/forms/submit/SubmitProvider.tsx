import { SubmitContext, useSubmitStore } from "./SubmitContext";
import { useMemo } from "react";
import { SubmitStore } from "./SubmitStore";
import type { FormDetail } from "~/domain/forms/models/FormDetail";
import { observer } from "mobx-react-lite";


type SubmitProviderProps = {
    children: React.ReactNode;
    formDetail: FormDetail;
}

export function SubmitProvider({ ...props }: SubmitProviderProps) {
    const submitStore = useMemo(() => {
        return new SubmitStore({ formDetail: props.formDetail });
    }, [props.formDetail]);

    return (
        <SubmitContext.Provider value={submitStore}>
            {props.children}
        </SubmitContext.Provider>
    );
}

