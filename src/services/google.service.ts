import axios from 'axios'
import { google_search_api_key, google_search_cx, google_search_url } from '../constant/constants'

// Define una función para buscar imágenes utilizando la API de Google Custom Search
export async function searchImages (query: string): Promise<string> {
  try {
    // Realiza la solicitud a la API de Google Custom Search
    const response = await axios.get(
        `${google_search_url}?key=${google_search_api_key}&cx=${google_search_cx}&q=${query}&source=lnms&`
    )

    // Extrae los enlaces de las imágenes de la respuesta
    if (!response.data.items) {
      return ''
    }

    const imageLink = response.data.items.map((item: any) => {
      return item.pagemap.cse_image[0].src
    })

    // console.log("imageLink", imageLink[3]);

    return imageLink[0]
  } catch (error) {
    // console.log("Error al buscar imágenes:", {error});
    return ''
  }
}
