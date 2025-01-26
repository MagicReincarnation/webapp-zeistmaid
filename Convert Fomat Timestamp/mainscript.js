const config_timestamp = {
    /*
    Format jam: 
    12hour: 12:00 - 01:00 PM/AM       -> Format waktu 12 jam dengan AM/PM
    24hour: 00:00 - 23:00              -> Format waktu 24 jam (00:00 hingga 23:00)
    timeago_en: 1hour - year           -> Format waktu dalam bahasa Inggris seperti "1 hour ago", "3 days ago", "1 year ago"
    timeago_id: 1jam - tahun           -> Format waktu dalam bahasa Indonesia seperti "1 jam yang lalu", "3 hari yang lalu", "1 tahun yang lalu"
    */
    modeFormat: "timeago_id",  // Format default untuk waktu yang digunakan, bisa berupa 'timeago_id', 'timeago_en', '24hour', '12hourv1', atau '12hourv2'
    
    timeago_auto12hourv1: true,  // Mengaktifkan fitur otomatis untuk beralih ke format 12 jam (12hour) jika memenuhi kondisi tertentu
    auto12hourv1_dalam: 7,      // Jika selisih hari lebih dari nilai ini, format akan berubah menjadi '12hourv1', dalam hal ini 7 hari
};

// Fungsi untuk memformat timestamp
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

// Contoh
console.log(formatTimestamp(new Date().getTime(), "timeago_en")); // Menggunakan format timeago_en
console.log(formatTimestamp(new Date().getTime(), "12hourv2"));  // Menggunakan format 12-hour dengan AM/PM
console.log(formatTimestamp(new Date().getTime(), "timeago_id")); // Menggunakan format timeago_id
