<script>
    export let columns = [];
    export let rows = [];
  </script>
  
  <div class="overflow-x-auto mt-6 border rounded shadow-sm">
    <table class="min-w-[1000px] w-full text-sm table-auto">
      <thead class="bg-gray-100">
        <tr>
          {#each columns as col}
            <th class="px-3 py-2 text-left font-semibold whitespace-nowrap">{col}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows.slice(0, 10) as row} <!-- Seulement les 10 premières lignes -->
          <tr class="border-t hover:bg-gray-50">
            {#each columns as col}
              <td class="px-3 py-1 whitespace-nowrap">{row[col] ?? 'NaN'}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  