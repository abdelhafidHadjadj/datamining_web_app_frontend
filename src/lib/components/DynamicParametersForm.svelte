<script>
    export let parameters = {};
    export let selectedAlgorithm = '';
  
    function updateParam(key, value) {
      parameters = { ...parameters, [key]: value };
    }
  </script>
  
  <div class="space-y-4">
    {#if selectedAlgorithm === 'kmeans' || selectedAlgorithm === 'kmedoids' || selectedAlgorithm === 'agnes' || selectedAlgorithm === 'diana'}
      <div class="space-y-1">
        <label class="block text-gray-700 font-medium">Number of Clusters (k)</label>
        <input
          type="number"
          min="2"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={parameters.k}
          on:input={(e) => updateParam('k', parseInt(e.target.value))}
        />
      </div>
  
      {#if selectedAlgorithm === 'kmedoids'}
        <div class="space-y-1">
          <label class="block text-gray-700 font-medium">Distance Metric</label>
          <select
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={parameters.metric}
            on:change={(e) => updateParam('metric', e.target.value)}
          >
            <option value="euclidean">Euclidean</option>
            <option value="manhattan">Manhattan</option>
          </select>
        </div>
      {/if}
    
    {:else if selectedAlgorithm === 'dbscan'}
      <div class="space-y-1">
        <label class="block text-gray-700 font-medium">Epsilon (eps)</label>
        <input
          type="number"
          step="0.01"
          min="0"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={parameters.eps}
          on:input={(e) => updateParam('eps', parseFloat(e.target.value))}
        />
      </div>
  
      <div class="space-y-1">
        <label class="block text-gray-700 font-medium">Min Samples</label>
        <input
          type="number"
          min="1"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={parameters.min_samples}
          on:input={(e) => updateParam('min_samples', parseInt(e.target.value))}
        />
      </div>
  
    {:else if selectedAlgorithm === 'agnes' || selectedAlgorithm === 'diana'}
      <div class="space-y-1">
        <label class="block text-gray-700 font-medium">Linkage Method</label>
        <select
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={parameters.linkage}
          on:change={(e) => updateParam('linkage', e.target.value)}
        >
          <option value="single">Single Linkage</option>
          <option value="complete">Complete Linkage</option>
          <option value="average">Average Linkage</option>
        </select>
      </div>
    {/if}
  </div>
  