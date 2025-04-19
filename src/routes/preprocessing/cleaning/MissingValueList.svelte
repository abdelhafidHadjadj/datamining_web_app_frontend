<script>
    export let values = {};
  </script>
  
  {#if values && Object.keys(values).length > 0}
    <ul class="list-disc pl-5">
      {#each Object.entries(values) as [col, count]}
        {#if count > 0}
          <li><strong>{col}</strong>: {count}</li>
        {/if}
      {/each}
    </ul>
  
    {#if Object.values(values).every(count => count === 0)}
      <p class="text-sm text-gray-500 italic">Aucune valeur manquante</p>
    {/if}
  {:else}
    <p class="text-sm text-gray-500 italic">Non spécifié</p>
  {/if}
  