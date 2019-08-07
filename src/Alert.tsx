import * as React from "react"

import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

type Props = {
  title: string
  message: string
  open: boolean
  onClose: () => void
}

export const AlertDialog: React.FunctionComponent<Props> = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
)
