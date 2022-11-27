import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

export const PurchaseHistoryRow = (props) => {
  const { historyRow } = props;

  return (
    <Paper>
      <Grid container spacing={2} align="center">
        <Grid item xs={3}>
          <Typography>{historyRow.username}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>{historyRow.ID}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{historyRow.Item_ID}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>{historyRow.cost}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{historyRow.Date_Time}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}