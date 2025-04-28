// POST /datasets/clean/:id and return the JSON the route sends
export async function cleanDataset(id, dropColumns, fillMissing) {
  const res = await fetch(`http://127.0.0.1:5000/datasets/clean/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      drop_columns: dropColumns,
      fillna: fillMissing        // key must match back-end route
    })
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();       // { message, preview }
}
