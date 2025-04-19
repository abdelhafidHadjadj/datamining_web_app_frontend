/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
      const res = await fetch('http://127.0.0.1:5000/datasets');
      const json = await res.json();
  
      const datasets = json.map(d => ({
        id: d._id,
        name: d.file_name,
        size: (d.metadata.file_size / 1024).toFixed(2) + ' KB',
        columns: d.metadata?.nbr_col ?? d.metadata.columns?.length ?? 0,
        rows: d.raw_data?.length ?? 0,
        status: d.cleaned_data ? (d.normalized_data ? 'normalized' : 'cleaned') : 'original',
        uploaded_at: new Date(d.upload_date).toLocaleString()
      }));
  
      return { datasets };
    } catch (err) {
      console.error('Erreur lors du chargement des datasets:', err);
      return { datasets: [] };
    }
  }
  