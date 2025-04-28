<script>
  export let data;
  import CleaningForm from './CleaningForm.svelte';
  import CleaningPreview from './CleaningPreview.svelte';
  import { cleanDataset } from '$lib/api/dataset';
  import DatasetTabView from '$lib/components/DatasetTabView.svelte';
  import { Table } from 'lucide-svelte';
  import { FileCode } from 'lucide-svelte';
  let dataset = data.dataset;
  let preview = [];
  let error = null;

  let activeTab = 'original';
  let originalViewFormat = 'table'; // default view

  async function handleCleaning(dropColumns, fillMissing) {
    try {
      const result = await cleanDataset(dataset._id, dropColumns, fillMissing);
      preview = result.cleaned_data;
      error = null;
      activeTab = 'preview';
      
      console.log(preview);
      
    } catch (err) {
      error = err.message;
    }
  }

</script>

<section class="p-8 max-w-screen-xl mx-auto space-y-8">
  <h1 class="text-3xl font-bold text-pink-600 flex items-center gap-3">
    <span>🧼</span> Cleaning: <span class="text-gray-800">{dataset.file_name}</span>
  </h1>

  {#if error}
    <div class="p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
      <p class="font-semibold">⚠️ Error:</p>
      <p>{error}</p>
    </div>
  {/if}

  {#if dataset?.metadata?.columns}
    <!-- Tabs -->
    <div class="flex space-x-2 border-b border-gray-200">
      <button
        class="px-4 py-2 rounded-t-lg font-semibold transition-all duration-200"
        class:bg-white={activeTab === 'original'}
        class:text-pink-600={activeTab === 'original'}
        class:border-x={activeTab === 'original'}
        class:border-t={activeTab === 'original'}
        class:border-gray-200={activeTab === 'original'}
        on:click={() => (activeTab = 'original')}
      >
        📄 Original Data
      </button>
    
      <button
        class="px-4 py-2 rounded-t-lg font-semibold transition-all duration-200"
        class:bg-white={activeTab === 'cleaning'}
        class:text-pink-600={activeTab === 'cleaning'}
        class:border-x={activeTab === 'cleaning'}
        class:border-t={activeTab === 'cleaning'}
        class:border-gray-200={activeTab === 'cleaning'}
        on:click={() => (activeTab = 'cleaning')}
      >
        🧹 Cleaning Form
      </button>
    
      {#if preview && preview.length > 0}
        <button
          class="px-4 py-2 rounded-t-lg font-semibold transition-all duration-200"
          class:bg-white={activeTab === 'preview'}
          class:text-pink-600={activeTab === 'preview'}
          class:border-x={activeTab === 'preview'}
          class:border-t={activeTab === 'preview'}
          class:border-gray-200={activeTab === 'preview'}
          on:click={() => (activeTab = 'preview')}
        >
          🔍 Preview
        </button>
      {/if}
    </div>
    

    <!-- Tab Panels -->
    <div class="border border-t-0 border-gray-200 rounded-b-2xl shadow-lg bg-white p-6">
      {#if activeTab === 'original'}
      <div class="flex flex-row justify-between">

        <h2 class="text-lg font-semibold text-gray-700 mb-4">📄 Original Data</h2>
        <div class="space-x-2">
          <button
          class="text-sm px-3 py-1 rounded-full border font-medium transition"
          class:bg-pink-600={originalViewFormat === 'table'}
          class:text-white={originalViewFormat === 'table'}
          class:bg-white={originalViewFormat !== 'table'}
          class:text-pink-600={originalViewFormat !== 'table'}
          on:click={() => (originalViewFormat = 'table')}
          >
          <Table class="w-4 h-4" />
        </button>
        <button
        class="text-sm px-3 py-1 rounded-full border font-medium transition"
        class:bg-pink-600={originalViewFormat === 'json'}
        class:text-white={originalViewFormat === 'json'}
        class:bg-white={originalViewFormat !== 'json'}
        class:text-pink-600={originalViewFormat !== 'json'}
        on:click={() => (originalViewFormat = 'json')}
        >
        <FileCode class="w-4 h-4" />
      </button>
    </div>
    </div>
    <div>
      {#if originalViewFormat === 'table'}
      <DatasetTabView {dataset} />
      {:else}
      <pre class="bg-gray-50 p-4 rounded max-h-96 overflow-auto text-sm">
        { activeTab === 'original' ?JSON.stringify(dataset.raw_data?.slice(0, 20), null, 2): JSON.stringify(dataset.cleaned_data?.slice(0, 20), null, 2)}
      </pre>
      {/if}
    </div>
      {:else if activeTab === 'cleaning'}
      <CleaningForm {dataset} on:clean={(e) => handleCleaning(e.detail.dropColumns, e.detail.fillMissing)} />
        {:else if activeTab === 'preview'}
        <CleaningPreview {preview} />
        {/if}
    </div>
  {:else}
    <p class="text-gray-500 italic">No column metadata available.</p>
  {/if}
</section>
