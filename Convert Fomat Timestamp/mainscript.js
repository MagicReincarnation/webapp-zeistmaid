const config_timestamp = {
/*
Format jam: 
12hour: 12:00 - 01:00 PM/AM
24hour: 00:00 - 23:00
timeago: 1hour - year
*/
    modeFormat: "24hour", // Default format mode
    timeago_auto12hourv1: true, // aktifkan auto switch ke format 12-hour.
    auto12hourv1_dalam: 7, // Jumlah hari untuk beralih ke '12hourv1'
};

// Contoh penggunaan
function formatTimestamp(timestamp, format = config_timestamp.modeFormat) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours24 < 12 ? 'AM' : 'PM';

    const time24 = `${String(hours24).padStart(2, '0')}:${minutes}`;
    const time12 = `${hours12}:${minutes} ${period}`;

    if (
        config_timestamp.timeago_auto12hourv1 &&
        diffInDays > config_timestamp.auto12hourv1_dalam &&
        (format === 'timeago_id' || format === 'timeago_en')
    ) {
        return `${day}/${month}/${year}`;
    }

    switch (format) {
        case 'timeago_en':
            if (diffInSeconds < 60) return `${diffInSeconds} seconds`;
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours`;
            if (diffInDays < 7) return `${diffInDays} days ago`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months`;
            return `${Math.floor(diffInDays / 365)} years`;

        case 'timeago_id':
            if (diffInSeconds < 60) return `${diffInSeconds} baru saja`;
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
            if (diffInDays < 7) return `${diffInDays} hari`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} bulan`;
            return `${Math.floor(diffInDays / 365)} tahun`;

        case '24hour':
            return `${day}/${month}/${year} ${time24}`;

        case '12hourv1':
            return `${day}/${month}/${year}`;

        case '12hourv2':
            return `${day}/${month}/${year} ${time12}`;

        default:
            return `${day}/${month}/${year} ${time24}`;
    }
}

// Contoh penggunaan fungsi
console.log(formatTimestamp(new Date().getTime(), "timeago_en"));
console.log(formatTimestamp(new Date().getTime(), "12hourv2"));
console.log(formatTimestamp(new Date().getTime(), "timeago_id"));
