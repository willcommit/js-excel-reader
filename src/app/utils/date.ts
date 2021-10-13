export function generateDate() {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    const formatedDate = `${year}${month}${day}`;

    return formatedDate;
}