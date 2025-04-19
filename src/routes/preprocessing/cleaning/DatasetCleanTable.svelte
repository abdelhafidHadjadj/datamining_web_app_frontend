<script>
    export let datasets = [];
    export let search = '';
  
    function statusColor(status) {
      return {
        original: 'bg-gray-200 text-gray-800',
        cleaned: 'bg-yellow-200 text-yellow-800',
        normalized: 'bg-green-200 text-green-800'
      }[status] ?? 'bg-gray-100 text-gray-600';
    }
  </script>
  
  <div class="overflow-auto rounded-lg border shadow-sm">
    <table class="min-w-full text-sm text-left table-auto">
      <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th class="px-4 py-3">File name</th>
          <th class="px-4 py-3">Size</th>
          <th class="px-4 py-3">Columns</th>
          <th class="px-4 py-3">Columns with missing values</th>
          <th class="px-4 py-3">Preprocessing</th>
          <th class="px-4 py-3">Upload at</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each datasets.filter(d => d.file_name?.toLowerCase().includes(search.toLowerCase())) as dataset}
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 font-medium">{dataset.file_name}</td>
            <td class="px-4 py-2">{(dataset.metadata?.file_size / 1024).toFixed(1)} KB</td>
            <td class="px-4 py-2">{dataset.metadata?.nbr_col}</td>
            <td class="px-4 py-2">{Object.keys(dataset.metadata?.missing_values || {}).length}</td>
            <td class="px-4 py-2">
              <span class={`px-2 py-1 text-xs rounded-full font-semibold ${statusColor('original')}`}>
                original
              </span>
            </td>
            <td class="px-4 py-2">{new Date(dataset.upload_date).toLocaleString()}</td>
            <td class="px-4 py-2">
              <a href={`/preprocessing/cleaning/${dataset._id}`} class="text-blue-600 hover:underline text-sm">
                Nettoyer
              </a>
            </td>
          </tr>
        {/each}
  
        {#if datasets.filter(d => d.file_name?.toLowerCase().includes(search.toLowerCase())).length === 0}
          <tr>
            <td colspan="7" class="text-center text-gray-500 py-6">Aucun dataset à nettoyer trouvé.</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
  