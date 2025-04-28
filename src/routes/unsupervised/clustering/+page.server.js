// src/routes/unsupervised/clustering/+page.server.js

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    try {
      const res = await fetch('http://127.0.0.1:5000/datasets');
      if (!res.ok) throw new Error('Failed to fetch datasets');
      const datasets = await res.json();
      return { datasets };
    } catch (err) {
      console.error('Failed to load datasets:', err);
      return { datasets: [] };
    }
  }
  