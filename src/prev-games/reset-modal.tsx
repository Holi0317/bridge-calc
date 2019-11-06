import { useEffect } from "react";
import { closeGameModalAction } from "./actions/game-modal";
import { useAction } from "../hooks/use-action";

/**
 * Reset dialog when this component mounts
 */
export function ResetModal() {
  const closeModal = useAction(closeGameModalAction);
  useEffect(() => {
    closeModal();
  });

  return null;
}
