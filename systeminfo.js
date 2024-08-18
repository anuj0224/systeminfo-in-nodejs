const { exec } = require('child_process');
const si = require('systeminformation');

// Function to get system performance and usage details
async function getSystemPerformance() {
    try {
        const cpu = await si.cpu();
        const memory = await si.mem();
        const disk = await si.diskLayout();
        const network = await si.networkInterfaces();
        return {
            cpu,
            memory,
            disk,
            network
        };
    } catch (error) {
        console.error('Error getting system performance data:', error);
    }
}

// Function to get network details using system command
async function getNetworkDetails() {
    return new Promise((resolve, reject) => {
        exec('ipconfig', (error, stdout, stderr) => {
            if (error) {
                reject('Error getting network details:', stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

// Function to get information about connected devices using system command
async function getConnectedDevices() {
    return new Promise((resolve, reject) => {
        exec('wmic path Win32_PnPEntity get Caption', (error, stdout, stderr) => {
            if (error) {
                reject('Error getting connected devices:', stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

// Main function to gather and print all details
async function gatherSystemInfo() {
    try {
        const performance = await getSystemPerformance();
        const networkDetails = await getNetworkDetails();
        const connectedDevices = await getConnectedDevices();

        console.log('System Performance and Usage:', performance);
        console.log('Network Details:', networkDetails);
        console.log('Connected Devices:', connectedDevices);
    } catch (error) {
        console.error('Error gathering system information:', error);
    }
}


gatherSystemInfo();
