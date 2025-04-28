<script>
  export let dataset;

  let currentTab = 'original';
  const columns = dataset.metadata.columns || [];

  const tabs = ['original'];
  if (dataset.cleaned_data) tabs.push('cleaned');
  if (dataset.normalized_data) tabs.push('normalized');

  let scrollIndicator;

  const getRows = () => {
    if (currentTab === 'cleaned') return dataset.cleaned_data;
    if (currentTab === 'normalized') return dataset.normalized_data;
    return dataset.raw_data;
  };

  function handleScroll(event) {
    const wrapper = event.target;
    const scrollPercent = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
    scrollIndicator.style.width = `${scrollPercent * 100}%`;
  }
</script>

<div class="mt-6">
  <!-- Tabs -->
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

  <!-- Scroll indicator below tabs -->
  <div class="scroll-top-track mt-1">
    <div class="scroll-top-indicator" bind:this={scrollIndicator}></div>
  </div>

  <!-- Table view -->
  <div class="dataset-table-scroll mt-2 border rounded shadow-sm" on:scroll={handleScroll}>
    <table class="text-sm table-auto w-full min-w-[1200px]">
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
              <td class="px-3 py-1 whitespace-nowrap">{row[col] === null ? 'NaN' : row[col]}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .dataset-table-scroll {
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 0.5rem;
  }

  .dataset-table-scroll::-webkit-scrollbar {
    height: 0px;
  }

  .scroll-top-track {
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }

  .scroll-top-indicator {
    height: 100%;
    width: 0%;
    background-color: #3b82f6;
    transition: width 0.2s ease;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #f3f4f6;
    z-index: 1;
  }
</style>
