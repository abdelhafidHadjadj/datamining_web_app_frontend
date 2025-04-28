<script>
    import NormalizeTable from '$lib/components/NormalizeTable.svelte';
    import { Wrench } from 'lucide-svelte'

    export let data;
    let datasets = data.datasets;
    let search = '';
  </script>
  
  <section class="p-6 space-y-4">
    <div class="flex items-center gap-2">
        <Wrench size=40 />
        <h1 class="text-3xl font-semibold"> Preprocessing - Normalize</h1>
    </div>
      <input
      type="text"
      bind:value={search}
      placeholder="Rechercher un dataset..."
      class="px-4 py-2 border border-gray-300 rounded w-full md:w-1/3"
    />
    {#if datasets.length > 0}
    <NormalizeTable {datasets} bind:search />
    {:else}
        <p class="text-gray-500 mt-4">Not available cleaned data</p>
    {/if}
</section>
  