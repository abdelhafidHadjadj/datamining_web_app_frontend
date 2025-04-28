// File: src/routes/preprocessing/normalize/+page.server.js

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const res = await fetch('http://127.0.0.1:5000/datasets');
    const allDatasets = await res.json();
  
    const filtered = allDatasets.filter(ds => {
      const isCleaned = ds.cleaned_data && ds.cleaned_data.length > 0;
      const isNotNormalized = !ds.normalized_data || ds.normalized_data.length === 0;
  
      return isCleaned && isNotNormalized;
    });
  
    return { datasets: filtered };
  }
  