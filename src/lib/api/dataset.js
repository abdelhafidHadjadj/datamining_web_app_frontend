export async function cleanDataset(datasetId, dropColumns, fillMissing) {
    const body = {
      processing_params: {
        drop_columns: dropColumns,
        fill_missing: fillMissing
      }
    };
  
    const res = await fetch(`http://127.0.0.1:5000/process/clean/${datasetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Cleaning failed');
    }
  
    return res.json();
  }
  