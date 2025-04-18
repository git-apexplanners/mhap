module.exports = async function globalTeardown() {
    // Kill the server if it's running
    if (global.__SERVER__) {
        global.__SERVER__.kill('SIGINT');
    }
};
