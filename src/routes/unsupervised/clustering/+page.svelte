<script>
  import { page } from '$app/stores';
  import DatasetSelector from '$lib/components/DatasetSelector.svelte';
  import AlgorithmSelector from '$lib/components/AlgorithmSelector.svelte';
  import DynamicParametersForm from '$lib/components/DynamicParametersForm.svelte';
  import FeatureSelector from '$lib/components/FeatureSelector.svelte';
  import ResultsDisplay from '$lib/components/ResultsDisplay.svelte';
  import { toast } from '@zerodevx/svelte-toast';

  export let data;
  let datasets = data.datasets;

  let selectedDataset = null;
  let selectedAlgorithm = '';
  let parameters = { columns: [] };
  let clusteringResult = null;
  let elbowImageUrl = '';

  let loading = false;
  let saveLoading = false;
  let elbowLoading = false;

  async function runClustering() {
    if (!selectedDataset || !selectedAlgorithm) {
      toast.push('Please select a dataset and an algorithm first!', { theme: { '--toastBackground': '#F87171' } });
      return;
    }

    if ((selectedAlgorithm === 'kmeans' || selectedAlgorithm === 'kmedoids') && !parameters.k) {
      toast.push('Please specify the number of clusters (k)', { theme: { '--toastBackground': '#F87171' } });
      return;
    }

    loading = true;
    clusteringResult = null;

    try {
      const bodyToSend = { ...parameters };
      if (selectedAlgorithm === 'kmeans' || selectedAlgorithm === 'kmedoids') {
        bodyToSend.k = parseInt(parameters.k, 10);
      }

      const res = await fetch(`http://127.0.0.1:5000/cluster/${selectedAlgorithm}/${selectedDataset._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend)
      });

      if (!res.ok) throw new Error('Clustering failed');
      clusteringResult = await res.json();
      toast.push('Clustering completed successfully!', { theme: { '--toastBackground': '#4ADE80' } });
    } catch (err) {
      console.error(err);
      toast.push('Error running clustering', { theme: { '--toastBackground': '#F87171' } });
    } finally {
      loading = false;
    }
  }

  async function viewElbowGraph() {
    if (!selectedDataset || !selectedAlgorithm) {
      toast.push('Please select a dataset and an algorithm first!', { theme: { '--toastBackground': '#F87171' } });
      return;
    }

    elbowLoading = true;

    try {
      const res = await fetch(`http://127.0.0.1:5000/cluster/elbow/${selectedAlgorithm}/${selectedDataset._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          k_min: parameters.k_min ? parseInt(parameters.k_min) : 2,
          k_max: parameters.k_max ? parseInt(parameters.k_max) : 10,
          columns: parameters.columns || []
        })
      });

      if (!res.ok) throw new Error('Failed to fetch elbow graph');
      const data = await res.json();
      elbowImageUrl = data.image_url;
      toast.push('Elbow graph loaded successfully!', { theme: { '--toastBackground': '#4ADE80' } });
    } catch (err) {
      console.error(err);
      toast.push('Error loading elbow graph', { theme: { '--toastBackground': '#F87171' } });
    } finally {
      elbowLoading = false;
    }
  }

  async function saveClusteringResult() {
    if (!clusteringResult) {
      toast.push('No clustering result to save.', { theme: { '--toastBackground': '#F87171' } });
      return;
    }

    saveLoading = true;

    try {
      const res = await fetch(`http://127.0.0.1:5000/cluster/save/${selectedDataset._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clusteringResult)
      });

      if (!res.ok) throw new Error('Failed to save clustering result');
      toast.push('Clustering result saved successfully!', { theme: { '--toastBackground': '#4ADE80' } });
    } catch (err) {
      console.error(err);
      toast.push('Error saving clustering result', { theme: { '--toastBackground': '#F87171' } });
    } finally {
      saveLoading = false;
    }
  }
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

  <!-- Parameters and Features -->
  {#if selectedAlgorithm}
    <section class="p-4 bg-white rounded-lg shadow space-y-4">
      <DynamicParametersForm bind:parameters {selectedAlgorithm} />

      {#if selectedDataset?.metadata?.columns}
        <FeatureSelector
          availableColumns={selectedDataset.metadata.columns}
          bind:selectedColumns={parameters.columns}
        />
      {/if}

      <div class="flex gap-4">
        {#if selectedAlgorithm === 'kmeans' || selectedAlgorithm === 'kmedoids'}
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
            on:click={viewElbowGraph}
            disabled={elbowLoading}
          >
            {#if elbowLoading}
              <div class="small-loader"></div>
            {/if}
            View Elbow Graph
          </button>
        {/if}

        <button
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center justify-center gap-2"
          on:click={runClustering}
          disabled={loading}
        >
          {#if loading}
            <div class="small-loader"></div>
          {/if}
          Run Clustering
        </button>
      </div>
    </section>
  {/if}

  <!-- Elbow Graph Image -->
  {#if elbowImageUrl}
    <section class="p-4 bg-white rounded-lg shadow space-y-4">
      <h2 class="text-xl font-bold text-gray-800">Elbow Graph</h2>
      <img src={elbowImageUrl} alt="Elbow Graph" class="w-full max-w-2xl mx-auto rounded shadow" />
    </section>
  {/if}

  <!-- Clustering Results -->
  {#if clusteringResult}
    <section class="p-4 bg-white rounded-lg shadow space-y-4">
      <ResultsDisplay {clusteringResult} />

      <button
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center gap-2"
        on:click={saveClusteringResult}
        disabled={saveLoading}
      >
        {#if saveLoading}
          <div class="small-loader"></div>
        {/if}
        Save Result
      </button>
    </section>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    background-color: #f9fafb;
  }

  .small-loader {
    border: 2px solid #f3f3f3;
    border-top: 2px solid white;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
