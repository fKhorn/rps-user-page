document.addEventListener("DOMContentLoaded", function () {
    const editUserForm = document.getElementById("editUserForm");
    const currentUserLogin = document.getElementById("currentUserLogin");
    const currentUserRoles = document.getElementById("currentUserRoles");

    const apiCurrentUserUrl = "/me"; // Запрос текущего пользователя

    // 📌 Получение текущего пользователя
    fetch(apiCurrentUserUrl, { credentials: "include" })
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch current user");
            return response.json();
        })
        .then(data => {
            document.getElementById("editUserId").value = data.id;
            document.getElementById("editFirstName").value = data.firstName;
            document.getElementById("editEmail").value = data.email;

            currentUserLogin.textContent = data.username;
            currentUserRoles.textContent = data.roles ? data.roles.join(", ") : "Unknown Role";
        })
        .catch(error => {
            console.error("Error fetching current user:", error);
            currentUserLogin.textContent = "Unknown User";
            currentUserRoles.textContent = "Unknown Role";
        });

    // 📌 Обновление данных пользователя
    editUserForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedUser = {
            firstName: document.getElementById("editFirstName").value,
            email: document.getElementById("editEmail").value,
            password: document.getElementById("editPassword").value || null
        };

        fetch(`/users/${document.getElementById("editUserId").value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(response => response.json())
            .then(() => {
                alert("Данные успешно обновлены!");
                location.reload();
            })
            .catch(error => alert("Ошибка обновления данных: " + error));
    });
});
