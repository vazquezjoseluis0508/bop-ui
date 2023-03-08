import { searchImages } from './google.service'

// Función para obtener los resultados de búsqueda desde el almacenamiento local
export function getFromLocalStorage (query: string): any | undefined {
  const cache = localStorage.getItem(query)
  if (cache) {
    return JSON.parse(cache)
  }
}

// Función para almacenar los resultados de búsqueda en el almacenamiento local
export function storeInLocalStorage (query: string, results: any) {
  localStorage.setItem(query, JSON.stringify(results))
}
