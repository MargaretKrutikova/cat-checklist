import * as React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useMutation } from "react-apollo-hooks";
import {
  SetCheckedMutation,
  ChecklistItem as ChecklistItemType,
  ChecklistByDateQuery
} from "./graphql";
import { toDateTimeFormat } from "./utils";
import { useUserData } from "./UserContext";
import isAfter from "date-fns/is_after";

type Props = ChecklistItemType & {
  name: string;
  dueDate: string;
};

export const ChecklistItem: React.FC<Props> = props => {
  const { userName, onUnautorizedAccess } = useUserData();
  const [setChecked] = useMutation(SetCheckedMutation, {
    refetchQueries: [
      {
        query: ChecklistByDateQuery,
        variables: { dueDate: props.dueDate }
      }
    ]
  });

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userName) {
      onUnautorizedAccess();
    } else {
      setChecked({
        variables: {
          checked: e.target.checked,
          code: props.code,
          dueDate: props.dueDate,
          doneDate: toDateTimeFormat(new Date()),
          userName
        }
      });
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={handleChecked}
          color="primary"
          disabled={isAfter(new Date(props.dueDate), new Date())}
        />
      }
      label={props.name}
    />
  );
};
