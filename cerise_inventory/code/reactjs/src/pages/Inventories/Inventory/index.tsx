import { Card } from '@mui/material';

import * as S from './styles';

import { useState } from 'react';

import { ResumeInventory } from '@/components/FormInventory/ResumeInventory';
import { Scope1 } from '@/components/FormInventory/Scope1';
import { Scope2 } from '@/components/FormInventory/Scope2';
import { Scope3 } from '@/components/FormInventory/Scope3';
import InventoriesStepper from '@/pages/Inventories/InventoriesStepper';

export function Inventory() {
  const steps = ['Escopo 1', 'Escopo 2', 'Escopo 3', 'Resumo'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function renderStepContent(step: number) {
    const steps: any = {
      0: <Scope1 handleNext={handleNext} />,
      1: <Scope2 handleNext={handleNext} handleBack={handleBack} />,
      2: <Scope3 handleNext={handleNext} handleBack={handleBack} />,
      3: <ResumeInventory handleBack={handleBack} />,
    };

    return steps[step];
  }

  return (
    <S.Container>
      <Card>
        <InventoriesStepper steps={steps} activeStep={activeStep} />
        <Card style={{ marginTop: '2rem' }}>
          {renderStepContent(activeStep)}
        </Card>
      </Card>
    </S.Container>
  );
}
