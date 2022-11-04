import React from 'react';
import { PointChangeForm } from './PointChangeForm';

export const ManagePoints = (props) => {
  const { refresh, setRefresh } = props;

  return (
    <PointChangeForm refresh={refresh} setRefresh={setRefresh}/>
  );
};