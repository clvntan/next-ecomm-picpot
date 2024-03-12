<script>
  // Importing CSS file to apply styles to the component
  import "../app.css";

  // Importing Svelte components
  import Navigation from "./nav.svelte";
  import Footer from "./footer.svelte"
  import Alert from "./alert.svelte"
</script>

<!-- Render the Navigation component -->
<Navigation />
<div>
<!-- Render the Alert component -->
<Alert />
<!-- Render the content provided within the slot -->
<slot />
</div>
<!-- Render the Footer component -->
<Footer />