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
          <th class="px-4 py-3">Rows</th>
          <th class="px-4 py-3">Preprocessing</th>
          <th class="px-4 py-3">Upload at</th>
          <th class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        {#each datasets.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())) as dataset}
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 font-medium">{dataset.name}</td>
            <td class="px-4 py-2">{dataset.size}</td>
            <td class="px-4 py-2">{dataset.columns}</td>
            <td class="px-4 py-2">{dataset.rows}</td>
            <td class="px-4 py-2">
              <span class={`px-2 py-1 text-xs rounded-full font-semibold ${statusColor(dataset.status)}`}>
                {dataset.status}
              </span>
            </td>
            <td class="px-4 py-2">{dataset.uploaded_at}</td>
            <td class="px-4 py-2">
              <a href={`/databases/${dataset.id}`} class="text-blue-600 hover:underline text-sm">Détails</a>
            </td>
          </tr>
        {/each}
  
        {#if datasets.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())).length === 0}
          <tr>
            <td colspan="7" class="text-center text-gray-500 py-6">Aucun dataset trouvé.</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
  