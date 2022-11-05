import React from 'react';
import { PointChangeForm } from './PointChangeForm';

export const ManagePoints = (props) => {
  const { refresh, setRefresh, selectedDrivers, drivers, user } = props;

  return (
    <PointChangeForm user={user} drivers={drivers} selectedDrivers={selectedDrivers} refresh={refresh} setRefresh={setRefresh}/>
  );
};