<script>
	// Importing alert-related functions and variables from alert.js
	import { warningAlert, alertMsg, successAlert } from '../utils/alert.js';
</script>

<!-- Displaying warning alert if $warningAlert variable is truthy -->
<div style="position: relative;">
	{#if $warningAlert}
		<div
			role="alert"
			class="alert alert-warning"
			style="position: absolute; margin-top: 80px; z-index: 999;"
		>
			<!-- Warning icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<!-- Warning message -->
			<span>{$alertMsg}</span>
		</div>
	{/if}

	<!-- Displaying success alert if $successAlert variable is truthy -->
	{#if $successAlert}
		<div
			role="alert"
			class="alert alert-success"
			style="position: absolute; margin-top: 80px; z-index: 999;"
		>
			<!-- Success icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<!-- Success message -->
			<span>{$alertMsg}</span>
		</div>
	{/if}
</div>
