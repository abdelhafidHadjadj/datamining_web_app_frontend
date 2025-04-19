/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    const res = await fetch('http://127.0.0.1:5000/datasets');
    const allDatasets = await res.json();
  
    const filtered = allDatasets.filter(ds => {
      const isNotCleaned = !ds.cleaned_data || ds.cleaned_data.length === 0;
      const missingValues = ds.metadata?.missing_values || {};
      
      const hasMissing = Object.keys(missingValues).length > 0;
  
      return  hasMissing;
    });
    console.log(filtered);
    
    return { datasets: filtered };
  }
  