import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import WarningIcon from '@mui/icons-material/Warning';
const steps = ['File Selected', 'Uploading', 'succes'];

export default function CustomErrors() {
    const isStepFailed = (step) => {
        return step === 1;
    };

    return (
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={1}>
            {steps.map((label, index) => {
            const labelProps = {};
            if (isStepFailed(index)) {
                labelProps.optional = (
                <Typography variant="caption" color="error">
                    error, refersh the page.
                </Typography>
                );

                labelProps.error = true;
            }

            return (
                <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
        </Box>
    );
}
export function CustomError(){
    return(
        <Stepper>
            
        <Typography variant="caption" color="error">
            <p style={{position:"relative"}}>
            error, refersh the page.
            </p>
        </Typography>
        
        </Stepper>
    )

}