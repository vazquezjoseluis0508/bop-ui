
export const convertDate = (date) => {
    const fecha = new Date(date)
    return fecha.toISOString().substring(0, 10)
}

export const formatDate = (date: string, type: string) => {

    const fecha = new Date(date + 'T00:00:00')

    switch ( type ) {
        case 'corta':
            return fecha.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })
        case 'larga':
            return fecha.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })
        default:
            return fecha.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })
    }

}
