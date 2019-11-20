import React from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { NameListEntry } from "./name-list-entry";
import { EmptyNamesPlaceholder } from "./empty-names-placeholder";
import { prevNamesSelector } from "../../prev-games/selectors/prev-names";

export function ImportNamesContent() {
  const names = useSelector(prevNamesSelector);

  if (names.length === 0) {
    return <EmptyNamesPlaceholder />;
  }
  return (
    <List>
      {names.map((name, i) => (
        <NameListEntry key={`name-list-${i}`} name={name} />
      ))}
    </List>
  );
}
