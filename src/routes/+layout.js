// Setting server-side rendering (SSR) to false, indicating that this page does not support server-side rendering
export const ssr = false;

// Importing the isLoggedIn function from the utils/auth.js module
import { isLoggedIn } from "../utils/auth.js";

// Defining an asynchronous function named load, which is responsible for loading data before rendering the page
export async function load() {
    // Await the isLoggedIn function, which checks if the user is logged in
    await isLoggedIn();
}
