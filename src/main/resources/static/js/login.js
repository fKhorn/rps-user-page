document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");
    const spinner = document.getElementById("spinner");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("toggle-password");

    // Показать/скрыть пароль
    togglePasswordBtn.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordBtn.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePasswordBtn.textContent = "👁";
        }
    });

    // Показываем индикатор загрузки при отправке формы
    loginBtn.addEventListener("click", function () {
        spinner.style.display = "block";
    });
});