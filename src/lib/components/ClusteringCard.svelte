<script>
    import { ScatterChart } from 'lucide-svelte';
    import { goto } from '$app/navigation';
  </script>
  
  <div class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer" on:click={() => goto('/unsupervised')}>
    <div class="text-center space-y-3">
      <ScatterChart class="mx-auto text-green-500" size="32" />
      <h2 class="text-lg font-semibold">Run Clustering</h2>
      <p class="text-sm text-gray-500">KMeans, DBSCAN, AGNES...</p>
    </div>
  </div>
  