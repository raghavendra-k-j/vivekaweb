import type { AbsUser } from "./AbsUser";
import type { GuestBase } from "./GuestBase";
import { AppUserType } from "./AppUserType";

export class GuestUser implements AbsUser {
    base: GuestBase;

    constructor(base: GuestBase) {
        this.base = base;
    }

    getAppUserType(): AppUserType {
        return AppUserType.GUEST;
    }

    getId(): number {
        return this.base.getId();
    }

    getName(): string {
        return this.base.getName();
    }

    getEmail(): string {
        return this.base.getEmail();
    }

    getMobile(): string | undefined {
        return this.base.getMobile();
    }
}