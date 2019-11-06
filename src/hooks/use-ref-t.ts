import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

/**
 * Use i18next's TFunction wrapped insied of a ref
 */
export function useRefT(): React.MutableRefObject<TFunction> {
  const { t } = useTranslation();
  const ref = useRef<TFunction>(t);
  ref.current = t;
  return ref;
}
