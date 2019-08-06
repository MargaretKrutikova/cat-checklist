import * as React from "react";

import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import eachDay from "date-fns/each_day";
import isSameDay from "date-fns/is_same_day";

import { START_DATE, END_DATE } from "./data";
import { toDateFormat, getDayOfweek } from "./utils";
import { Checklist } from "./Checklist";

const dates = eachDay(START_DATE, END_DATE);
const getIndexOfDate = (date: Date) => dates.findIndex(d => isSameDay(d, date));

export const ChecklistStepper: React.FC<{}> = () => {
  const [activeStep, setActiveStep] = React.useState(() => {
    const index = getIndexOfDate(new Date());
    return index === -1 ? 0 : index;
  });
  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const maxSteps = dates.length;
  const currentDate = dates[activeStep];

  return (
    <>
      <div>
        <Typography variant="h4" component="div" style={{ marginBottom: 10 }}>
          {getDayOfweek(currentDate)}, {toDateFormat(currentDate)}
        </Typography>
        {!isSameDay(currentDate, new Date()) ? (
          <Link
            component="button"
            variant="body2"
            onClick={() => setActiveStep(getIndexOfDate(new Date()))}
          >
            Jump to today
          </Link>
        ) : null}
        <Checklist dueDate={toDateFormat(currentDate)} />
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
