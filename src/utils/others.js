export const convertISODateToString = (str) => {
    str = str.split("T")[0]
    const day = str.split('-')[2]
    const month = str.split('-')[1]
    const year = str.split('-')[0]
    return `${day}-${month}-${year}`
}