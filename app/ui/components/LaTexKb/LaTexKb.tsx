import { useLaTexKbStore } from "./LaTexKbContext";
import type { LaTexExpr } from "~/domain/latexkb/models/LaTexExpr";
import { LaTexKbProvider } from "./LaTexKbProvider";
import { InputView } from "./comp/InputView";
import type { MathfieldElement } from "mathlive";
import { useCallback } from "react";
import { KeyboardContainer } from "./comp/KeyboardConatinerView";

type LaTexKbProps = {
  expr?: LaTexExpr;
  onDone: (expr: LaTexExpr) => void;
};

export const LatexKb = (props: LaTexKbProps) => {
  return (
    <LaTexKbProvider>
      <Body />
    </LaTexKbProvider>
  );
}

function Body() {
  const store = useLaTexKbStore();

  const handleReady = useCallback((mf: MathfieldElement) => {
    store.onMfReady(mf);
  }, [store]);


  return (<div>
    <InputView onReady={handleReady} />
    <KeyboardContainer />
  </div>);
}