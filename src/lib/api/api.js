import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';
export async function uploadCSV(file) {
    const formData = new FormData();
    formData.append('file', file[0]);

    try {
        const res = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res.data);
        
        return res.data;
    } catch (error) {
        let message = 'Erreur lors du téléchargement du fichier.';
        
        if (error.response) {
            console.error("Server responded with error:", error.response.data);
            message = error.response.data?.error || message;
        } else if (error.request) {
            console.error("No response from server:", error.request);
            message = "Le serveur n’a pas répondu.";
        } else {
            console.error("Error during request setup:", error.message);
            message = error.message;
        }

        // Tu peux soit afficher une alerte ici, soit relancer l'erreur
        throw new Error(message);
    }
}          

export async function cleanDataset(datasetId, drop_columns, fillna) {
    const res = await fetch(`http://127.0.0.1:5000/clean/${datasetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        drop_columns,
        fillna
      })
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Erreur lors du nettoyage');
    }
  
    const cleanedData = await res.json();
    console.log(cleanedData);
    
    return cleanedData; // Ceci devrait contenir les données nettoyées (ex: { cleaned: [...], stats: {...} })
  }
  
