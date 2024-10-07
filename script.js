document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('GOROTOPUP').value;
    const email = document.getElementById('akuntiktok1813@gmail.com').value;
    const message = document.getElementById('Terimakasih sudah menggunakan website kami. Harap tunggu sebentar yaa').value;

    alert(`Terima kasih telah menghubungi kami, ${name}. Kami akan segera merespon email Anda di ${email}.`);

    document.getElementById('contactForm').reset();
});
