<script>
    import Dropzone from '$lib/components/Dropzone.svelte';
    import ClusteringCard from '$lib/components/ClusteringCard.svelte';
    import PreprocessCard from '$lib/components/PreprocessCard.svelte';
    import { uploadCSV } from '$lib/api/api.js';
  
    let uploadedInfo = null;
    let errorMsg = '';
  
    async function handleUpload(event) {
      const files = event.detail.files;
      try {
        const response = await uploadCSV(files);
        uploadedInfo = response; // Assuming your backend returns metadata or ID
        errorMsg = '';
        console.log(uploadedInfo);
        
      } catch (error) {
        errorMsg = error.message;
        uploadedInfo = null;
      }
    }
  </script>
  <div class="p-6 space-y-8">
    <h1 class="text-2xl font-bold text-gray-700">Dashboard</h1>
  
    <div class="bg-white p-6 rounded-xl h-[60%] shadow grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Dropzone on:upload={handleUpload} />
      <PreprocessCard />
      <ClusteringCard />
    </div>
  
    {#if uploadedInfo}
    <div class="bg-green-50 border border-green-200 text-green-800 mt-6 p-4 rounded-md shadow-inner space-y-2">
        <div class="font-semibold">✅ {uploadedInfo.message}</div>
        <div><strong>Nom du fichier :</strong> {uploadedInfo.data.file_name}</div>
        <div><strong>Date d’upload :</strong> {uploadedInfo.data.upload_date}</div>
        <div><strong>ID :</strong> <code>{uploadedInfo.data._id}</code></div>
        <div><strong>Colonnes :</strong> {uploadedInfo.data.metadata.nbr_col}</div>
        <div><strong>Taille :</strong> {(uploadedInfo.data.metadata?.file_size / 1024).toFixed(2)} KB</div>
      </div>
    {/if}
  </div>
  