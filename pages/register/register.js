firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../home/home.html";
    }
})


// Esta função recebe um email como entrada e retorna verdadeiro se estiver em um formato válido e falso caso contrário
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Esta função é chamada quando o campo de entrada de email muda. Ela verifica se o email é válido e exibe mensagens de erro de acordo
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

// Esta função é chamada quando o campo de entrada de senha muda. Ela verifica se a senha atende aos requisitos e exibe mensagens de erro de acordo
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

// Esta função é chamada quando o campo de entrada de confirmação de senha muda. Ela verifica se as senhas coincidem e exibe uma mensagem de erro se não coincidirem
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

// Função para registrar um usuário
function register() {
   
    // Obtém o valor do email e senha do formulário 
    const email = form.email().value;
    const password = form.password().value;
    // Cria um usuário com email e senha usando o Firebase
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {

        // Redireciona para a página inicial após o registro bem-sucedido
        window.location.href = "../../pages/home/home.html";
    }).catch(error => {

        // Exibe uma mensagem de erro se houver algum problema
        alert(getErrorMessage(error));
    })
}

// Função para obter a mensagem de erro apropriada
function getErrorMessage(error) {
     // Verifica se o erro é devido ao email já estar em uso
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    // Retorna a mensagem de erro padrão
    return error.message;
}

// Esta função verifica se os campos de senha e confirmação de senha coincidem e exibe uma mensagem de erro se não coincidirem
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

// Esta função habilita ou desabilita o botão de registro com base em se o formulário é válido ou não
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

// Esta função retorna verdadeiro se todos os campos do formulário forem válidos e falso caso contrário
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    // Obter o elemento de confirmação de senha
    confirmPassword: () => document.getElementById('confirmPassword'),
    // Obter o elemento de erro de confirmação de senha
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    // Obter o elemento de email
    email: () => document.getElementById('email'),
    // Obter o elemento de erro de email inválido
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    // Obter o elemento de erro de email obrigatório
    emailRequiredError: () => document.getElementById('email-required-error'),
    // Obter o elemento de senha
    password: () => document.getElementById('password'),
    // Obter o elemento de erro de comprimento mínimo de senha
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    // Obter o elemento de erro de senha obrigatória
    passwordRequiredError: () => document.getElementById('password-required-error'),
    // Obter o elemento do botão registrar
    registerButton: () => document.getElementById('register-button')
}
function VoltarRegistro() {
    window.history.back()
}