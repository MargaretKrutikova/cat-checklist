import { gql } from "apollo-boost";

export const ChecklistByDateQuery = gql`
  query($dueDate: String!) {
    checklist(where: { dueDate: { _eq: $dueDate } }) {
      checked
      code
      doneDate
      userName
    }
  }
`;

export type ChecklistItem = {
  code: string;
  checked?: boolean;
  doneDate?: string | null;
  userName?: string | null;
};

export type ChecklistByDateResponse = {
  checklist: ChecklistItem[];
};

export const SetCheckedMutation = gql`
  mutation setChecked(
    $checked: Boolean!
    $code: String!
    $dueDate: String!
    $doneDate: String!
    $userName: String!
  ) {
    insert_checklist(
      objects: {
        checked: $checked
        code: $code
        doneDate: $doneDate
        dueDate: $dueDate
        userName: $userName
      }
      on_conflict: {
        constraint: checklist_pkey
        update_columns: [checked, doneDate, userName]
      }
    ) {
      returning {
        checked
        code
        doneDate
        dueDate
        userName
      }
    }
  }
`;
