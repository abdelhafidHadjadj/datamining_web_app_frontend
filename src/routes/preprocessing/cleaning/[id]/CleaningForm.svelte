<!-- src/routes/preprocessing/cleaning/[datasetId]/CleaningForm.svelte -->
<script>
    export let dataset;
    export let methods = ['mean', 'median', 'mode', 'min', 'max'];
    export let onClean;
  
    let dropColumns = [];
    let fillMissing = {};
    console.log(dataset);
    
    const handleSubmit = () => {
      onClean(dropColumns, fillMissing);
    };
  </script>
  
  <!-- Drop Columns -->
  <div class="mb-6">
    <h2 class="text-lg font-semibold mb-2">🗑️ Columns to Drop</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {#each dataset.metadata.columns as column}
        <label class="flex items-center gap-2">
          <input type="checkbox"
            on:change={(e) =>
              e.target.checked
                ? dropColumns.push(column.name)
                : dropColumns = dropColumns.filter(c => c !== column.name)
            }
          />
          <span>{column}</span>
        </label>
      {/each}
    </div>
  </div>
  
  <!-- Fill Missing -->
  <div class="mb-6">
    <h2 class="text-lg font-semibold mb-2">🧪 Fill Missing Values</h2>
    <div class="flex flex-col gap-3">
      {#each Object.entries(dataset.metadata.missing_values) as column}
        <div class="flex items-center gap-4">
          <label class="w-40">{column}</label>
          <select
            bind:value={fillMissing[column]}
            class="border p-1 rounded w-40"
          >
            <option value="">Ignore</option>
            {#each methods as method}
              <option value={method}>{method}</option>
            {/each}
          </select>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Clean Button -->
  <button on:click={handleSubmit} class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
    ✅ Clean Dataset
  </button>
  