import * as React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

type Props = {
  open: boolean
  onSave: (result: string) => void
}

const ResultDialog: React.FC<Props> = props => {
  const [result, setResult] = React.useState("")

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">How did it go?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This item requires its result to be registered, e.g. "ate the
          antibiotics", "didn't go to the toilet" etc.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="result"
          label="Result"
          value={result}
          onChange={e => setResult(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onSave(result)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ResultDialog
