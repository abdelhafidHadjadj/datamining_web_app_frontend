<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
  
    let Plotly;
    let plotDiv;
  
    export let clusteringResult = null;
  
    onMount(async () => {
      if (browser) {
        Plotly = await import('plotly.js');   // ✅ GOOD import
        drawResults();
      }
    });
  
    function drawResults() {
      if (!clusteringResult || !clusteringResult.labels) return;
      if (!clusteringResult.results?.points) return;
  
      const labels = clusteringResult.labels;
      const points = clusteringResult.results.points;
      const centers = clusteringResult.results.centers || null;
  
      const uniqueLabels = [...new Set(labels)];
      const colors = uniqueLabels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);
  
      const traces = uniqueLabels.map((cluster, idx) => {
        const clusterPoints = points.filter((_, i) => labels[i] === cluster);
  
        return {
          x: clusterPoints.map(p => p[0]),
          y: clusterPoints.map(p => p[1]),
          mode: 'markers',
          type: 'scatter',
          name: `Cluster ${cluster}`,
          marker: {
            color: colors[idx],
            size: 8,
            line: { width: 1 }
          }
        };
      });
  
      if (centers) {
        traces.push({
          x: centers.map(c => c[0]),
          y: centers.map(c => c[1]),
          mode: 'markers',
          type: 'scatter',
          name: 'Centers',
          marker: {
            color: 'black',
            size: 12,
            symbol: 'x'
          }
        });
      }
  
      const layout = {
        title: 'Clustered Data',
        xaxis: { title: 'Feature 1' },
        yaxis: { title: 'Feature 2' },
        margin: { t: 40, l: 50, r: 30, b: 50 }
      };
  
      Plotly.newPlot(plotDiv, traces, layout, { responsive: true });
    }
  </script>
  
  <div class="space-y-6">
    {#if clusteringResult}
      <div bind:this={plotDiv} class="w-full h-[500px]"></div>
  
      <div class="bg-gray-50 p-6 rounded-lg shadow space-y-2">
        <h2 class="text-2xl font-bold text-gray-800">Metrics</h2>
  
        <div class="grid grid-cols-2 gap-4 text-gray-700">
          {#if clusteringResult.metrics?.sse !== undefined}
            <div><strong>SSE:</strong> {clusteringResult.metrics.sse.toFixed(2)}</div>
          {/if}
          {#if clusteringResult.metrics?.silhouette_avg !== undefined}
            <div><strong>Silhouette Score:</strong> {clusteringResult.metrics.silhouette_avg.toFixed(3)}</div>
          {/if}
          {#if clusteringResult.metrics?.ssc !== undefined}
            <div><strong>SSC:</strong> {clusteringResult.metrics.ssc.toFixed(2)}</div>
          {/if}
          {#if clusteringResult.metrics?.calinski_harabaz !== undefined}
            <div><strong>Calinski-Harabasz:</strong> {clusteringResult.metrics.calinski_harabaz.toFixed(2)}</div>
          {/if}
          {#if clusteringResult.metrics?.davies_bouldin !== undefined}
            <div><strong>Davies-Bouldin:</strong> {clusteringResult.metrics.davies_bouldin.toFixed(2)}</div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  