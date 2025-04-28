<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
  
    export let selectedDataset = null;
    export let parameters = {};
    export let algorithm = '';
  
    let Plotly;
    let plotDiv;
    let sseData = [];
    let loading = false;
    let error = '';
  
    onMount(async () => {
      if (browser) {
        Plotly = await import('plotly.js');
        fetchElbow();
      }
    });
  
    async function fetchElbow() {
  if (!selectedDataset || !algorithm) return;

  loading = true;
  error = '';
  sseData = [];

  try {
    const res = await fetch(`http://127.0.0.1:5000/cluster/elbow/${algorithm}/${selectedDataset._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        k_min: parameters.k_min || 2,
        k_max: parameters.k_max || 10,
        columns: parameters.columns || []   // ✅ Send selected columns!
      })
    });

    if (!res.ok) throw new Error('Failed to fetch elbow data');

    const data = await res.json();
    sseData = data;

    drawPlot();
  } catch (err) {
    console.error(err);
    error = 'Error loading elbow graph.';
  } finally {
    loading = false;
  }
}

  
    function drawPlot() {
      if (!sseData.k || !sseData.sse) return;
  
      const trace = {
        x: sseData.k,
        y: sseData.sse,
        mode: 'lines+markers',
        type: 'scatter'
      };
  
      const layout = {
        title: 'Elbow Curve',
        xaxis: { title: 'Number of Clusters (k)' },
        yaxis: { title: 'SSE (Sum of Squared Errors)' },
        margin: { t: 40, l: 50, r: 30, b: 50 }
      };
  
      Plotly.newPlot(plotDiv, [trace], layout, { responsive: true });
    }
  </script>
  
  <div class="space-y-4">
    {#if loading}
      <div class="text-center text-gray-500">Loading Elbow Graph...</div>
    {:else if error}
      <div class="text-red-500">{error}</div>
    {:else}
      <div bind:this={plotDiv} class="w-full h-96"></div>
    {/if}
  </div>
  