/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    const id = params.id;
  
    const res = await fetch(`http://127.0.0.1:5000/datasets/${id}`);
    if (!res.ok) {
      return {
        status: res.status,
        error: new Error('Dataset not found')
      };
    }
    console.log(res.body);
    
    const data = await res.json();
    console.log(data);
    
  
    return {
      dataset: data
    };
  }
  