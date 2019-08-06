import * as React from "react";
import { useMutation } from "react-apollo-hooks";
import isAfter from "date-fns/is_after";
import format from "date-fns/format";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  SetCheckedMutation,
  ChecklistItem as ChecklistItemType,
  ChecklistByDateQuery
} from "./graphql";
import { toDateTimeFormat } from "./utils";
import { useUserData } from "./UserContext";
import { getDisplayUserName } from "./data";

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
          doneDate: format(new Date()),
          userName
        }
      });
    }
  };

  return (
    <FormControl required component="fieldset">
      <FormGroup>
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
        {props.checked && props.doneDate ? (
          <Typography>
            {toDateTimeFormat(new Date(props.doneDate))},{" "}
            {getDisplayUserName(props.userName || "")}
          </Typography>
        ) : null}
      </FormGroup>
    </FormControl>
  );
};
