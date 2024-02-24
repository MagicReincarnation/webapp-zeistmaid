  
if (typeof firebase !== 'undefined' && typeof CryptoJS !== 'undefined') {
    const lisensiElem = document.getElementById('hirutshuji_lisensi'); 
       if (lisensiElem) {
        const lisensiDekripsi = CryptoJS.AES.decrypt(lisensiElem.innerText.trim(), 'Hnssidfrfufftfsfhfufjffai').toString(CryptoJS.enc.Utf8);

        if (lisensiDekripsi) {
            fetch(`https://xhrji-617c0-default-rtdb.firebaseio.com/scriptbyHiru_lisensi/datauser_Hiru/${lisensiDekripsi}.json`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("Data not found");
                    }
                }).then(data => {
                    const kodeHiru = data.KodeHiru; 
                    const kodeDekripsi = CryptoJS.AES.decrypt(kodeHiru, 'Hnssidfrfufftfsfhfufjffai').toString(CryptoJS.enc.Utf8);
                    if (data && kodeDekripsi === lisensiDekripsi) {  
                        svscadlidnafjadLsaicenfffse = true;
                    } else {              handleLicenseError();
                    }                        
                }).catch(error => {
                    console.log("Error: ", error); 
                    handleLicenseError();
             
                });
        } else {
            handleLicenseError();
          }
    } else {
        handleLicenseError();
    }
} else { handleLicenseError();}

function handleLicenseError() {
    alert('Lisensi untuk kode ini kosong');
    svscadlidnafjadLsaicenfffse = false;
 var dataclassdanid = ['#hari', '#minggu', '#bulan','#Toplikeshiru'];

dataclassdanid.forEach(selector => {
    var elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.remove();
    });
});
    return;
}
