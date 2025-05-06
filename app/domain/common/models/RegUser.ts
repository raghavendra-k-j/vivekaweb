import type { AbsUser } from "./AbsUser";
import type { AppUserType } from "./AppUserType";
import { UserBase } from "./UserBase";

export type RegUserProps = {
    base: UserBase;
}

export abstract class RegUser implements AbsUser {
    base: UserBase;

    constructor(props: RegUserProps) {
        this.base = props.base;
    }

    getId(): number {
        return this.base.id;
    }

    getEmail(): string {
        return this.base.email;
    }

    getName(): string {
        return this.base.name;
    }

    getMobile(): string | undefined {
        return this.base.mobile;
    }

    abstract getAppUserType(): AppUserType;

}
