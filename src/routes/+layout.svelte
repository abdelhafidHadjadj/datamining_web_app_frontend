<script>
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { sidebarOpen } from '$lib/stores/sidebarStore.js';
  
	let { children } = $props();
  </script>
  
  <div class="flex min-h-screen bg-gray-100">
	<Sidebar />
  
	<!-- Responsive margin: sidebar width adjusts based on isOpen -->
	<main
	  class="flex-1 p-4 transition-all overflow-x-hidden duration-300"
	  class:ml-64={$sidebarOpen}
	  class:ml-20={!$sidebarOpen}
	>
	  {@render children()}
	</main>
  </div>
  