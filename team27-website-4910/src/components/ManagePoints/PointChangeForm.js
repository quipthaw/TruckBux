import { 
  Button, 
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  TextField, 
  Stack,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';

export const PointChangeForm = (props) => {
  const [ reason, setReason ] = useState('Put your reason for point change here.');
  const [ pointChange, setPointChange ] = useState(0);
  
  const [ isRecurringPlan, setIsRecurringPlan ] = useState(false);
  
  const recurringOptions = ['Weekly', 'Monthly', 'Yearly'];
  const [ recurringPeriod, setRecurringPeriod ] = useState(recurringOptions[1]);

  const handlePointChange = (e) => {
    setPointChange(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleRecurring = (e) => {
    setIsRecurringPlan(e.target.checked);

  };

  const handleSubmit = () => {
    console.log(pointChange);
    console.log(reason);
    console.log(isRecurringPlan);
    console.log(recurringPeriod);
  };

  const PlanCheckBox = () => {
    return (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={isRecurringPlan} onChange={handleRecurring}/>} 
          label="Reccuring Plan" 
        />
      </FormGroup>
    );
  };

  const RecurringInfo = (props) => {
    const { recurringPeriod, setRecurringPeriod } = props;

    const getOptions = () => {
      const options = recurringOptions.map((recOption) => {
        return (
          <MenuItem key={recOption} value={recOption}>{recOption}</MenuItem>
        )
      })

      return options;
    };

    const handleSelection = (e) => {
      setRecurringPeriod(e.target.value)
    }

    return (
      <TextField
        disabled={!isRecurringPlan}
        select
        id="recurringSelection"
        label="Recurring Period"
        value={recurringPeriod}
        onChange={handleSelection}
        sx={{ width: '10%' }}
      >
        {getOptions()}
      </TextField>
    )
  };

  return (
    <Stack direction="row" spacing={2}>
        <TextField
          id="points"
          label="Points"
          type="number"
          value={pointChange}
          onChange={handlePointChange}
          sx={{ width: '10%' }}
        />
        <TextField
          id="reason"
          label="Reason"
          type="text"
          value={reason}
          onChange={handleReasonChange}
          sx={{ width: '50%' }}
        />
        <PlanCheckBox/>
        <RecurringInfo 
          recurringPeriod={recurringPeriod}
          setRecurringPeriod={setRecurringPeriod}
        />
        <Button 
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: '10%' }}
        >
          Confirm
        </Button>
    </Stack>
  );
};