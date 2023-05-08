
/// Verifica se um endereço de email é válido usando uma expressão regular
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "pages/home/home.html";
    }
})

  
  
  // Mostrar ou esconder os erros de email
  function toggleEmailErrors() {
    const email = document.getElementById("email").value;
    const emailRequiredError = document.getElementById("email-required-error");
    const emailInvalidError = document.getElementById("email-invalid-error");
  
    if (!email) {
      emailRequiredError.style.display = "block";
      emailInvalidError.style.display = "none";
    } else if (!validateEmail(email)) {
      emailRequiredError.style.display = "none";
      emailInvalidError.style.display = "block";
    } else {
      emailRequiredError.style.display = "none";
      emailInvalidError.style.display = "none";
    }
  }
  
  // Verifica se a senha é válida
  function isPasswordValid() {
    const password = document.getElementById("password").value;
    return password !== "";
  }
  
  // Alternar botões desabilitados
  function toggleButtonsDisabled() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const recoverPasswordButton = document.getElementById("recover-password-button");
    const loginButton = document.getElementById("login-button");
  
    const emailIsValid = validateEmail(email);
    const passwordIsValid = isPasswordValid();
  
    recoverPasswordButton.disabled = !emailIsValid;
    loginButton.disabled = !emailIsValid || !passwordIsValid;
  }
  
  // Mostrar ou esconder os erros de senha
  function togglePasswordErrors() {
    const password = document.getElementById("password").value;
    const passwordRequiredError = document.getElementById("password-required-error");
  
    if (!password) {
      passwordRequiredError.style.display = "block";
    } else {
      passwordRequiredError.style.display = "none";
    }
  }

  //Função login para tela home
  function login(){
    
   
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() =>{
      window.location.href = "pages/home/home.html";

    }).catch(error => {
      alert(getErrorMessage(error));

    });
   
  }

  //Função de Resgistrar para tela de registro
  function register(){
    window.location.href = "pages/register/register.html"
  }


  
// Função para obter a mensagem de erro com base no código de erro retornado
function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
      return "Usuário nao encontrado";
  }
  if (error.code == "auth/wrong-password") {
      return "Senha inválida";
  }

}

  //Função para Recuperar a senha 
function recoverPassword() {
    
  firebase.auth().sendPasswordResetEmail(email.value).then(() => {
      alert('Email enviado com sucesso');
  }).catch(error => {
      alert(getErrorMessage(error));
  });
 
}
  
  
  // Verifica se o email é válido
  function isEmailValid() {
    const email = document.getElementById("email").value;
    return validateEmail(email);// Se o campo do email estiver vazio, retorna falso
  }
  
  // Funções a serem chamadas no evento onChange
  function onChangeEmail() {
    toggleButtonsDisabled();// Desabilita ou habilita os botões dependendo se o email e a senha são válidos
    toggleEmailErrors();// Exibe ou oculta os erros relacionados ao email

  }
  
  function onChangePassword() {
    toggleButtonsDisabled();// Desabilita ou habilita os botões dependendo se o email e a senha são válidos
    togglePasswordErrors();// Exibe ou oculta os erros relacionados à senha

  }
  