

<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let datasets = [];
  let search = '';
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/datasets');
      datasets = await res.json();
    } catch (err) {
      console.error('Error fetching datasets', err);
    } finally {
      loading = false;
    }
  });

  function filtered() {
    return datasets.filter(d => d.file_name.toLowerCase().includes(search.toLowerCase()));
  }

  function openComparePage(id) {
    goto(`/metrics/${id}`);
  }
</script>

<main class="max-w-6xl mx-auto p-8 space-y-6">
  <h1 class="text-3xl font-bold text-center mb-6">Compare Clustering Results</h1>

  <input
    type="text"
    placeholder="Search datasets..."
    bind:value={search}
    class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  {#if loading}
    <div class="text-center py-10">
      <div class="loader"></div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {#each filtered() as dataset}
        <div class="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold text-gray-800">{dataset.file_name}</h2>
            <p class="text-sm text-gray-500">Rows: {dataset.raw_data?.length || 'N/A'} - Size: {Math.round(dataset.metadata?.file_size / 1024)} KB</p>
          </div>
          <button
            class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            on:click={() => openComparePage(dataset._id)}
          >
            Compare Algorithms
          </button>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
