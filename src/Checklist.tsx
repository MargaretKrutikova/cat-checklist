import * as React from "react";
import { useQuery } from "react-apollo-hooks";

import { CircularProgress } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";

import { STANDARD_CHECKLIST_ITEMS } from "./data";
import { ChecklistItem } from "./ChecklistItem";
import {
  ChecklistByDateResponse,
  ChecklistByDateQuery,
  ChecklistItem as ChecklistItemType
} from "./graphql";

type Props = {
  dueDate: string;
};

export const Checklist: React.FC<Props> = props => {
  const checklistQuery = useQuery<ChecklistByDateResponse>(
    ChecklistByDateQuery,
    {
      variables: { dueDate: props.dueDate }
    }
  );

  if (checklistQuery.loading) return <CircularProgress />;

  const checklistData =
    checklistQuery.data && checklistQuery.data.checklist
      ? checklistQuery.data.checklist
      : [];

  return (
    <>
      <FormGroup row={false}>
        {STANDARD_CHECKLIST_ITEMS.morning.map(item => {
          const checklistItem: ChecklistItemType = checklistData.find(
            i => i.code === item.code
          ) || {
            checked: false,
            doneDate: null,
            code: item.code,
            userName: null
          };

          return (
            <ChecklistItem
              key={item.code}
              code={item.code}
              name={item.name}
              {...checklistItem}
              dueDate={props.dueDate}
            />
          );
        })}
      </FormGroup>
      {checklistQuery.error ? <p>Error fetching data!</p> : null}
    </>
  );
};
