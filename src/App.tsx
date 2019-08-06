import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import "./App.css";
import { ChecklistStepper } from "./ChecklistStepper";

const App: React.FC = () => {
  return (
    <div className="App" style={{ paddingTop: 30 }}>
      <CssBaseline />
      <Container maxWidth="sm">
        <ChecklistStepper />
      </Container>
    </div>
  );
};

export default App;
