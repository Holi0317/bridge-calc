import { genRandomNames } from "../example-names";
import { setPlayerNamesAction } from "./actions/set-entry-props";
import { resetAction } from "./actions/reset";
import { cuid } from "../utils";
import { useEffect } from "react";
import { useAction } from "../hooks/use-action";

export function InitEntryState() {
  const reset = useAction(resetAction);
  const setPlayerNames = useAction(setPlayerNamesAction);

  useEffect(() => {
    reset();

    const names = genRandomNames();
    setPlayerNames(names.map(name => ({ value: name, id: cuid() })));
  }, [reset, setPlayerNames]);

  return null;
}
