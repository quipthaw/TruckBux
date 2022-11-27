import { Grid, Box, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserSelection } from '../Catalog/UserSelection';
import { userName } from '../../recoil_atoms';
import { PurchaseHistoryRow } from './PurchaseHistoryRow';

export const PurchaseHistory = () => {
  const [ usernameState, setUsernameState ] = useRecoilState(userName);
  const [ driver, setDriver ] = useState('');
  //const [ sponsor, setSponsor ] = useState('');
  const [ purchaseHistory, setPurchaseHistory ] = useState([]);

  const getPurchaseHistory = async () => {
    const URL = `http://127.0.0.1:5000/purchase?user=${driver}`;
    
    const response = await fetch(URL);
    const result = await response.json();

    setPurchaseHistory(result);
  }

  useEffect(() => {
    if(driver !== '') {
      getPurchaseHistory()
    }
  }, [driver])

  const userSelectionRow = () => {
    return (
      <UserSelection user={usernameState} requestedType={'D'} selection={driver} setSelection={setDriver}/>
    )
  }

  const populateHistoryHeader = () => {
    return (
      <Paper>
        <Grid container spacing={2} align="center">
          <Grid item xs={3}>
            <Typography>Username</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>Purchase_ID</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Item_ID</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>Cost</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Date</Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  const populateHistory = () => {
    if(purchaseHistory) {
        const history = purchaseHistory.map((historyRow) => {
          return <PurchaseHistoryRow key={historyRow.ID} historyRow={historyRow}/>
        })

        return history;
    }
  }

  return (
      <Stack direction="column" spacing={2}>
        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Paper>{userSelectionRow()}</Paper>
          </Grid>
          <Grid item xs={12}>
            {populateHistoryHeader()}
          </Grid>
          <Grid item xs={12}>
            {populateHistory()}
          </Grid>
        </Grid>

      </Stack>
  )
}