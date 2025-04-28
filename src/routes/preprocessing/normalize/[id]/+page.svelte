<script>
    import { page } from '$app/stores';
    import NormalizeForm from '$lib/components/NormalizeForm.svelte';
    import PreviewNormalizedTable from '$lib/components/PreviewNormalizedTable.svelte';
    import { goto } from '$app/navigation';
  
    export let data;
    const dataset = data.dataset;
   
   
    let showPreview = false;
    let normalizedResult = null;
    let isSubmitting = false;
  
    async function handleNormalize(event) {
  const { selectedColumns, methodByColumn } = event.detail; // 👈 get from event.detail
  isSubmitting = true;
  console.log("selectedColumns = ", selectedColumns);
  console.log("methodes ", methodByColumn);
  try {
    const requestBody = {};
      selectedColumns.forEach((col) => {
        requestBody[col] = methodByColumn[col]; // 👈 column: method
      });
    const res = await fetch(`http://127.0.0.1:5000/datasets/normalize/${dataset._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const json = await res.json();
    console.log(json);

    normalizedResult = json.preview;
    
    showPreview = true;
  } catch (err) {
    console.error('Normalization failed', err);
  } finally {
    isSubmitting = false;
  }
}

  
    function confirmNormalization() {
      goto(`/databases/${dataset._id}`);
    }
  </script>
  
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold text-pink-700">🧪 Normalizing: {dataset.file_name}</h1>
  
    <div class="flex space-x-4 border-b text-sm font-medium">
      <button class={`px-4 py-2 border-b-2 ${!showPreview ? 'border-pink-500 text-pink-700' : 'border-transparent text-gray-500'}`} on:click={() => showPreview = false}>
        🧾 Normalization Form
      </button>
      <button class={`px-4 py-2 border-b-2 ${showPreview ? 'border-pink-500 text-pink-700' : 'border-transparent text-gray-500'}`} on:click={() => showPreview = true} disabled={!normalizedResult}>
        👀 Preview Result
      </button>
    </div>
  
    {#if !showPreview}
      <NormalizeForm columns={dataset.metadata.columns} on:normalize={handleNormalize} {isSubmitting} />
    {:else if normalizedResult}
      <PreviewNormalizedTable columns={dataset.metadata.columns} rows={normalizedResult} />
      <div class="mt-4">
        <button class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700" on:click={confirmNormalization}>✅ Confirm and Continue</button>
      </div>
    {/if}
  </div>
  