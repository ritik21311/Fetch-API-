// Fetch and display the launches
async function latestLaunches() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launches/past');
        let launches = await response.json();

        // The sort function will sort the SpaceX launches.
        launches = launches.sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc)).slice(4, 20);

        // Clear previous data or clear duplicates data which will occur
        document.getElementById('latest-launch').innerHTML = '';

        // Loop will display each launches in past years.
        for (let launch of launches) {
            const rocketResponse = await fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`);
            const rocketData = await rocketResponse.json();

            const launchpadResponse = await fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`);
            const launchpadData = await launchpadResponse.json();

            // Create launch card
            const launchName = document.createElement('div');
            launchName.className = 'launch-Name';
            launchName.innerHTML = `
                <h2>${launch.name}</h2>
                <p><b>Date:</b> ${new Date(launch.date_utc).toISOString()}</p>
                <p><b>Rocket:</b> ${rocketData.name}</p>
                <p><b>Launchpad:</b> ${launchpadData.name}</p>
                <p><b>Success:</b> ${launch.success ? ' Success' : ' Failure'}</p>
            `;

            document.getElementById('latest-launch').appendChild(launchName);
        }
    } catch (error) {
        document.getElementById('latest-launch').innerHTML = "<p>Error loading launch data.</p>";
    }
}

// It will showcase all the past number of launches 
async function totalPastLaunches() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launches/past');
        const data = await response.json();

        document.getElementById('Past-launch').innerHTML = `
            <h2> Past launch by SpaceX</h2>
            <p><b>Total Past Launches:</b> ${data.length}</p>
        `;
    } catch (error) {
        document.getElementById('Past-launch').innerHTML = "<p>Error loading past launch count.</p>";
    }
}

// Fetch data on page load and refreshes every 30 seconds
window.onload = () => {
    latestLaunches();
    totalPastLaunches();
    setInterval(() => {
        latestLaunches();
        totalPastLaunches();
    }, 30000);

};


