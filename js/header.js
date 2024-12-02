document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.getElementById('header-container');
    fetch('../html/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o header.');
            }
            return response.text();
        })
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });

});
