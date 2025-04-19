<script>
    let file;
  
    async function upload() {
      const formData = new FormData();
      formData.append('file', file);
  
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
  
      if (res.ok) {
        alert("Fichier bien envoyé !");
      } else {
        alert("Erreur !");
      }
    }
  </script>
  
  <input type="file" bind:files={file} accept=".csv,.arff" />
  <button class="btn btn-primary mt-2" on:click={upload}>Uploader</button>
  