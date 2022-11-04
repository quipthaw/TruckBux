import React from 'react';
import { PointChangeForm } from './PointChangeForm';

export const ManagePoints = (props) => {
  const { refresh, setRefresh, selectedDrivers, drivers } = props;

  return (
    <PointChangeForm drivers={drivers} selectedDrivers={selectedDrivers} refresh={refresh} setRefresh={setRefresh}/>
  );
};