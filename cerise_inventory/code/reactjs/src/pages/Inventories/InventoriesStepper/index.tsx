import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface InventoriesStepperProps {
  activeStep: number;
  steps: string[];
}

export default function InventoriesStepper({
  activeStep,
  steps,
}: InventoriesStepperProps) {
  return (
    // TODO: melhorar isso aqui
    <Box sx={{ width: '100%', paddingTop: '4rem' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
