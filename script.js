document.getElementById('contactForm').addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    alert(`Terima kasih telah menghubungi kami, ${name}. Kami akan segera merespon email Anda di ${email}.`);

    document.getElementById('contactForm').reset();
});
