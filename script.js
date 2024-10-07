function topUp(game, amount) {
    const notification = document.getElementById("notification");
    notification.innerText = `Anda telah berhasil melakukan top-up ${amount} koin ke ${game}!`;
    notification.style.display = "block";

    // Menghapus notifikasi setelah beberapa detik
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}
