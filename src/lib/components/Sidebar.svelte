<script>
    import { Home, Database, Settings, SlidersHorizontal, Users, ChevronRight, ChevronLeft, LayoutDashboard  } from 'lucide-svelte';
    import { sidebarOpen } from '$lib/stores/sidebarStore.js';
    import { get } from 'svelte/store';
  
    let showPreprocessing = false;
    let showUnsupervised = false;
  
    const toggle = () => {
      sidebarOpen.update(n => !n);
    };
  </script>
  
  <style>
    .sidebar {
      transition: all 0.3s ease;
    }
  </style>
  
  <div class="sidebar fixed top-0 left-0 h-screen bg-gray-800 text-white shadow-lg z-50 transition-all duration-300"
    class:w-64={$sidebarOpen}
    class:w-20={!$sidebarOpen}
  >
    <!-- Toggle Button -->
    <button class="absolute top-4 -right-0 bg-gray-800 text-white p-2 rounded-full shadow-md" on:click={toggle}>
      {#if $sidebarOpen}
        <ChevronLeft />
      {:else}
        <ChevronRight />
      {/if}
    </button>
  
    <div class="mt-24 px-4">
      <div class="space-y-2">
        <a href="/" class="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <LayoutDashboard  class="w-5 h-5" />
          {#if $sidebarOpen}<span>Dashboard</span>{/if}
        </a>
  
        <a href="/databases" class="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Database class="w-5 h-5" />
          {#if $sidebarOpen}<span>Databases</span>{/if}
        </a>
  
        <!-- Preprocessing -->
        <div>
          <div class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer" on:click={() => showPreprocessing = !showPreprocessing}>
            <SlidersHorizontal class="w-5 h-5" />
            {#if $sidebarOpen}<span>Preprocessing</span>{/if}
          </div>
          {#if $sidebarOpen && showPreprocessing}
            <div class="ml-8 space-y-1 text-sm">
              <a href="/preprocessing/cleaning" class="block p-1 hover:bg-gray-700 rounded">Cleaning</a>
              <a href="/preprocessing/normalized" class="block p-1 hover:bg-gray-700 rounded">Normalized</a>
            </div>
          {/if}
        </div>
  
        <!-- Unsupervised -->
        <div>
          <div class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer" on:click={() => showUnsupervised = !showUnsupervised}>
            <Users class="w-5 h-5" />
            {#if $sidebarOpen}<span>Unsupervised</span>{/if}
          </div>
          {#if $sidebarOpen && showUnsupervised}
            <div class="ml-8 space-y-1 text-sm">
              <a href="/unsupervised/clustering" class="block p-1 hover:bg-gray-700 rounded">Clustering</a>
            </div>
          {/if}
        </div>
  
        <a href="/settings" class="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <Settings class="w-5 h-5" />
          {#if $sidebarOpen}<span>Settings</span>{/if}
        </a>
      </div>
    </div>
  </div>
  