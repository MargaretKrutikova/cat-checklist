import * as React from "react"
import { useMutation } from "react-apollo-hooks"
import isAfter from "date-fns/is_after"
import format from "date-fns/format"
import differenceInMinutes from "date-fns/difference_in_minutes"

import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { makeStyles } from "@material-ui/core/styles"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"

import {
  SetCheckedMutation,
  ChecklistItem as ChecklistItemType,
  ChecklistByDateQuery
} from "./graphql"
import { toTimeFormat } from "./utils"
import { useUserData } from "./UserContext"
import { getDisplayUserName } from "./data"
import ResultDialog from "./ResultDialog"
import { AlertDialog } from "./Alert"

type Props = ChecklistItemType & {
  name: string
  requireEnterResult: boolean
  dueDate: string
  details?: string
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  label: {
    textAlign: "left"
  }
}))

type OpenDialog =
  | "WRONG_OWNER_ERROR"
  | "TIME_EXPIRED_ERROR"
  | "RESULT_REQUIRED"
  | null

export const ChecklistItem: React.FC<Props> = props => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = React.useState<OpenDialog>(null)

  const { userName, onUnautorizedAccess } = useUserData()

  const [setChecked] = useMutation(SetCheckedMutation, {
    refetchQueries: [
      {
        query: ChecklistByDateQuery,
        variables: { dueDate: props.dueDate }
      }
    ]
  })

  const handleChecked = (checked: boolean, enteredResult: string | null) => {
    if (!userName) {
      onUnautorizedAccess()
      return
    }
    if (checked && props.requireEnterResult && enteredResult === null) {
      setDialogOpen("RESULT_REQUIRED")
      return
    }

    if (!checked && props.userName && props.userName !== userName) {
      setDialogOpen("WRONG_OWNER_ERROR")
      return
    }

    if (
      props.doneDate &&
      props.checked &&
      differenceInMinutes(new Date(), props.doneDate) > 60
    ) {
      setDialogOpen("TIME_EXPIRED_ERROR")
      return
    }

    setChecked({
      variables: {
        checked,
        code: props.code,
        dueDate: props.dueDate,
        doneDate: format(new Date()),
        note: enteredResult,
        userName: !checked ? null : userName
      }
    })
  }

  return (
    <>
      <ResultDialog
        open={dialogOpen === "RESULT_REQUIRED"}
        onClose={() => setDialogOpen(null)}
        onSave={result => {
          setDialogOpen(null)
          handleChecked(true, result)
        }}
      />
      <AlertDialog
        open={dialogOpen === "WRONG_OWNER_ERROR"}
        title="Not allowed to edit"
        message="You can only edit items you have checked, this item belongs to a different user"
        onClose={() => setDialogOpen(null)}
      />
      <AlertDialog
        open={dialogOpen === "TIME_EXPIRED_ERROR"}
        title="Not allowed to edit"
        message="You can't uncheck an item one hour after it was checked"
        onClose={() => setDialogOpen(null)}
      />
      <FormControl required component="fieldset">
        <FormGroup>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={props.checked}
                onChange={e => handleChecked(e.target.checked, null)}
                color="primary"
                disabled={isAfter(new Date(props.dueDate), new Date())}
                icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                checkedIcon={<CheckBoxIcon fontSize="large" />}
              />
            }
            label={props.name}
          />
        </FormGroup>
        {!!props.details && (
          <Typography
            style={{ textAlign: "left", marginBottom: 10 }}
            variant="body2"
          >
            {props.details}
          </Typography>
        )}
        {props.checked && props.doneDate ? (
          <Typography
            variant="h6"
            style={{ marginBottom: 5, textAlign: "left" }}
          >
            {toTimeFormat(new Date(props.doneDate))}
            {" - "}
            {getDisplayUserName(props.userName || "")}
          </Typography>
        ) : null}
        {props.note ? (
          <Typography
            variant="h6"
            style={{ marginBottom: 5, textAlign: "left" }}
          >
            {props.note}
          </Typography>
        ) : null}
      </FormControl>
    </>
  )
}
