/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const defaultContext = {
  activeStep: 0,
  setActiveStep: () => {},
};

export const StepperContext = createContext(defaultContext);

export default function StepperContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <StepperContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </StepperContext.Provider>
  );
}
