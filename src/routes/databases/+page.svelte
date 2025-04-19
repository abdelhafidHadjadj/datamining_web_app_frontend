<!-- File: src/routes/databases/+page.svelte -->
<script>
    import DatasetTable from '$lib/components/DatasetTable.svelte';
    import { Search, Database } from 'lucide-svelte';
    export let data;
    let datasets = data.datasets;
    let search = '';
    let filterStatus = 'all';
  
    $: filteredDatasets = datasets.filter(dataset => {
      const matchName = dataset.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || dataset.status === filterStatus;
      return matchName && matchStatus;
    });
  </script>
  
  <div class="p-6">
    <div class="flex items-center gap-2 mb-6">
      <Database size=40 />
      <h1 class="text-3xl font-semibold">My Databases</h1>
    </div>
  
    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-4">
      <div class="relative flex-1 min-w-[200px]">
        <span class="absolute left-3 top-2.5 text-gray-500"><Search /></span>
        <input
          type="text"
          placeholder="Rechercher par nom de fichier..."
          class="w-full border rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-400"
          bind:value={search}
        />
      </div>
  
      <div class="min-w-[200px]">
        <select bind:value={filterStatus} class="w-full border rounded-lg px-4 py-2">
          <option value="all">All statut</option>
          <option value="original">Original</option>
          <option value="cleaned">Cleaned</option>
          <option value="normalized">Normalized</option>
        </select>
      </div>
    </div>
  
    <!-- Dataset Table -->
    <DatasetTable datasets={filteredDatasets} {search} />
  </div>