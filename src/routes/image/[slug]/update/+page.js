// Importing the PUBLIC_BACKEND_BASE_URL from environment variables
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

// Defining an asynchronous function named 'load' which accepts an object with 'fetch' and 'params' properties
export async function load({ fetch, params }) {
    // Sending a GET request to the backend API endpoint for fetching a job record
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/image/${params.slug}`);

    // Parsing the response body as JSON
    const res = await resp.json();

    // Checking if the response status is 200 (success)
    if (resp.status == 200) {
        // If successful, returning an object with a property named 'image' containing the fetched image record
        return {
            image: res
        };
    } else {
        // If not successful, returning an object with an empty array for 'image'
        return {
            image: []
        };
    }
}
