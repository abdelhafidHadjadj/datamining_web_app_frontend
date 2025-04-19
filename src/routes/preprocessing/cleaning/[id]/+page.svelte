<script>
    export let data;
    import CleaningForm from './CleaningForm.svelte';
    import CleaningPreview from './CleaningPreview.svelte';
    import { cleanDataset } from '$lib/api/dataset';
  
    let dataset = data.dataset;
    let preview = [];
    let error = null;
  
    async function handleCleaning(dropColumns, fillMissing) {
      try {
        const result = await cleanDataset(dataset._id, dropColumns, fillMissing);
        preview = result.preview;
      } catch (err) {
        error = err.message;
      }
    }
  </script>
  
  <h1 class="text-2xl font-bold mb-4">🧼 Cleaning: {dataset.file_name}</h1>
  
  {#if error}
    <p class="text-red-600 font-semibold">Error: {error}</p>
  {:else if dataset?.metadata?.columns}
    <CleaningForm {dataset} onClean={handleCleaning} />
    <CleaningPreview {preview} />
  {:else}
    <p class="text-gray-600">No column metadata available.</p>
  {/if}
  