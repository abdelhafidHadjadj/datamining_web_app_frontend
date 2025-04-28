<script>
    export let selected = '';
  
    const algorithms = [
      { value: 'kmeans', label: 'K-Means' },
      { value: 'kmedoids', label: 'K-Medoids' },
      { value: 'dbscan', label: 'DBSCAN' },
      { value: 'agnes', label: 'AGNES (Agglomerative Clustering)' },
      { value: 'diana', label: 'DIANA (Divisive Analysis)' }
    ];
  
    function handleSelect(event) {
      selected = event.target.value;
    }
  </script>
  
  <div class="space-y-2">
    <label class="block text-gray-700 font-semibold">Select Clustering Algorithm</label>
  
    <select
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      on:change={handleSelect}
      bind:value={selected}
    >
      <option disabled value="">-- Choose an algorithm --</option>
      {#each algorithms as algo}
        <option value={algo.value}>{algo.label}</option>
      {/each}
    </select>
  </div>
  