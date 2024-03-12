// Importing the PUBLIC_BACKEND_BASE_URL constant from the environment configuration file
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

// Defining an asynchronous function named load, which is responsible for loading data before rendering the page
export async function load({ fetch }) {
    // Sending a GET request to fetch job records from the backend API
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/image');

    // Parsing the response body as JSON
    const res = await resp.json();

    // Checking the status code of the response
    if (resp.status == 200) { // If the request is successful (status code 200)
        // Returning an object with jobs data extracted from the response
        return {
            image: res
        };
    } else { // If the request fails
        // Returning an empty array as there are no jobs to display
        return {
            image: []
        };
    }
}
