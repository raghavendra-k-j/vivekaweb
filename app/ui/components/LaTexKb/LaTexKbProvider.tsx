import React, { useMemo } from "react";
import { LaTexKbStore } from "./LaTextKbStore";
import { LaTexKbService } from "~/domain/latexkb/services/LaTexKbService";
import { LaTexKbContext } from "./LaTexKbContext";

export function LaTexKbProvider({ children }: { children: React.ReactNode }) {
    const store = useMemo(() => {
        const latexService = new LaTexKbService();
        return new LaTexKbStore({ latexKbService: latexService });
    }, []);

    return (
        <LaTexKbContext.Provider value={store}>
            {children}
        </LaTexKbContext.Provider>
    );
}
