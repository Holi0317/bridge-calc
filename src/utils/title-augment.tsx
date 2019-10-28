import * as React from "react";
import { useTranslation } from "react-i18next";

export function titleAugment(title: string): React.ComponentType<{}> {
  return () => {
    const { t } = useTranslation();
    return <span>{t(title)}</span>;
  };
}
