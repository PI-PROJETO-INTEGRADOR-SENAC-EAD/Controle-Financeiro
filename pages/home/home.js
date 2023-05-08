// Função que realiza o logout do usuário do sistema, utilizando o serviço de autenticação do Firebase.
function logout() {
    firebase.auth().signOut().then(() => {
        // Redireciona o usuário para a página inicial após o logout.
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

// Função que verifica se há um usuário autenticado no sistema e, caso haja, busca as transações associadas a esse usuário.
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findTransactions(user);
    }
})


// Função que redireciona o usuário para a página de criação de uma nova transação.
function newTransaction() {
    window.location.href = "../transaction/transaction.html";
}

// Função que busca as transações associadas a um determinado usuário e adiciona essas transações à tela.
function findTransactions(user) {
    firebase.firestore()
    .collection('transactions')
    .where('user.uid', '==', user.uid)
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
     // Mapeia os documentos do snapshot para um array de objetos com os dados das transações.
        const transactions = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        addTransactionsToScreen(transactions);
    })
    .catch(error => {
        hideLoading();
        console.log(error);
        alert('Erro ao recuperar transacoes');
    })
}

// Função que adiciona as transações à tela, criando elementos HTML dinamicamente com os dados das transações.
function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        li.id = transaction.uid;
        li.addEventListener('click', () =>{
            window.location.href = "../transaction/transaction.html?uid=" + transaction.uid;
        } )

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "Remover";
        deleteButton.classList.add('outline', 'danger');
        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            askRemoveTransaction(transaction);
        })
        li.appendChild(deleteButton);

        const date = document.createElement('p');
        date.innerHTML = formatDate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.transactionType;
        li.appendChild(type);

        if (transaction.description) {
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
        }

        orderedList.appendChild(li);
    });
}

// Função que pergunta ao usuário se ele deseja remover uma transação e, caso a resposta seja positiva, remove a transação do banco de dados e da tela.
function askRemoveTransaction(transaction) {
    const shouldRemove = confirm('Deseja remover a transaçao?');
    if (shouldRemove) {
        removeTransaction(transaction);
    }
}

// Função que remove uma transação do banco de dados e da tela.
function removeTransaction(transaction) {

    firebase.firestore()
        .collection("transactions")
        .doc(transaction.uid)
        .delete()
        .then(() => {
            document.getElementById(transaction.uid).remove();
        })
        .catch(error => {
            console.log(error);
            alert('Erro ao remover transaçao');
        })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}