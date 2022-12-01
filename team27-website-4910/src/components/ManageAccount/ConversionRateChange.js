import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userName } from '../../recoil_atoms';
import { UserSelection } from '../Catalog/UserSelection';

export const ConversionRateChange = () => {
  const [usernameState, setUsernameState] = useRecoilState(userName);
  const [targetSponsor, setTargetSponsor] = useState('');
  const [conversionRate, setConversionRate] = useState(1.0);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const filterKeyDown = (e) => {
    if (e.key === 'e') {
      e.preventDefault();
    }
  }

  const handleRateChange = (e) => {
    setConversionRate(e.target.value);
  }

  const changeRateRequest = async () => {
    setProcessing(true);

    const url = 'https://team27.cpsc4911.com/conversionrate';
    const data = {
      'user': usernameState,
      'target': targetSponsor,
      'rate': conversionRate,
    };
    console.log(usernameState)
    console.log(targetSponsor)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (result.error) {
      setError(result.error);
    }
    else {
      setError(result.result);
    }

    setProcessing(false);
  };

  return (
    <Stack direction="column" spacing={2} sx={{ my: '1vh' }}>

      <Typography variant='h3' gutterBottom>Conversion Rate Change</Typography>
      <Typography gutterBottom>{error}</Typography>

      <Stack justifyContent="center" direction="row" spacing={2}>

        <UserSelection
          disabled={processing}
          user={usernameState}
          requestedType="S"
          selection={targetSponsor}
          setSelection={setTargetSponsor}
        />

        <TextField
          disabled={processing}
          id="rate"
          label="New Conversion Rate"
          InputLabelProps={{ shrink: true }}
          value={conversionRate}
          onKeyDown={filterKeyDown}
          onChange={handleRateChange}
        >

        </TextField>

      </Stack>

      <Button disabled={processing} onClick={changeRateRequest}>Confirm Rate</Button>

    </Stack>
  )

}