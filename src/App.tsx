import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./App.css";
import { ChecklistStepper } from "./ChecklistStepper";
import { userExists } from "./data";
import LoginModal from "./LoginModal";
import { UserContextProvider } from "./UserContext";
import { getDisplayUserName } from "./data";

const localStorageUsernameKey = "LOGGED_IN_USER";
const getCurrentUser = () => localStorage.getItem(localStorageUsernameKey);
const setCurrentUser = (userName: string) =>
  localStorage.setItem(localStorageUsernameKey, userName);
const removeCurrentUser = () =>
  localStorage.removeItem(localStorageUsernameKey);

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const storedUsername = getCurrentUser();
    if (storedUsername && userExists(storedUsername)) {
      setUserName(storedUsername);
    } else {
      setOpen(true);
    }
  }, []);

  const handleLogin = (name: string) => {
    setUserName(name);
    setCurrentUser(name);
    setOpen(false);
  };

  const handleLogout = () => {
    removeCurrentUser();
    setUserName("");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Checklist
          </Typography>
          {userName ? (
            <>
              <div style={{ flexGrow: 1 }}>
                Logged in as {getDisplayUserName(userName)}
              </div>
              <Button color="inherit" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => setOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className="App" style={{ paddingTop: 30 }}>
        <CssBaseline />
        <LoginModal
          open={open}
          onLogin={handleLogin}
          onClose={() => setOpen(false)}
        />
        <Container maxWidth="sm">
          <UserContextProvider value={{ userName }}>
            <ChecklistStepper />
          </UserContextProvider>
        </Container>
      </div>
    </>
  );
};

export default App;
