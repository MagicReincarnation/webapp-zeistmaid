document.addEventListener("DOMContentLoaded", function() {
    const deleteLinks = document.querySelectorAll('.deleteCm');
    deleteLinks.forEach(link => {
        const originalUrl = link.getAttribute('href');
        const encodedUrl = btoa(originalUrl);
        link.setAttribute('data-url', encodedUrl);
        link.removeAttribute('href');
        link.addEventListener('click', showDeletePopup);
    });
});

function showDeletePopup(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Masukan kata sandi',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Delete',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
   if (password !== 'hiru123') {
                Swal.fire({
                    icon: 'error',
      title: 'kata sandi Salah',
 text: 'Silakan masukkan kata sandi yang benar.',
                    confirmButtonText: 'OK'
                });
                return false;
            }
            return true;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const url = atob(event.target.dataset.url);
            window.location.href = url;
        }
    });
}
