/*
Format jam: 
12hour: 12:00 - 01:00 PM/AM
24hour: 00:00 - 23:00
timeago: 1hour - year
*/
function formatTimestamp_hstry(timestamp, format = '12hour') {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours24 < 12 ? 'AM' : 'PM';

    const time24 = `${String(hours24).padStart(2, '0')}:${minutes}`;
    const time12 = `${hours12}:${minutes} ${period}`;

    switch (format) {
        case 'timeago':
            if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
            if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
            return `${Math.floor(diffInSeconds / 2419200)} months ago`;

        case '24hour':
            return `${day}/${month}/${year} ${time24}`;

        case '12hour':
            return `${day}/${month}/${year} ${time12}`;

        default:
            return `${day}/${month}/${year} ${time24}`;
    }
}
