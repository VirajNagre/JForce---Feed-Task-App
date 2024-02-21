
const formatDateTime = (ordDate) =>{
    ordDate = new Date(ordDate)
    return `${ordDate.getDate()}/${ordDate.getMonth()}/${ordDate.getFullYear()} ${(ordDate.getHours() + 24) % 12 || 12}:${String(ordDate.getMinutes()).padStart(2, '0')} ${ordDate.getHours() >= 12 ? "PM" : "AM"}`;

}

export default formatDateTime
