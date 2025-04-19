<!-- File: src/routes/databases/[id]/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import DatasetTabView from '$lib/components/DatasetTabView.svelte';
    export let data;
    const dataset = data.dataset;
  
    let scrollIndicator;
  
    onMount(() => {
      const wrapper = document.querySelector('.dataset-table-scroll');
      if (wrapper) {
        wrapper.addEventListener('scroll', () => {
          const scrollPercent = wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth);
          if (scrollIndicator) {
            scrollIndicator.style.width = `${scrollPercent * 100}%`;
          }
        });
      }
    });
  </script>
  
  <div class="p-4 space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">📄 {dataset.file_name}</h1>
  
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
  
    <div class="scroll-top-wrapper">
        <div class="scroll-top-track">
          <div class="scroll-top-indicator" bind:this={scrollIndicator}></div>
        </div>
      <DatasetTabView {dataset} />
    </div>
  </div>
  
  <style>
    :global(.dataset-table-scroll) {
      overflow-x: scroll;
      width: 100%;
      scrollbar-width: none;
    }
  
    :global(.dataset-table-scroll::-webkit-scrollbar) {
      height: 0px;
    }
  
    :global(.dataset-table-scroll table) {
      min-width: 1200px;
    }
  
    :global(thead th) {
      position: sticky;
      top: 0;
      background-color: #f3f4f6;
      z-index: 1;
    }
  
    .scroll-top-wrapper {
      position: relative;
    }
  
    .scroll-top-track {
      height: 8px;
      background-color: #e5e7eb;
      border-radius: 4px;
      margin-top: 4px;
      overflow: hidden;
    }
  
    .scroll-top-indicator {
      height: 100%;
      width: 0%;
      background-color: #3b82f6;
      transition: width 0.2s;
    }
  </style>