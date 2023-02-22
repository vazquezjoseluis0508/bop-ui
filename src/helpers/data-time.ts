
export const convertDate = (date) => {
    const fecha = new Date(date)
    return fecha.toISOString().substring(0, 10)
}