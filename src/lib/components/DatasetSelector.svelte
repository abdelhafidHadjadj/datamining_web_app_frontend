<script>
    export let datasets = [];
    export let selected = null;
  
    function handleSelect(event) {
      const id = event.target.value;
      selected = datasets.find(d => d._id === id) || null;
    }
  </script>
  
  <div class="space-y-2">
    <label class="block text-gray-700 font-semibold">Select a Dataset</label>
  
    <select
      class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      on:change={handleSelect}
    >
      <option disabled selected value="">-- Choose a dataset --</option>
      {#each datasets as ds}
        <option
          value={ds._id}
          selected={selected && selected._id === ds._id}
        >
          {ds.file_name}
        </option>
      {/each}
    </select>
  </div>
  