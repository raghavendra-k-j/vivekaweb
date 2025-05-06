export class AuthToken {
    public readonly accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    static fromJson(json: any): AuthToken {
        return new AuthToken(json.accessToken);
    }
}
