function getDate(timestamp: string) {
    const index = timestamp.indexOf("T");
    const date = timestamp.substring(0, index);
  
    return date;
  }
  
  export default function getDateDifference(timestamp: string) {
    const createdAt = new Date(getDate(timestamp));
    const currentDate = new Date(getDate(new Date().toJSON()));
  
    const diffTime = Math.abs(currentDate - createdAt);
  
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return days;
  }