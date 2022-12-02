import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Stack,
  MenuItem,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userName } from '../../recoil_atoms';

export const PointChangeForm = (props) => {
  const { selectedDrivers, drivers, user } = props;

  const [reason, setReason] = useState('');
  const [pointChange, setPointChange] = useState(0);
  const [usernameState, setUsernameState] = useRecoilState(userName);

  const [isRecurringPlan, setIsRecurringPlan] = useState(false);

  const recurringOptions = ['Weekly', 'Monthly', 'Yearly'];
  const [recurringPeriod, setRecurringPeriod] = useState('');
  const [recurringError, setRecurringError] = useState('');

  const { refresh, setRefresh } = props;

  const handlePointChange = (e) => {
    setPointChange(e.target.value);
  };

  //Filter Point Value so only integers are used
  const filterPeriodE = (e) => {
    if (e.key === 'e' || e.key === '.') {
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
    if (!isRecurringPlan) {
      setRecurringPeriod('');
    }
    else {
      setRecurringPeriod(recurringOptions[1]);
    }
  }, [isRecurringPlan]);

  const handleRecurringPlan = async () => {
    const targets = selectedDrivers.map((driver) => {
      return (
        driver.username
      );
    });

    const data = {
      user: user,
      targets: targets,
      points: pointChange,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('https://team27.cpsc4911.com/pointsrecurring', options);
    const result = await response.json();

    setRecurringError(result.Result);
  }

  const handleSubmit = async () => {
    if (Number(pointChange) !== 0 && selectedDrivers.length !== 0) {

      let receivers = selectedDrivers.map((driver) => {
        return (
          driver.username
        );
      });

      if (selectedDrivers.length === drivers.length) {
        receivers = ['all'];
      }

      if (isRecurringPlan) {
        handleRecurringPlan();
      }

      const data = {
        giver: user,
        receivers: receivers,
        points: pointChange,
        reason: reason,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };

      const response = await fetch('https://team27.cpsc4911.com/points', options);
      const result = await response.json();

      setRefresh(refresh ? false : true);
    }
  };

  const PlanCheckBox = () => {
    return (
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={isRecurringPlan} onChange={handleRecurring} />}
          label="Recurring Plan"
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
        disabled
        select
        id="recurringSelection"
        label="Recurring Period"
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
    <Stack direction="column" spacing={2}>
      {recurringError !== '' && <Alert severity="warning">{recurringError}</Alert>}
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
        <PlanCheckBox />
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
    </Stack>
  );
};