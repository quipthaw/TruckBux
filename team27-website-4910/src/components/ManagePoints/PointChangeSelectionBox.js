import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export const PointChangeSelectionBox = (props) => {
    const { driver, selectedDrivers, setSelectedDrivers } = props;

    const handleSelection = (e) => {

        setSelectedDrivers((prevSelectedDrivers) => {
            const newSelectedDrivers = [...prevSelectedDrivers];
        
            if(e.target.checked) {
                const selectedDriver = {
                ...driver,
                'selected': e.target.checked,
                }

                newSelectedDrivers.push(selectedDriver);
            }
            else {
                const deleteIndex = newSelectedDrivers.findIndex((user) => {
                  return (
                    user.username === driver.username
                  );
                });
                if(deleteIndex > -1) {
                    newSelectedDrivers.splice(deleteIndex, 1);
                }
            }

            return newSelectedDrivers;
        });
    };

    const isSelected = () => {
      const selectionExists = selectedDrivers.some((selectedDriver) => {
        return selectedDriver.username === driver.username;
      });

      return selectionExists;
    };

    return (
        <FormGroup  sx={{ width: '5%'}}>
            <FormControlLabel
                control={<Checkbox checked={isSelected()} onChange={handleSelection}/>}
            />
        </FormGroup>
    );
};