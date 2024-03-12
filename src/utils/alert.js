// Importing the `writable` store from Svelte
import { writable } from 'svelte/store';

// Creating writable stores for alert message, warning status, and success status
export const alertMsg = writable('');
export const warningAlert = writable(false);
export const successAlert = writable(false);

// Timeout function to hide alerts after a certain period
let timeoutId;
function resetTimeout() {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		// Setting warningAlert and successAlert to false after timeout
		const variable = [warningAlert, successAlert];
		variable.forEach((index) => index.set(false));
	}, 2500); // Timeout duration: 2500 milliseconds (2.5 seconds)
}

// All alert functions go below

// Function to display a success alert for sign up
export function signUpAlert() {
	successAlert.set(true);
	alertMsg.set('Sign up successful!');
	resetTimeout();
}

// Function to display a failed alert for sign up
export function signUpFailAlert() {
	warningAlert.set(true);
	alertMsg.set('Sign up failed!');
	resetTimeout();
}

// Function to display a warning alert when attempting to post an image without logging in
export function postJobLogInAlert() {
	warningAlert.set(true);
	alertMsg.set('Please log in first!');
	resetTimeout();
}

// Function to display a warning alert for login error
export function logInErrorAlert() {
	warningAlert.set(true);
	alertMsg.set('Incorrect email or password.');
	resetTimeout();
}

// Function to display a success alert for successful login
export function logInSucAlert() {
	successAlert.set(true);
	alertMsg.set('Successfully logged in. Welcome back!');
	resetTimeout();
}

// Function to display a success alert for successfully uploading an image
export function postImageAlert() {
	successAlert.set(true);
	alertMsg.set('Successfully uploaded image!');
	resetTimeout();
}

// Function to display a warning alert for uploading an image
export function postImageFailedAlert() {
	warningAlert.set(true);
	alertMsg.set('Failed to upload image!');
	resetTimeout();
}

// Function to display a success alert for successfully updated an image post content
export function updatedImageAlert() {
	successAlert.set(true);
	alertMsg.set('Image was successfully updated!');
	resetTimeout();
}

// Function to display a warning alert for updating an image post content
export function updateImageFailedAlert() {
	warningAlert.set(true);
	alertMsg.set('Image was failed to update! Try again.');
	resetTimeout();
}

// Function to display a success alert for successfully deleted an image
export function deletedImageAlert() {
	successAlert.set(true);
	alertMsg.set('Image was successfully deleted!');
	resetTimeout();
}

// Function to display a warning alert for deleting an image
export function deleteImageFailedAlert() {
	warningAlert.set(true);
	alertMsg.set('Image was failed to delete! Try again.');
	resetTimeout();
}