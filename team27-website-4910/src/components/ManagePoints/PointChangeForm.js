import { 
  Button, 
  Checkbox, 
  FormControlLabel, 
  FormGroup,
  TextField, 
  Stack,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

//This component is for setting point changes. This component will likely
//need to be passed Driver(s) to apply the point changes to. This component
//will also set if a point change is recurring.
export const PointChangeForm = (props) => {
  //We can import setPointChange from driver list
  //const { our props go here } = props;

  const [ reason, setReason ] = useState('');
  const [ pointChange, setPointChange ] = useState(0);
  
  const [ isRecurringPlan, setIsRecurringPlan ] = useState(false);
  
  const recurringOptions = ['Weekly', 'Monthly', 'Yearly'];
  const [ recurringPeriod, setRecurringPeriod ] = useState('');
  const [ recurringError, setRecurringError ] = useState('');

  const handlePointChange = (e) => {
    setPointChange(e.target.value);
  };

  //Filter Point Value so only integers are used
  const filterPeriodE = (e) => {
    if(e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  }

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleRecurring = (e) => {
    setIsRecurringPlan(e.target.checked);
  };

  useEffect(() => {
    if(!isRecurringPlan) {
      setRecurringPeriod('');
    }
    else {
      setRecurringPeriod(recurringOptions[1]);
    }
  }, [isRecurringPlan]);

  //For now this only spits out into console. Use props to set what is needed
  const handleSubmit = () => {
    console.log(pointChange);
    console.log(reason);
    console.log(isRecurringPlan);
    if(recurringPeriod === '') {
      setRecurringError('You must select a recurring period');
    }
    else {
      console.log(recurringPeriod);
      setRecurringError('');
    }
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
        error={(recurringPeriod === '' && isRecurringPlan)}
        disabled
        select
        id="recurringSelection"
        label="Recurring Period"
        helperText={recurringError}
        InputLabelProps={{ shrink: true }}
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
          onKeyDown={filterPeriodE}
          onChange={handlePointChange}
          sx={{ width: '10%' }}
        />
        <TextField
          id="reason"
          label="Reason for Point Change"
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