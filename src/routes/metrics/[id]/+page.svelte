<script>
    import { onMount, tick  } from 'svelte';
    import { toast } from '@zerodevx/svelte-toast';
    import { page } from '$app/stores';
    import { Chart, registerables } from 'chart.js';
  
    Chart.register(...registerables);
  
    let datasetId = $page.params.id;
    let datasetInfo = null;
    let algorithms = [];
    let loading = true;
  
    async function fetchMetrics() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/metrics/${datasetId}`);
        if (!res.ok) throw new Error('Failed to fetch metrics');
        const data = await res.json();
        datasetInfo = data.dataset;
        console.log(datasetInfo);
        
        algorithms = data.algorithms;
      } catch (err) {
        console.error(err);
        toast.push('Error fetching metrics', { theme: { '--toastBackground': '#F87171' } });
      } finally {
        loading = false;
      }
    }
  
    function renderHistogram(allAlgorithms, containerId) {
  const ctx = document.getElementById(containerId)?.getContext('2d');
  if (!ctx) return;

  const labels = allAlgorithms.map(algo => algo.algorithm.toUpperCase());
  const scores = allAlgorithms.map(algo => algo.metrics?.silhouette_score ?? 0);

  const backgroundColors = labels.map((_, index) => fixedColor(index));

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Silhouette Score',
        data: scores,
        backgroundColor: backgroundColors,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: 'Algorithm' }
        },
        y: {
          title: { display: true, text: 'Silhouette Score' },
          suggestedMin: 0,
          suggestedMax: 1
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Silhouette Score Comparison Between Algorithms'
        },
        legend: {
          display: false
        }
      }
    }
  });
}

function fixedColor(index) {
  const colors = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6', '#facc15', '#f43f5e'];
  return colors[index % colors.length];
}

  
onMount(async () => {
  await fetchMetrics();
  await tick();

  // Correction : UN SEUL renderHistogram pour tous les algorithmes
  renderHistogram(algorithms, 'histogram-all');
});


  
  </script>
  
  <main class="max-w-7xl mx-auto p-8 space-y-8">
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <div class="loader"></div>
      </div>
    {:else}
      {#if datasetInfo}
        <section class="bg-white p-6 rounded-lg shadow space-y-4">
          <h1 class="text-3xl font-bold text-gray-800 text-center">📊 Dataset Overview</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {datasetInfo.file_name}</div>
            <div><strong>Upload Date:</strong> {new Date(datasetInfo.upload_date).toLocaleString()}</div>
            <div><strong>Size:</strong> {Math.round(datasetInfo.size_in_bytes / 1024)} KB</div>
            <div><strong>Number of Features:</strong> {datasetInfo.n_features}</div>
          </div>
        </section>
  
        <section class="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 class="text-2xl font-bold text-gray-800 text-center">📈 Algorithms Comparison</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full table-auto text-left">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2">Algorithm</th>
                  <th class="px-4 py-2">SSE</th>
                  <th class="px-4 py-2">Silhouette Score</th>
                  <th class="px-4 py-2">Runtime (sec)</th>
                </tr>
              </thead>
              <tbody>
                {#each algorithms as algo}
                  <tr class="border-t">
                    <td class="px-4 py-2 font-semibold">{algo.algorithm.toUpperCase()}</td>
                    <td class="px-4 py-2">{algo.metrics?.sse?.toFixed(2) ?? '—'}</td>
                    <td class="px-4 py-2">{algo.metrics?.silhouette_score?.toFixed(4) ?? '—'}</td>
                    <td class="px-4 py-2">{algo.runtime_sec?.toFixed(4)}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>
  
        <section class="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center">📊 Algorithms Histogram Comparison</h2>
          
            <div class="border rounded-lg overflow-hidden shadow-sm p-4">
              <canvas id="histogram-all" class="w-full h-96"></canvas>
            </div>
          </section>
        <section class="bg-white p-6 rounded-lg shadow space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 text-center">🖼️ Cluster Visualizations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each algorithms as algo}
              {#if algo.scatter_path}
                <div class="border rounded-lg overflow-hidden shadow-sm">
                  <img src={"http://127.0.0.1:5000" + algo.scatter_path} alt="Scatter Plot" class="object-cover w-full h-64" />
                  <div class="p-3 text-center font-semibold">{algo.algorithm.toUpperCase()}</div>
                </div>
              {/if}
            {/each}
          </div>
        </section>
  
          
  
      {:else}
        <p class="text-center text-red-500 font-bold">Dataset not found!</p>
      {/if}
    {/if}
  </main>
  
  <style>
    .loader {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #3b82f6;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  </style>
  