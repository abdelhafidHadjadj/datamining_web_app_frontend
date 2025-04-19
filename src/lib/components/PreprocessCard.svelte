<script>
    import { SlidersHorizontal } from 'lucide-svelte';
    import { goto } from '$app/navigation';
  </script>
  
  <div class="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer" on:click={() => goto('/preprocessing')}>
    <div class="text-center space-y-3">
      <SlidersHorizontal class="mx-auto text-yellow-500" size="32" />
      <h2 class="text-lg font-semibold">Preprocess Data</h2>
      <p class="text-sm text-gray-500">Clean and normalize columns</p>
    </div>
  </div>
  