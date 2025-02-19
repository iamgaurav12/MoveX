const autocannon = require("autocannon");

const urls = ["http://localhost:3000"];
const duration = 30; // in seconds

urls.forEach((url) => {
    const instance = autocannon(
        {
            url,
            duration,
        },
        (err, results) => {
            if (err) {
                console.error("Error:", err);
            } else {
                console.log(`URL: ${url}`);
                console.log("Number of Requests:", results.requests.total);
                console.log("Duration (seconds):", results.duration);
            }
        }
    );

    autocannon.track(instance, { renderProgressBar: false, renderResultsTable: false });
});