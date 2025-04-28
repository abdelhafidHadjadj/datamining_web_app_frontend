<script>
  import DatasetTabView from '$lib/components/DatasetTabView.svelte';

  export let data;
  const dataset = data.dataset;
</script>

<div class="p-4 space-y-6">
  <!-- Header -->
  <h1 class="text-2xl font-bold text-gray-800">📄 {dataset.file_name}</h1>

  <!-- Metadata -->
  <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
    <div>
      <p><strong>ID :</strong> {dataset._id}</p>
      <p><strong>Date d'upload :</strong> {dataset.upload_date}</p>
      <p><strong>Taille :</strong> {(dataset.metadata.file_size / 1024).toFixed(2)} KB</p>
    </div>
    <div>
      <p><strong>Colonnes :</strong> {dataset.metadata.nbr_col}</p>
      <p><strong>Status :</strong>
        <span class={`px-2 py-1 text-xs rounded-full font-semibold ${
          dataset.cleaned_data
            ? (dataset.normalized_data ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800')
            : 'bg-gray-200 text-gray-800'
        }`}>
          {dataset.cleaned_data
            ? (dataset.normalized_data ? 'normalized' : 'cleaned')
            : 'original'}
        </span>
      </p>
    </div>
  </div>

  <!-- Dataset Tabs and Table -->
  <DatasetTabView {dataset} />
</div>
