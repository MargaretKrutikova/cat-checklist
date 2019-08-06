import * as React from "react"
import { useMutation } from "react-apollo-hooks"
import isAfter from "date-fns/is_after"
import format from "date-fns/format"

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

export const ChecklistItem: React.FC<Props> = props => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = React.useState(false)

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
      setDialogOpen(true)
      return
    }

    setChecked({
      variables: {
        checked,
        code: props.code,
        dueDate: props.dueDate,
        doneDate: format(new Date()),
        note: enteredResult,
        userName
      }
    })
  }

  return (
    <>
      <ResultDialog
        open={dialogOpen}
        onSave={result => {
          setDialogOpen(false)
          handleChecked(true, result)
        }}
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
