<script>
    import { Table, FileCode } from 'lucide-svelte';
  export let preview = [];
  let viewMode = 'table'; // 'table' or 'code'
</script>

{#if preview && preview.length > 0}
  <div class="mt-8 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">🔍 Preview of Cleaned Data</h2>

      <!-- Switcher Buttons -->
      <div class="flex space-x-2">
        <button
          on:click={() => viewMode = 'table'}
          class="px-4 py-1 rounded border font-medium text-sm transition"
          class:bg-pink-600={viewMode === 'table'}
          class:text-white={viewMode === 'table'}
          class:bg-white={viewMode !== 'table'}
          class:text-pink-600={viewMode !== 'table'}
        >
        <Table class="w-4 h-4" />
      </button>
        <button
          on:click={() => viewMode = 'code'}
          class="px-4 py-1 rounded border font-medium text-sm transition"
          class:bg-pink-600={viewMode === 'code'}
          class:text-white={viewMode === 'code'}
          class:bg-white={viewMode !== 'code'}
          class:text-pink-600={viewMode !== 'code'}
        >
        <FileCode class="w-4 h-4" />
        </button>
      </div>
    </div>

    {#if viewMode === 'table'}
      <!-- Table View -->
      <div class="overflow-auto max-h-96 rounded border">
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="bg-gray-200 text-xs uppercase">
            <tr>
              {#each Object.keys(preview[0]) as key}
                <th class="px-4 py-2">{key}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each preview as row}
              <tr class="border-t">
                {#each Object.values(row) as cell}
                  <td class="px-4 py-2">{cell}</td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <!-- Code (JSON) View -->
      <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm leading-relaxed">
        {JSON.stringify(preview, null, 2)}
      </pre>
    {/if}
  </div>
{/if}
