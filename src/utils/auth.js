// Importing the PUBLIC_BACKEND_BASE_URL and writable store from Svelte
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

// Creating a writable store to manage the login status
export const logIn = writable(false); // Initially set to false indicating no login

// Object representing empty authentication data
const emptyAuth = {
	token: '',
	userId: ''
};

// Function to log out user
export function logOut() {
	// Clearing authentication data from localStorage and updating login status
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
	logIn.set(false);
	return true; // Indicating successful logout
}

// Function to get the user ID from localStorage
export function getUserId() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['userId']; // Parsing the stored data and returning the user ID
	}
	return null; // Returning null if no authentication data found
}

// Function to get the token from localStorage
export function getTokenFromLocalStorage() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token']; // Parsing the stored data and returning the token
	}
	return null; // Returning null if no authentication data found
}

// Function to check if the user is logged in
export async function isLoggedIn() {
	// Checking if there's a token in localStorage
	if (!getTokenFromLocalStorage()) {
		logIn.set(false);
	} else
		logIn.set(true); // Returning false if no token found
	}

// 	try {
// 		// Sending a request to refresh the authentication token
// 		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
// 			method: 'POST',
// 			mode: 'cors',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: getTokenFromLocalStorage()
// 			}
// 		});

// 		// Parsing the response
// 		const res = await resp.json();

// 		if (resp.status == 200) {
// 			// If the token refresh is successful, updating localStorage and login status
// 			localStorage.setItem(
// 				'auth',
// 				JSON.stringify({
// 					token: res.token,
// 					userId: res.record.id
// 				})
// 			);
// 			logIn.set(true); // Setting login status to true
// 			return true; // Indicating successful login
// 		}

// 		return false; // Returning false if token refresh fails
// 	} catch {
// 		return false; // Returning false if an error occurs
// 	}
// }

// Function to authenticate user with email and password
export async function authenticateUser(email, password) {
	// Sending a request to authenticate the user
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/auth', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	// Parsing the response
	const res = await resp.json();

	if (resp.status == 200) {
		// If authentication is successful, updating localStorage and login status
		localStorage.setItem(
			'auth',
			JSON.stringify({
				"token": res.accessToken,
				"userId": res.userId
			})
		);
		logIn.set(true); // Setting login status to true
		return {
			success: true,
			res: res
		}; // Returning success with response data
	}

	return {
		success: false,
		res: res
	}; // Returning failure with response data
}

