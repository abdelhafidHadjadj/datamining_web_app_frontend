<script>
  import { createEventDispatcher } from 'svelte';

  export let dataset;
  const dispatch = createEventDispatcher();

  let dropColumns = [];
  let fillMissing = {};
  const methods = ['mean', 'median', 'mode', 'min', 'max'];
  let error = '';

  // Extract columns with missing values from metadata
  let missingValueColumns = Object.entries(dataset.metadata.missing_values || {}).map(
    ([key, value]) => ({ name: key, ...value })
  );

  // Filter out dropped columns from missing columns
  $: filteredMissingColumns = missingValueColumns.filter(
    col => !dropColumns.includes(col.name)
  );

  function validateAndSubmit() {
    const requiredFields = filteredMissingColumns.map(c => c.name);
    const allFilled = requiredFields.every(name => fillMissing[name]);

    if (!allFilled) {
      error = 'Please select a method for all columns with missing values.';
      return;
    }

    error = '';
    dispatch('clean', { dropColumns, fillMissing });
  }
</script>

<div class="space-y-6">
  <!-- Drop Columns Section -->
  <div>
    <h2 class="text-lg font-semibold text-gray-700 mb-2">🗃 Columns to Drop</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      {#each dataset.metadata.columns as col}
        <label class="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg shadow-sm border hover:bg-gray-200 transition">
          <input
            type="checkbox"
            bind:group={dropColumns}
            value={col}
          />
          <span class="text-sm">{col}</span>
        </label>
      {/each}
    </div>
  </div>

  <!-- Fill Missing Values Section -->
  <div>
    <h2 class="text-lg font-semibold text-gray-700 mb-2">🧪 Fill Missing Values (Required)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each filteredMissingColumns as col}
        <div class="bg-white p-4 rounded-xl border shadow">
          <label class="block font-medium text-gray-600 mb-1">{col.name}</label>
          <select bind:value={fillMissing[col.name]} class="w-full p-2 border rounded-md focus:ring-pink-500 focus:outline-none" required>
            <option value="" disabled selected>Select method</option>
            {#each methods as method}
              <option value={method}>{method}</option>
            {/each}
          </select>
        </div>
      {/each}
    </div>
  </div>

  {#if error}
    <p class="text-red-600 font-semibold">{error}</p>
  {/if}

  <div class="flex justify-end mt-4">
    <button on:click={validateAndSubmit} class="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 font-semibold shadow">
      🚀 Clean Dataset
    </button>
  </div>
</div>
