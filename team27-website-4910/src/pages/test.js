import React, { useEffect } from 'react'

export default function Test() {

    function base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    function saveByteArray(reportName, byte) {
        var blob = new Blob([byte], { type: "application/png" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    };

    async function getReport() {
        const response = await fetch('http://127.0.0.1:5000/reports?report=top-products');
        const result = await response.json();
        saveByteArray("report.png", base64ToArrayBuffer(result.graph));
    };

    useEffect(() => {
        getReport();
    }, []);

    return (
        <div>test</div>
    )
}
