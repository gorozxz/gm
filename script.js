let transactionHistory = [];

function topUp(game) {
    const amountInput = document.getElementById(`topupAmount${game.charAt(game.length - 1)}`);
    const amount = parseInt(amountInput.value);

    // Validasi input
    if (isNaN(amount) || amount <= 0) {
        showNotification("Masukkan jumlah koin yang valid.");
        return;
    }

    // Tentukan batas minimum untuk top-up
    const minAmount = parseInt(amountInput.placeholder.match(/\d+/)[0]);
    if (amount < minAmount) {
        showNotification(`Jumlah koin harus lebih dari ${minAmount} untuk ${game}.`);
        return;
    }

    // Simulasi pemrosesan top-up
    transactionHistory.push(`Top Up ${amount} koin ke ${game}`);
    showNotification(`Anda telah berhasil melakukan top-up ${amount} koin ke ${game}!`);
    updateTransactionHistory();
    
    // Reset input
    amountInput.value = '';
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";

    // Menghapus notifikasi setelah beberapa detik
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function updateTransactionHistory() {
    const transactionList = document.getElementById("transactionHistory");
    transactionList.innerHTML = ''; // Bersihkan daftar sebelumnya

    transactionHistory.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = transaction;
        transactionList.appendChild(li);
    });
}
