<script>
	// Import necessary functions and modules
	import { getUserId, getTokenFromLocalStorage } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { deletedImageAlert, deleteImageFailedAlert } from '../../../utils/alert.js';

	// Declare variables
	export let data; // Data passed to the component
	let clicked = false; // Flag to track button click status

	// Function to navigate to the image update page
	function editButton() {
		goto(`/image/${data.image.id}/update`);
	}

	// Function to navigate to homepage after deleting image
	function afterDeletedJob() {
		goto(`/#explore-container`);
	}

	// Function to delete image
	async function deleteJob() {
		const getToken = getTokenFromLocalStorage();
		clicked = true; // Set clicked to true to indicate button click

		// Send DELETE request to delete the image
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/image/${data.image.id}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken // Set authorization header with token
			}
		});

		// Handle response
		if (resp.status == 200) {
			afterDeletedJob(); // Navigate to homepage after successful deletion
			deletedImageAlert(); // Show success alert
		} else {
			const res = await resp.json();
			deleteImageFailedAlert(); // Show failure alert
			// formErrors = res.message; // Handle form errors if any
			clicked = false; // Set clicked to false to indicate failure
		}
	}

	// Function for payment gateway
	async function buyImg(id) {
		console.log(id);
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/payment', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id }) // Send ID of image to buy
		});
		const res = await resp.json();
		window.location = res; // Redirect to payment gateway
	}
</script>

<!-- HTML Markup -->
<div class="hero min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50">
	<div class="hero-content flex-col lg:flex-row my-20">
		<!-- Display image -->
		<img src={data.image.url} alt="title" class="lg:w-3/5 rounded-lg shadow-2xl" />

		<!-- Image details -->
		<div class="flex flex-col lg:w-2/5 mt-8 mx-10">
			<div class="max-w w-full">
				<!-- Display title -->
				<h1 class="text-3xl font-extrabold mb-10">{data.image.title}</h1>
				<!-- Display description using Svelte Markdown -->
				<h2 class="text-xl font-thin mb-5">Description</h2>
				<SvelteMarkdown source={data.image.description} />
				<!-- Display price -->
				<h2 class="text-xl font-thin mt-10 mb-5">Price</h2>
				<p class="badge badge-warning badge-lg text-neutral text-lg font-semibold">
					USD {humanize.formatNumber(data.image.price)}
				</p>

				<!-- Buttons for actions -->
				<div class="flex flex-col mt-10">
					<!-- Button to buy image -->
					<button class="btn btn-primary" on:click={buyImg(data.image.id)}>Buy Now</button>
					<!-- Button to edit image (if user is the creator) -->
					{#if data.image.userId == getUserId()}
						<button type="submit" on:click={editButton} class="btn btn-outline btn-accent my-4"
							>Edit</button
						>
					{/if}
					<!-- Button to delete image (if user is the creator) -->
					{#if data.image.userId == getUserId()}
						<button on:click={deleteJob} class="btn btn-outline btn-accent">Delete</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
