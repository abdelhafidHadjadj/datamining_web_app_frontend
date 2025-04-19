<script>
    import { createEventDispatcher } from 'svelte';
    import { UploadCloud } from 'lucide-svelte';
  
    const dispatch = createEventDispatcher();
    let isDragging = false;
    const allowedTypes = ['.csv', '.arff'];
  
    function isValidFile(file) {
      return allowedTypes.some(type => file.name.toLowerCase().endsWith(type));
    }
  
    function handleDrop(event) {
      event.preventDefault();
      isDragging = false;
      const files = Array.from(event.dataTransfer?.files || []);
      const validFiles = files.filter(isValidFile);
  
      if (validFiles.length > 0) {
        dispatch('upload', { files: validFiles });
      } else {
        alert('Seuls les fichiers CSV et ARFF sont autorisés.');
      }
    }
  
    function handleChange(event) {
      const files = Array.from(event.target.files || []);
      const validFiles = files.filter(isValidFile);
  
      if (validFiles.length > 0) {
        dispatch('upload', { files: validFiles });
      } else {
        alert('Seuls les fichiers CSV et ARFF sont autorisés.');
      }
    }
  
    function preventDefaults(event) {
      event.preventDefault();
    }
  </script>
  
  <div
    class={`dropzone border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${
      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
    }`}
    on:dragenter={() => (isDragging = true)}
    on:dragover={preventDefaults}
    on:dragleave={() => (isDragging = false)}
    on:drop={handleDrop}
  >
    <label class="cursor-pointer block">
      <div class="flex flex-col items-center justify-center space-y-3">
        <UploadCloud class="text-blue-500" size="40" />
        <p class="text-gray-700 font-medium">Click or drag a CSV or ARFF file here</p>
        <p class="text-sm text-gray-400">Only .csv and .arff files are allowed</p>
      </div>
      <input type="file" multiple accept=".csv,.arff" class="hidden" on:change={handleChange} />
    </label>
  </div>
  