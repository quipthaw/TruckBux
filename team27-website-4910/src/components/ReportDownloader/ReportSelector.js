import { Stack } from '@mui/system';
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, CircularProgress, Box, Typography } from '@mui/material';

export default function ReportSelector() {

    const availableReports = [
        {
            label: 'Top Products Purchased',
            reportName: 'top-products'
        },
        {
            label: 'Number of Sales by Sponsor',
            reportName: 'number-sales-sponsor'
        },
    ]
    const [reportType, setReportType] = React.useState('top-products');
    const [loading, setLoading] = React.useState(false);

    function binaryToArray(inputBinary) {
        var binary = window.atob(inputBinary);
        var length = binary.length;
        var bytes = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
            var ascii = binary.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    function saveByteArray(byteArray) {
        var blob = new Blob([byteArray], { type: "application/png" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${reportType}.png`;
        link.click();
    };

    async function getReport() {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/reports?report=${reportType}`);
        const result = await response.json();
        saveByteArray(binaryToArray(result.graph));
        setLoading(false);
    };

    return (
        loading ?
            <Box textAlign='center'>
                <Typography>Please wait while we get your report.</Typography>
                <CircularProgress />
            </Box>
            :
            <Stack flexDirection='Row' spacing={2} justifyContent='center'>
                <FormControl fullWidth>
                    <InputLabel id="report-select-label">Report Type</InputLabel>
                    <Select
                        labelId="report-select-label"
                        id="report-select"
                        value={reportType}
                        label="Report Type"
                        onChange={(e) => { setReportType(e.target.value) }}
                    >
                        {
                            availableReports.map((report) => {
                                return (
                                    <MenuItem value={report.reportName}>{report.label}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>{"Select a report to generate..."}</FormHelperText>
                </FormControl>
                <Button onClick={getReport}>Download Report</Button>
            </Stack>
    )
}

