<!-- src/routes/preprocessing/cleaning/[datasetId]/CleaningPreview.svelte -->
<script>
    export let preview = [];
  </script>
  
  {#if preview.length > 0}
    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-2">🔍 Preview of Cleaned Data</h2>
      <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-96">
        {JSON.stringify(preview, null, 2)}
      </pre>
    </div>
  {/if}
  