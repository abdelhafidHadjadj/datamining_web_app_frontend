<script>
    export let availableColumns = [];
    export let selectedColumns = [];
  
    function toggleColumn(col) {
      if (selectedColumns.includes(col)) {
        selectedColumns = selectedColumns.filter(c => c !== col);
      } else {
        selectedColumns = [...selectedColumns, col];
      }
    }
  </script>
  
  <div class="space-y-2">
    <label class="block text-gray-700 font-semibold">Select Features (Columns)</label>
  
    <div class="flex flex-wrap gap-2">
      {#each availableColumns as col}
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            class="form-checkbox text-blue-500"
            checked={selectedColumns.includes(col)}
            on:change={() => toggleColumn(col)}
          />
          <span class="ml-2">{col}</span>
        </label>
      {/each}
    </div>
  </div>
  