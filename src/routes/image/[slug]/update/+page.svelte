<script>
	// Import necessary functions and variables
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { getTokenFromLocalStorage } from '../../../../utils/auth.js';
	import { uploadMedia } from '../../../../utils/s3-uploader.js';
	import { updatedImageAlert, updateImageFailedAlert } from '../../../../utils/alert.js';

	// Define a variable to hold data and initialize 'clicked' variable to false
	export let data;
	let clicked = false; // set 'false' as a default status

	// Function to navigate to updated image page
	async function updatedImage() {
		goto(`/image/${data.image.id}`);
	}

	// Function to handle image update
	async function updateImage(evt) {
		// Get token from local storage
		const token = getTokenFromLocalStorage();
		// Upload media to S3 and get file name and URL
		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
		evt.preventDefault();

		// Create image data object with form values and uploaded file details
		const imageData = {
			title: evt.target['title'].value,
			price: parseInt(evt.target['price'].value),
			description: evt.target['description'].value,
			fileName: fileName,
			url: fileUrl
		};

		// Send PUT request to update image details
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/image/${data.image.id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(imageData)
		});

		// Parse response
		const res = await resp.json();

		// If update is successful, navigate to updated image page and show success alert
		if (resp.status == 200) {
			updatedImage();
			updatedImageAlert();
			clicked = true; // Set clicked to true after successful update
		} else {
			// If update fails, show error alert and handle form errors
			updateImageFailedAlert();
			formErrors = res.message; // Handle form errors appropriately
			clicked = false; // Set clicked to false to stop the loading status
		}
	}
</script>

<!-- Must have for Upload or Update image features -->
<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="hero min-h-screen bg-gradient-to-r from-cyan-50 to-blue-50 h-full py-64">
	<!-- Header -->
	<h1 class="absolute top-56 text-5xl font-thin text-center z-10">Update Image</h1>
	<!-- Form Container -->
	<div class="card lg:w-5/12 shadow-2xl bg-base-100">
		<div class="card-body">
			<!-- Image Update Form -->
			<form on:submit|preventDefault={updateImage} class="w-full">
				<div class="form-control">
					<!-- File Input for Image -->
					<div class="flex flex-col lg:flex-row">
						<input
							value={data.image.url}
							type="file"
							name="file"
							class="file-input file-input-bordered w-full max-w-xs"
							accept="image/"
						/>
						<div class="w-full lg:w-1/2"></div>
					</div>
					<!-- Price Input -->
					<div class="form-control w-full">
						<label class="label" for="price">
							<span class="label-text">Price</span>
						</label>
						<input
							value={data.image.price}
							type="text"
							name="price"
							class="input input-bordered w-full"
						/>
					</div>
					<!-- Title Input -->
					<div class="form-control w-full">
						<label class="label" for="title">
							<span class="label-text">Title</span>
						</label>
						<input
							value={data.image.title}
							type="text"
							name="title"
							placeholder="Enter Title"
							class="input input-bordered w-full"
						/>
					</div>
					<!-- Description Input -->
					<div class="form-control w-full">
						<label class="label" for="description">
							<span class="label-text">Description</span>
						</label>
						<textarea
							value={data.image.description}
							name="description"
							class="textarea textarea-bordered"
							placeholder="Enter Description"
						></textarea>
					</div>
					<!-- Update Button -->
					<div class="form-control w-full mt-4">
						<!-- Conditional Rendering based on clicked status -->
						{#if clicked}
							<button class="btn btn-md" type="submit">
								<span class="loading loading-spinner hover:btn-accent"></span>
								Update
							</button>
						{:else}
							<button
								class="btn bg-gradient-to-r from-green-400 to-cyan-400 text-slate-600"
								type="submit">Update</button
							>
						{/if}
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
