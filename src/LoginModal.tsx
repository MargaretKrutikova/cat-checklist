import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Users } from "./data";

type Props = {
  open: boolean;
  onLogin: (userName: string) => void;
  onClose: () => void;
};

const LoginModal: React.FC<Props> = props => {
  const [userName, setUserName] = React.useState("");

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Who is going to take care of the cat?
        </DialogContentText>
        <FormControl style={{ width: "100%", marginBottom: 30 }}>
          <InputLabel htmlFor="username">User</InputLabel>
          <Select
            value={userName}
            onChange={e => setUserName(e.target.value as string)}
            inputProps={{
              id: "username"
            }}
          >
            {Users.map(user => (
              <MenuItem value={user.userName}>{user.displayName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onLogin(userName)}
          disabled={!userName}
          color="primary"
        >
          Login
        </Button>
        <Button onClick={props.onClose} color="primary">
          Skip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
