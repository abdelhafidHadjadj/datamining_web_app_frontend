<script>
    import DatasetCleanTable from './DatasetCleanTable.svelte';
    import { WandSparkles } from 'lucide-svelte'
    export let data;
    let datasets = data.datasets;
    let search = '';
  </script>
  
  <section class="p-6 space-y-4">
    <div class="flex items-center gap-2">
      <WandSparkles size=40 />
      <h1 class="text-3xl font-semibold">Preprocessing - Cleaning</h1>
    </div>
  
    <input
      type="text"
      bind:value={search}
      placeholder="Rechercher un dataset..."
      class="px-4 py-2 border border-gray-300 rounded w-full md:w-1/3"
    />
  
    {#if datasets.length > 0}
      <DatasetCleanTable {datasets} {search} />
    {:else}
      <p class="text-gray-500 mt-4">Aucun dataset avec valeurs manquantes à nettoyer.</p>
    {/if}
  </section>
  