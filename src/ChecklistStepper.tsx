import * as React from "react";

import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";

import eachDay from "date-fns/each_day";
import { START_DATE, END_DATE } from "./data";
import { toDateFormat } from "./utils";
import { Checklist } from "./Checklist";

const dates = eachDay(START_DATE, END_DATE);

export const ChecklistStepper: React.FC<{}> = () => {
  // TODO: should be current date as init value
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = dates.length;
  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const currentDate = dates[activeStep];
  return (
    <>
      <div>
        <Typography variant="h4" component="div">
          {toDateFormat(currentDate)}
        </Typography>
        <>
          <Checklist dueDate={toDateFormat(currentDate)} />
        </>
      </div>

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </>
  );
};
