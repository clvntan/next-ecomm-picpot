<script>
	// Importing functions from auth.js and alert.js
	import { logOut, logIn, getTokenFromLocalStorage } from '../utils/auth.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { uploadMedia } from '../utils/s3-uploader.js';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { postImageAlert, postImageFailedAlert } from '../utils/alert.js';

	// Function to create an Account
	function signUp() {
		// Display a post job login alert
		// postJobLogInAlert();
		// Redirect to the new user registration page
		goto('/signup');
	}

	let isScrolled = false;

	// Function to handle scroll event
	function handleScroll() {
		isScrolled = window.scrollY > 0;
	}

	// Attach scroll event listener when the component mounts
	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		// Remove event listener when the component is destroyed
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	async function uploadImage(evt) {
		const token = getTokenFromLocalStorage();
		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
		evt.preventDefault();

		const imageData = {
			title: evt.target['title'].value,
			price: parseInt(evt.target['price'].value),
			description: evt.target['description'].value,
			fileName: fileName,
			url: fileUrl
		};

		// Send a POST request to the backend to create a new image upload
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/image', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(imageData)
		});

		// Parse the response
		const res = await resp.json();

		let clicked = true;

		// Check the status of the response
		if (resp.status == 200) {
			goto(`/image/${res.id}`);
			clicked = false;
			postImageAlert();
		} else {
			formErrors = res.data;
			postImageFailedAlert();
			clicked = false; // Set clicked to false to stop the loading status
		}
	}
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div data-theme="dim">
	<!-- Container div with "display: contents" style -->
	<div style="display: contents">
		<!-- Navbar -->
		<div
			class="{isScrolled
				? 'bg-base-100'
				: 'bg-transparent'} fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
		>
			<div class="navbar bg-transparent text-neutral-content">
				<!-- Left section -->
				<div class="flex-1">
					<!-- Link to the home page -->
					<a href="/" class="btn btn-ghost normal-case text-xl h-20">
						<img src="/Picpot_logo_aurora.png" alt="Logo" class="logo-image w-auto h-16" />
					</a>
				</div>

				<!-- Right section -->
				<div class="flex-none">
					<!-- Cart -->
					<!-- <div class="dropdown dropdown-end mr-4">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                  <div class="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span class="badge badge-sm indicator-item">8</span>
                  </div>
                </div> -->
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                  <div class="card-body">
                    <span class="font-bold text-lg">8 Items</span>
                    <span class="text-info">Subtotal: $999</span>
                    <div class="card-actions">
                      <button class="btn btn-primary btn-block">View cart</button>
                    </div>
                  </div>
                </div>
            </div> -->
					<!-- Check if user is logged in -->
					{#if $logIn}
						<!-- If logged in, display button to upload image -->
						<!-- Open the modal using ID.showModal() method -->
						<button class="btn btn-ghost mr-4" onclick="my_modal_2.showModal()"
							><img src="/upload.svg" alt="Upload" class="w-6 h-6" />
							Upload Image</button
						>
						<div data-theme="light">
							<dialog id="my_modal_2" class="modal cursor-pointer">
								<div class="modal-box w-11/12 max-w-5xl">
									<form on:submit|preventDefault={uploadImage} class="w-full">
										<div class="flex flex-col lg:flex-row">
											<input
												type="file"
												name="file"
												class="file-input file-input-bordered w-full max-w-xs"
												accept="image/"
											/>
											<div class="w-full lg:w-1/2"></div>
										</div>
										<div class="form-control w-full">
											<label class="label" for="price">
												<span class="label-text">Price</span>
											</label>
											<input
												type="text"
												name="price"
												placeholder="100"
												class="input input-bordered w-full"
											/>
										</div>
										<div class="form-control w-full">
											<label class="label" for="title">
												<span class="label-text">Title</span>
											</label>
											<input
												type="text"
												name="title"
												placeholder="Sunset"
												class="input input-bordered w-full"
											/>
										</div>
										<div class="form-control w-full">
											<label class="label" for="description">
												<span class="label-text">Description</span>
											</label>
											<textarea
												name="description"
												class="textarea textarea-bordered"
												placeholder="Beautiful Sunset in San Marino"
											></textarea>
										</div>
										<div class="form-control w-full mt-4">
											<button
												class="btn bg-gradient-to-r from-green-400 to-cyan-400 text-slate-600"
												onclick="my_modal_2.close()">Upload</button
											>
										</div>
									</form>
								</div>
								<form method="dialog" class="modal-backdrop">
									<button>close</button>
								</form>
							</dialog>
						</div>
					{:else}
						<!-- If not logged in, display button to create account with login action -->
						<button class="btn btn-ghost mr-4" on:click={signUp}>Sign Up</button>
					{/if}

					<!-- Conditional rendering for login/logout buttons -->
					{#if $logIn}
						<!-- If logged in, display logout button -->
						<button class="btn btn-ghost mr-4" on:click={logOut}><a href="/">Log Out</a></button>
					{:else}
						<!-- If not logged in, display login button -->
						<button class="btn btn-ghost mr-4"><a href="/login">Log In</a></button>
						<!-- Set Login button leads to login page -->
					{/if}
				

					<!-- Theme toggle switch -->
					<!-- <label class="swap swap-rotate">
              <input type="checkbox" class="theme-controller" value="dim" />
                <svg class="swap-on fill-current w-6 h-6 mx-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                <svg class="swap-off fill-current w-6 h-6 mx-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label> -->
				</div>
			</div>
		</div>
	</div>
</div>
