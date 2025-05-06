import { logger } from "~/core/utils/logger";
import { LatexKb } from "~/ui/components/LaTexKb/LaTexKb";

export default function KeyboardRoute() {
  return (
    <div className="mx-auto w-[567px] shadow-lg rounded-lg bg-white">
        <LatexKb onDone={(expr) => {
            logger.debug("Done", expr);
        }}/>
    </div>
  );
}