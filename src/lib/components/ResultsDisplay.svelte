<script>
    import { TimerIcon } from 'lucide-svelte'; // ✅ Import the clock icon
    export let clusteringResult;
  </script>
  
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-800">🧩 Clustering Results</h2>
  
    <div class="bg-white p-6 rounded-lg shadow space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="text-gray-500 text-sm">Number of Clusters</div>
          <div class="text-lg font-semibold mt-1">
            {Object.keys(clusteringResult?.results?.cluster_sizes || {}).length}
          </div>
        </div>
  
        <div>
          <div class="text-gray-500 text-sm">SSE (Sum of Squared Errors)</div>
          <div class="text-lg font-semibold mt-1">
            {clusteringResult?.metrics?.sse?.toFixed(2)}
          </div>
        </div>
  
        <div>
          <div class="text-gray-500 text-sm">Silhouette Score</div>
          <div class="text-lg font-semibold mt-1">
            {clusteringResult?.metrics?.silhouette_score?.toFixed(4) ?? 'N/A'}
          </div>
        </div>
  
        <div class="flex items-start gap-2">
          <div>
            <div class="text-gray-500 text-sm">Runtime</div>
            <div class="text-lg font-semibold mt-1">
              {clusteringResult?.runtime_sec ?? 'N/A'} seconds
            </div>
          </div>
        </div>
      </div>
  
      <!-- Cluster Sizes -->
      <div>
        <div class="text-gray-500 text-sm mb-2">Cluster Sizes</div>
        <ul class="space-y-2">
          {#each Object.entries(clusteringResult?.results?.cluster_sizes || {}) as [cluster, size]}
            <li class="bg-gray-100 rounded px-3 py-2 flex justify-between items-center">
              <span class="font-medium">Cluster {cluster}</span>
              <span class="text-gray-700 font-semibold">{size} samples</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  
    <!-- Scatter Plot -->
    {#if clusteringResult?.results?.scatter_path}
      <div class="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 class="text-2xl font-bold text-gray-800">📈 Cluster Scatter Plot</h3>
        <img
          src={"http://127.0.0.1:5000" + clusteringResult.results.scatter_path}
          alt="Cluster Scatter Plot"
          class="w-full max-w-3xl mx-auto rounded shadow"
        />
      </div>
    {/if}
  </div>
  
  <style>
    :global(img) {
      object-fit: contain;
    }
  </style>
  