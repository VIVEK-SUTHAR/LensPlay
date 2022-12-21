function getDifference(timestamp: string){
    
    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const notificationStamp = new Date(timestamp);
    const notificationDate = notificationStamp.getDate();
    const notificationMonth = notificationStamp.getMonth();
    const notificationYear = notificationStamp.getFullYear();

    if (currentYear != notificationYear) {
        const difference = notificationYear - currentYear;
        return `${difference} years ago`;
    }
    else if(currentMonth != notificationMonth) {
        const difference = notificationMonth - currentMonth;
        return `${difference} months ago`;
    }
    else {
        const difference = notificationDate - currentDate;
        return `${difference} days ago`;
    }

}

export default getDifference;