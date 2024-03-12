<script>
<<<<<<< HEAD
    // Importing necessary modules and functions
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser } from '../../utils/auth.js';
    import { signUpAlert, signUpFailAlert } from '../../utils/alert.js'
  
    // Declaring variables to manage form state
    let formErrors = {}; // Stores form validation errors
    let clicked = false; // Indicates if the create account button is clicked (for loading status)
  
    // Function to navigate to the new job creation page after successful account creation
    function postSignUp() {
        goto('/');
    }
  
    // Function to handle user account creation form submission
    async function createUser(evt) {
        evt.preventDefault(); // Prevents default form submission behavior
        clicked = true; // Sets clicked to true, triggering loading status
  
        // Checking if password and password confirmation match
        if (evt.target['password'].value != evt.target['password-confirmation'].value) {
            formErrors['password'] = { message: 'Password confirmation does not match' };
            return;
        }
  
        // Extracting user data from the form
        const userData = {
            name: evt.target['name'].value,
            email: evt.target['email'].value,
            password: evt.target['password'].value
        };
  
        // Sending user data to the backend for account creation
        const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
  
        // Handling the response from the backend
        if (resp.status == 200) {
            // Authenticating the user after successful account creation
            const res = await authenticateUser(userData.email, userData.password);
  
            // Redirecting to home page if authentication is successful
            if (res.success) {
                postSignUp();
                signUpAlert();
            } else {
                // Displaying an alert and throwing an error if authentication fails
                throw 'Sign up succeeded but authentication failed';
            }
        } else {
            // Handling form errors if account creation fails
            const res = await resp.json();
            formErrors = res.error;
            signUpFailAlert();
            clicked = false; // Resets clicked to false to hide loading status
        }
    }
=======
	// Importing necessary modules and functions
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser } from '../../utils/auth.js';
	import { signUpAlert, signUpFailAlert } from '../../utils/alert.js';

	// Declaring variables to manage form state
	let formErrors = {}; // Stores form validation errors
	let clicked = false; // Indicates if the create account button is clicked (for loading status)

	// Function to navigate to the new job creation page after successful account creation
	function postSignUp() {
		goto('/');
	}

	// Function to handle user account creation form submission
	async function createUser(evt) {
		evt.preventDefault(); // Prevents default form submission behavior
		clicked = true; // Sets clicked to true, triggering loading status

		// Checking if password and password confirmation match
		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = { message: 'Password confirmation does not match' };
			return;
		}

		// Extracting user data from the form
		const userData = {
			name: evt.target['name'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value
		};

		// Sending user data to the backend for account creation
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		// Handling the response from the backend
		if (resp.status == 200) {
			// Authenticating the user after successful account creation
			const res = await authenticateUser(userData.email, userData.password);

			// Redirecting to home page if authentication is successful
			if (res.success) {
				postSignUp();
				signUpAlert();
			} else {
				// Displaying an alert and throwing an error if authentication fails
				throw 'Sign up succeeded but authentication failed';
			}
		} else {
			// Handling form errors if account creation fails
			const res = await resp.json();
			formErrors = res.error;
			signUpFailAlert();
			clicked = false; // Resets clicked to false to hide loading status
		}
	}
>>>>>>> 510c428 (Revised form errors)
</script>

<div class="min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50 h-full py-48">
	<h1 class="text-5xl font-thin text-center">Sign Up</h1>

<<<<<<< HEAD
<div class="flex justify-center items-center mt-14">
    <!-- Account creation form -->
    <form on:submit={createUser} class="lg:w-1/3">
        <!-- Name input field -->
        <div class="form-control w-full">
            <label class="label" for="name">
                <span class="label-text">Name</span>
            </label>
            <input type="text" name="name" placeholder="johndoe" class="input input-bordered w-full" />
            <!-- Display error message if Name field has errors -->
            {#if 'name' in formErrors}
            <label class="label" for="name">
                <span class="label-text-alt text-red-500">{formErrors['name']}</span>
            </label>
            {/if}
        </div>

        <!-- Email input field -->
        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
            <!-- Display error message if email field has errors -->
            {#if 'email' in formErrors}
            <label class="label" for="email">
                <span class="label-text-alt text-red-500">{formErrors['email']}</span>
            </label>
            {/if}
        </div>
=======
	<div class="flex justify-center items-center mt-14">
		<!-- Account creation form -->
		<form on:submit={createUser} class="lg:w-1/3">
			<!-- Name input field -->
			<div class="form-control w-full">
				<label class="label" for="name">
					<span class="label-text">Name</span>
				</label>
				<input type="text" name="name" placeholder="johndoe" class="input input-bordered w-full" />
				<!-- Display error message if Name field has errors -->
				{#if 'name' in formErrors}
					<label class="label" for="name">
						<span class="label-text-alt text-red-500">{formErrors['name']}</span>
					</label>
				{/if}
			</div>

			<!-- Email input field -->
			<div class="form-control w-full">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>
				<input
					type="email"
					name="email"
					placeholder="john@example.com"
					class="input input-bordered w-full"
					required
				/>
				<!-- Display error message if email field has errors -->
				{#if 'email' in formErrors}
					<label class="label" for="email">
						<span class="label-text-alt text-red-500">{formErrors['email']}</span>
					</label>
				{/if}
			</div>
>>>>>>> 510c428 (Revised form errors)

			<!-- Password input field -->
			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					name="password"
					placeholder="A minimum of 8 characters, including both letters and numbers"
					class="input input-bordered w-full"
					required
				/>
				<!-- Display error message if password field has errors -->
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>

<<<<<<< HEAD
        <!-- Password confirmation input field -->
        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Confirm Password</span>
            </label>
            <input type="password" name="password-confirmation" placeholder="Repeat passwords" class="input input-bordered w-full" />
            <!-- Display error message if password confirmation field has errors -->
            {#if 'password' in formErrors}
            <label class="label" for="password">
                <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
            </label>
            {/if}
        </div>
=======
			<!-- Password confirmation input field -->
			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text">Confirm Password</span>
				</label>
				<input
					type="password"
					name="password-confirmation"
					placeholder="Repeat passwords"
					class="input input-bordered w-full"
				/>
				<!-- Display error message if password confirmation field has errors -->
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>
>>>>>>> 510c428 (Revised form errors)

			<!-- Create account button -->
			{#if clicked}
				<!-- Display loading spinner if clicked -->
				<button
					type="button"
					class="btn bg-gradient-to-r from-green-400 to-cyan-400 text-slate-600 w-full mt-4"
				>
					<span class="loading loading-spinner"></span>
					loading...
				</button>
			{:else}
				<!-- Display create account button if not clicked -->
				<button
					type="submit"
					class="btn bg-gradient-to-r from-green-400 to-cyan-400 text-slate-600 w-full mt-4"
					>Create an Account</button
				>
			{/if}

			<!-- Link to login page -->
			<div class="text-center mt-5">
				<a class="link-hover italic text-xs" href="/login"
					>Already have an account? Click here to login instead.</a
				>
			</div>
		</form>
	</div>
</div>
