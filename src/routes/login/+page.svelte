<script>
	// Importing necessary modules and functions
	import { authenticateUser } from '../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { logInErrorAlert, logInSucAlert } from '../../utils/alert.js';

<<<<<<< HEAD
	 // Declaring variables to manage form state
=======
	// Declaring variables to manage form state
>>>>>>> 510c428 (Revised form errors)
	let formErrors = {}; // Stores form validation errors
	let clicked = false; // Indicates if the login button is clicked (for loading status)

	// Function to navigate to the home page after successful login
	function postLogin() {
		goto('/');
	}

	// Function to handle user login form submission
	async function userLogin(evt) {
		evt.preventDefault(); // Prevents default form submission behavior
		clicked = true; // Sets clicked to true, triggering loading status

		// Extracting email and password from the form
		const userData = {
			email: evt.target['email'].value,
			password: evt.target['password'].value
		};

		// Calling the authenticateUser function to authenticate the user
<<<<<<< HEAD
        // console.log(userData)
=======
		// console.log(userData)
>>>>>>> 510c428 (Revised form errors)
		const res = await authenticateUser(userData.email, userData.password);

		// Handling the authentication response
		if (res.success) {
			logInSucAlert(); // Display success alert
			postLogin(); // Redirect to home page
		} else {
			logInErrorAlert(); // Display error alert
			formErrors = res.res.error; // Uncomment to show specific error messages
			clicked = false; // Resets clicked to false to hide loading status
		}
	}
</script>

<div class="hero min-h-screen bg-gradient-to-r from-cyan-50 to-blue-50 h-full py-64">
	<div class="hero-content flex-col lg:flex-row-reverse">
<<<<<<< HEAD
	  <div class="mx-16 text-center lg:text-left w-96">
		<h1 class="text-5xl font-bold">Login now!</h1>
		<p class="py-6">Welcome back! We're glad to see you again. To access your account, please enter your credentials below and hit the login button.</p>
	  </div>
	  <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
		<form class="card-body">
		  <div class="form-control">
			<!-- Login form -->
	<form on:submit={userLogin}>
		<!-- Email input -->
		<div class="form-control">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input type="text" name="email" placeholder="email" class="input input-bordered"/>

			 <!-- Display username validation error if present -->
			{#if 'email' in formErrors}
				<div class="text-red-500 text-center mt-2">{formErrors['email']}</div>
			{/if}
=======
		<div class="mx-16 text-center lg:text-left w-96">
			<h1 class="text-5xl font-bold">Login now!</h1>
			<p class="py-6">
				Welcome back! We're glad to see you again. To access your account, please enter your
				credentials below and hit the login button.
			</p>
>>>>>>> 510c428 (Revised form errors)
		</div>
		<div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body">
				<div class="form-control">
					<!-- Login form -->
					<form on:submit={userLogin}>
						<!-- Email input -->
						<div class="form-control">
							<label class="label" for="email">
								<span class="label-text">Email</span>
							</label>
							<input type="text" name="email" placeholder="email" class="input input-bordered" />

<<<<<<< HEAD
		<!-- Password input -->
		<div class="form-control">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" placeholder="password" class="input input-bordered mb-4" />

			<!-- Display password validation error if present -->
			{#if 'password' in formErrors}
				<div class="text-red-500 text-center mt-2">{formErrors['password']}</div>
			{/if}
=======
							<!-- Display username validation error if present -->
							{#if 'email' in formErrors}
								<div class="text-red-500 text-center mt-2">{formErrors['email']}</div>
							{/if}
						</div>

						<!-- Password input -->
						<div class="form-control">
							<label class="label" for="password">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="password"
								class="input input-bordered mb-4"
							/>

							<!-- Display password validation error if present -->
							{#if 'password' in formErrors}
								<div class="text-red-500 text-center mt-2">{formErrors['password']}</div>
							{/if}
						</div>

						<!-- Login button -->
						{#if clicked}
							<button
								type="button"
								class="btn bg-gradient-to-r from-green-400 to-cyan-400 text-slate-600 w-full mt-4"
							>
								<span class="loading loading-spinner"></span>
								loading...
							</button>
						{:else}
							<button
								type="submit"
								class="btn bg-gradient-to-r from-green-400 to-cyan-400 text-slate-600 w-full mt-4"
								>Log In</button
							>
						{/if}

						<!-- Link to sign up page -->
						<div class="text-center mt-5">
							<a class="link-hover italic text-xs" href="/signup"
								>Don't have an account? Click here.</a
							>
						</div>
					</form>
				</div>
			</form>
>>>>>>> 510c428 (Revised form errors)
		</div>
	</div>
</div>
