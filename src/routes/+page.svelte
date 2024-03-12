<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import humanize from 'humanize-plus';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { getUserId } from '../utils/auth.js';

	export let data;

	// Array of image URLs
	const imageUrls = [
		'https://images.pexels.com/photos/2387634/pexels-photo-2387634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		'https://images.pexels.com/photos/427676/pexels-photo-427676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		'https://images.pexels.com/photos/10660420/pexels-photo-10660420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		'https://images.pexels.com/photos/163802/venice-cruise-mediterranean-architecture-163802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		'https://images.pexels.com/photos/1835712/pexels-photo-1835712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		'https://images.pexels.com/photos/929032/pexels-photo-929032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	];

	// Create a writable store to hold the current image index
	const currentImageIndex = writable(0);

	// Function to handle image rotation
	function rotateImages() {
		const interval = setInterval(() => {
			$currentImageIndex = ($currentImageIndex + 1) % imageUrls.length;
		}, 5000); // Change image every 5 seconds

		// Clean up the interval when component is destroyed
		onMount(() => {
			return () => clearInterval(interval);
		});
	}

	// Call the rotateImages function to start rotation on component mount
	rotateImages();

	// Function to scroll to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	let isVisible = false;

	// Function to toggle visibility of the button based on scroll position
	const handleScroll = () => {
		isVisible = window.scrollY > 100; // Adjust this value as needed
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Function to show modal
	// let showModal = false;

	// function toggleModal() {
	//   showModal = !showModal;
	//   if (showModal) {
	//     document.getElementById('my_modal_4').showModal();
	//   } else {
	//     document.getElementById('my_modal_4').close();
	//   }
	// }

	// Function for payment gateway
	async function buyImg(id) {
		console.log(id);
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/payment', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		const res = await resp.json();
		window.location = res;
	}

	// Pagination (Part 1)
	let images = data.image;
	let currentPage = 1;
	let pageSize = 9;
	$: paginatedItems = paginate({ items: images, pageSize, currentPage });
</script>

<div class="hero min-h-screen relative overflow-hidden">
	{#each imageUrls as url, index}
		<img
			src={url}
			alt="Background"
			class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-out brightness-50"
			style="opacity: {index === $currentImageIndex ? 1 : 0}"
		/>
	{/each}
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content relative z-0">
		<div class="max-w-3xl">
			<h1 class="text-4xl font-bold tracking-tight text-stone-50 sm:text-6xl">
				Welcome to PicPot!
			</h1>
			<p class="mt-6 text-lg leading-8">
				Your ultimate image haven. Begin your visual journey with PicPot today! Find the perfect
				images to bring your creative visions to life, all in one place.
			</p>
			<a href="#explore-container" class="btn btn-primary mt-6">Explore Now!</a>
		</div>
	</div>
</div>
<!-- Explore Content -->
<div id="explore-container" class="container lg:mt-24 mx-auto px-2 lg:px-0 mb-24">
	<h1 class="text-4xl font-light tracking-tight text-emerald-400 sm:text-6xl my-16 text-center">
		The internet’s source for visuals.
	</h1>
	<div class="grid grid-row-1 lg:grid-cols-3 gap-4">
		<!-- Card -->
		<!-- {#each data.image as image}  -->
		{#each paginatedItems as image}<!-- Page  pagination (Part 2), update all the {} below -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="relative w-full h-full">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="card card-compact bg-base-100 shadow-xl overflow-hidden h-full">
					<!-- Image container with hover effect -->
					<div class="relative group h-full">
						<!-- Image -->
						<img
							src={image.url}
							alt={image.title}
							class="object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-40"
						/>
						<!-- Card body content -->
						<div
							class="absolute top-4 left-4 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
						>
							<div class="card-body">
								<h2 class="card-title text-2xl">
									{image.title}
									<div class="badge badge-secondary">NEW</div>
								</h2>
								<p class="text-neutral text-lg">{image.description}</p>
								<p
									class="badge badge-primary badge-outline badge-lg text-neutral text-lg font-semibold"
								>
									USD {humanize.formatNumber(image.price)}
								</p>
								<div class="absolute bottom-8 left-4 card-actions">
									<!-- <button class="btn btn-accent" on:click={toggleModal}>View</button> -->
									<a href={`/image/${image.id}`} class="btn btn-accent">Preview</a>
									<button type="submit" class="btn btn-primary" on:click={buyImg(image.id)}
										>Buy Now</button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Modal Box -->
			<!-- <dialog id="my_modal_4" class="modal">
          <div class="modal-box w-11/12 max-w-7xl">
            <div class="modal-body">
              <div class="grid grid-cols-2">
                <div>
                  <h2 class="text-2xl">{image.title}</h2>
                  <p class="text-sm mt-2">{image.uploaded_at}</p>
                </div>
                <div class="text-right">
                  <p class="badge badge-warning badge-lg text-neutral text-lg font-semibold mr-8">USD {humanize.formatNumber(image.price)}</p>
                  <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-5" on:click={toggleModal}>✕</button>
                </div>
              </div>
              <div class="mt-4">
                <img src={image.url} alt={image.title} class="w-full">
              </div>
              <div class="mt-4">
                <p class="text-neutral text-lg">{image.description}</p>
              </div>
              <div class="mt-4 flex justify-center">
                <button class="btn btn-secondary">Edit</button>
                <button class="btn btn-secondary mx-4">Delete</button>
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </dialog> -->
		{/each}
	</div>
</div>

<!-- Page  pagination (Part 3) -->
<LightPaginationNav
	totalItems={images.length}
	{pageSize}
	{currentPage}
	limit={1}
	showStepOptions={true}
	on:setPage={(e) => (currentPage = e.detail.page)}
/>

<!-- Scroll to top -->
<div data-theme="dim">
	{#if isVisible}
		<button
			class="btn btn-circle btn-outline btn-success hover:btn-success fixed bottom-8 right-8 px-4 py-2 shadow"
			on:click={scrollToTop}
		>
			UP
		</button>
	{/if}
</div>
