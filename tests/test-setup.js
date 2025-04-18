const { spawn } = require('child_process');
const waitOn = require('wait-on');

module.exports = async function globalSetup() {
    let retries = 3;
    let server;

    // Kill any existing processes on port 3000
    try {
        await new Promise((resolve, reject) => {
            const kill = spawn('powershell.exe', ['-Command', 'Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force'], {
                stdio: 'inherit',
                shell: true
            });
            kill.on('close', resolve);
            kill.on('error', reject);
        });
    } catch (error) {
        console.log('No existing process on port 3000');
    }

    while (retries > 0) {
        try {
            // Start the Next.js development server
            server = spawn('npm', ['run', 'dev'], {
                stdio: 'inherit',
                shell: true,
                env: { ...process.env, PORT: '3000' }
            });

            // Wait for the server to be ready
            await waitOn({
                resources: ['http://localhost:3000'],
                timeout: 30000, // 30 seconds
                interval: 100,
                verbose: true,
            });

            // Store the server process in global so we can access it in teardown
            global.__SERVER__ = server;
            console.log('Server started successfully');
            return;
        } catch (error) {
            console.error(`Server failed to start (${retries} retries left):`, error);
            if (server) {
                server.kill('SIGINT');
            }
            retries--;

            if (retries === 0) {
                console.error('Failed to start server after multiple attempts');
                process.exit(1);
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};
