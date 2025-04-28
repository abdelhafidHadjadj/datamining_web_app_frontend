<script>
    import { createEventDispatcher } from 'svelte';
  
    export let columns = [];
    export let isSubmitting = false;
  
    const dispatch = createEventDispatcher();
    const numericMethods = ['minmax', 'zscore', 'robust'];
  
    let selectedColumns = [];
    let methodByColumn = {};
    let applyToAll = '';
    let selectAll = false; // 👈 track the "select all" checkbox
  
    function toggleColumn(col) {
      if (selectedColumns.includes(col)) {
        selectedColumns = selectedColumns.filter(c => c !== col);
        delete methodByColumn[col];
      } else {
        selectedColumns = [...selectedColumns, col];
        methodByColumn[col] = applyToAll || 'minmax';
      }
    }
  
    function toggleSelectAll() {
      if (selectAll) {
        // if checked, select all columns
        selectedColumns = [...columns];
        columns.forEach(col => {
          methodByColumn[col] = applyToAll || 'minmax';
        });
      } else {
        // if unchecked, deselect everything
        selectedColumns = [];
        methodByColumn = {};
      }
    }
  
    function submit() {
      dispatch('normalize', { selectedColumns, methodByColumn });
    }
  </script>
  
  <div class="space-y-6 mt-4">
    <div>
      <h2 class="text-lg font-semibold text-gray-800">📊 Columns to Normalize</h2>
  
      <!-- Select All Checkbox -->
      <div class="flex items-center space-x-2 mb-4">
        <input type="checkbox" bind:checked={selectAll} on:change={toggleSelectAll} />
        <span class="text-gray-700 font-medium">Select All Columns</span> 
      </div>
  
      <div class="grid md:grid-cols-3 gap-4 mt-2">
        {#each columns as col}
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedColumns.includes(col)}
              on:change={() => toggleColumn(col)}
            />
            <span class="text-gray-700 font-medium">{col}</span>
  
            {#if selectedColumns.includes(col)}
              <select bind:value={methodByColumn[col]} class="ml-auto rounded border px-2 py-1 text-sm">
                {#each numericMethods as method}
                  <option value={method}>{method}</option>
                {/each}
              </select>
            {/if}
          </label>
        {/each}
      </div>
    </div>
  
    <div class="mt-4">
      <label class="text-sm text-gray-600 font-medium">Default Method for New Columns:</label>
      <div class="flex items-center gap-2 mt-1">
        <select bind:value={applyToAll} class="rounded border px-2 py-1 text-sm">
          <option value="">Choose method</option>
          {#each numericMethods as method}
            <option value={method}>{method}</option>
          {/each}
        </select>
      </div>
      <p class="text-xs text-gray-500 mt-1">New selected columns will automatically use this method unless manually changed.</p>
    </div>
  
    <div class="mt-6">
      <button
        class="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:opacity-50"
        on:click={submit}
        disabled={selectedColumns.length === 0 || isSubmitting}
      >
        {isSubmitting ? 'Normalizing...' : '✅ Normalize Selected Columns'}
      </button>
    </div>
  </div>
  
  <style>
    input[type="checkbox"]:checked + span {
      font-weight: bold;
    }
  </style>
  