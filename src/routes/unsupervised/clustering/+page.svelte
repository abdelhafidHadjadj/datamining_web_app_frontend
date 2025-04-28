<script>
    import { onMount } from 'svelte';
    import DatasetSelector from '$lib/components/DatasetSelector.svelte';
    import AlgorithmSelector from '$lib/components/AlgorithmSelector.svelte';
    import DynamicParametersForm from '$lib/components/DynamicParametersForm.svelte';
    import ElbowGraph from '$lib/components/ElbowGraph.svelte';
    import ResultsDisplay from '$lib/components/ResultsDisplay.svelte';
    import { toast } from '@zerodevx/svelte-toast';
  
    let datasets = [];
    let selectedDataset = null;
    let selectedAlgorithm = '';
    let parameters = {};
    let clusteringResult = null;
    let loading = false;
    let showElbow = false;
  
    async function fetchDatasets() {
      try {
        const res = await fetch('http://127.0.0.1:5000/datasets');
        if (!res.ok) throw new Error('Failed to fetch datasets');
        datasets = await res.json();
      } catch (err) {
        console.error(err);
        toast.push('Error fetching datasets', { theme: { '--toastBackground': '#F87171' } });
      }
    }
  
    async function runClustering() {
      if (!selectedDataset || !selectedAlgorithm) {
        toast.push('Please select a dataset and an algorithm first!', { theme: { '--toastBackground': '#F87171' } });
        return;
      }
  
      loading = true;
      clusteringResult = null;
  
      try {
        const res = await fetch(`http://127.0.0.1:5000/cluster/${selectedAlgorithm}/${selectedDataset._id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parameters)
        });
        if (!res.ok) throw new Error('Clustering failed');
        clusteringResult = await res.json();
      } catch (err) {
        console.error(err);
        toast.push('Error running clustering', { theme: { '--toastBackground': '#F87171' } });
      } finally {
        loading = false;
      }
    }
  
    onMount(fetchDatasets);
  </script>
  
  <main class="max-w-5xl mx-auto p-8 space-y-8">
    <h1 class="text-3xl font-bold text-center mb-8">Clustering Tool</h1>
  
    <!-- Dataset selection -->
    <section class="p-4 bg-white rounded-lg shadow space-y-4">
      <DatasetSelector {datasets} bind:selected={selectedDataset} />
    </section>
  
    <!-- Algorithm selection -->
    {#if selectedDataset}
      <section class="p-4 bg-white rounded-lg shadow space-y-4">
        <AlgorithmSelector bind:selected={selectedAlgorithm} />
      </section>
    {/if}
  
    <!-- Dynamic Parameters Form -->
    {#if selectedAlgorithm}
      <section class="p-4 bg-white rounded-lg shadow space-y-4">
        <DynamicParametersForm bind:parameters {selectedAlgorithm} />
  
        {#if selectedAlgorithm === 'kmeans' || selectedAlgorithm === 'kmedoids'}
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            on:click={() => showElbow = true}
          >
            View Elbow Graph
          </button>
        {/if}
  
        <button
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          on:click={runClustering}
          disabled={loading}
        >
          {loading ? 'Clustering...' : 'Run Clustering'}
        </button>
      </section>
    {/if}
  
    <!-- Elbow Graph -->
    {#if showElbow && selectedDataset && (selectedAlgorithm === 'kmeans' || selectedAlgorithm === 'kmedoids')}
      <section class="p-4 bg-white rounded-lg shadow space-y-4">
        <ElbowGraph {selectedDataset} {parameters} algorithm={selectedAlgorithm} />
      </section>
    {/if}
  
    <!-- Results -->
    {#if clusteringResult}
      <section class="p-4 bg-white rounded-lg shadow space-y-4">
        <ResultsDisplay {clusteringResult} />
      </section>
    {/if}
  </main>
  
  <style>
    main {
      min-height: 100vh;
      background-color: #f9fafb;
    }
  </style>
  