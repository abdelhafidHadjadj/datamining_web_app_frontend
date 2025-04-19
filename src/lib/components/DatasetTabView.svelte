<script>
    export let dataset;
  
    let currentTab = 'original';
    const columns = dataset.metadata.columns || [];
  
    const tabs = ['original'];
    if (dataset.cleaned_data) tabs.push('cleaned');
    if (dataset.normalized_data) tabs.push('normalized');
  
    const getRows = () => {
      if (currentTab === 'cleaned') return dataset.cleaned_data;
      if (currentTab === 'normalized') return dataset.normalized_data;
      return dataset.raw_data;
    };
  </script>
  
  <div class="mt-6">
    <div class="flex space-x-4 border-b">
      {#each tabs as tab}
        <button
          class={`px-4 py-2 font-medium border-b-2 transition-colors ${
            currentTab === tab
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-500'
          }`}
          on:click={() => (currentTab = tab)}
        >
          {tab}
        </button>
      {/each}
    </div>
  
    <div class="dataset-table-scroll mt-4 border rounded shadow-sm">
      <table class="min-w-full text-sm table-auto">
        <thead class="bg-gray-100">
          <tr>
            {#each columns as col}
              <th class="px-3 py-2 text-left font-semibold whitespace-nowrap">{col}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each getRows() as row}
            <tr class="border-t hover:bg-gray-50">
              {#each columns as col}
                <td class="px-3 py-1">{row[col] === null ? 'NaN' : row[col]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  