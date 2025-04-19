// src/routes/preprocessing/cleaning/[datasetId]/+page.server.js

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
  const datasetId = params.id;

  const res = await fetch(`http://127.0.0.1:5000/datasets/${datasetId}`);
  if (!res.ok) {
    return {
      status: res.status,
      error: new Error(`Failed to fetch dataset: ${res.status}`)
    };
  }

  const dataset = await res.json();
  return { dataset };
}
