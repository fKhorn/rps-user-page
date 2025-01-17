document.addEventListener("DOMContentLoaded", function () {
    const tableUser = document.getElementById("tableAllUsers");
    const currentUserLogin = document.getElementById("currentUserLogin");
    const currentUserRoles = document.getElementById("currentUserRoles");
    const rolesSelect = document.getElementById("rolesNew");
    const formNewUser = document.getElementById("formNewUser");
    const editUserModal = document.getElementById("editUserModal");
    const editUserId = document.getElementById("editUserId");
    const editFirstName = document.getElementById("editFirstName");
    const editPassword = document.getElementById("editPassword");
    const editRoles = document.getElementById("editRoles");

    const apiBaseUrl = "/admin/users"; // URL API
    const apiCurrentUserUrl = "/me"; // Запрос текущего пользователя
    const apiRolesUrl = "/admin/roles"; // URL для загрузки доступных ролей

    // 📌 Получение текущего пользователя
    fetch(apiCurrentUserUrl, { credentials: "include" })
        .then(response => response.json())
        .then(data => {
            currentUserLogin.textContent = data.username;
            currentUserRoles.textContent = data.roles ? data.roles.join(", ") : "Unknown Role";
        })
        .catch(error => {
            currentUserLogin.textContent = "Unknown User";
            currentUserRoles.textContent = "Unknown Role";
        });

    // 📌 Загрузка всех пользователей
    function loadUsers() {
        fetch(apiBaseUrl)
            .then(response => response.json())
            .then(data => {
                tableUser.innerHTML = data.map(user => `
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.username}</td>
                        <td>${user.roles.join(", ")}</td>
                        <td>
<!--                            <button class="btn btn-primary btn-sm edit-user" data-id="${user.id}">Edit</button>-->
                            <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Delete</button>
                        </td>
                    </tr>
                `).join("");

                // Добавляем обработчики кнопок редактирования и удаления
                document.querySelectorAll(".edit-user").forEach(button => {
                    button.addEventListener("click", () => editUser(button.dataset.id));
                });

                document.querySelectorAll(".delete-user").forEach(button => {
                    button.addEventListener("click", () => deleteUser(button.dataset.id));
                });
            })
            .catch(error => {
                console.error("Error loading users:", error);
                tableUser.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Failed to load users</td></tr>`;
            });
    }

    // 📌 Создание нового пользователя
    formNewUser.addEventListener("submit", function (event) {
        event.preventDefault();

        const newUser = {
            firstName: document.getElementById("firstName").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            roles: Array.from(rolesSelect.selectedOptions).map(option => option.value) // ✅ Исправлено
        };

        fetch(apiBaseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || "Failed to create user");
                    });
                }
                return response.json();
            })
            .then(() => {
                formNewUser.reset();
                loadUsers();
                alert("User added successfully!");
            })
            .catch(error => alert("Error adding user: " + error.message));
    });

    // 📌 Удаление пользователя
    function deleteUser(userId) {
        if (!confirm("Вы уверены?")) return;

        fetch(`${apiBaseUrl}/${userId}`, { method: "DELETE" })
            .then(() => {
                alert("ользователь удален!");
                loadUsers();
            })
            .catch(error => alert("Ошибка при удалении: " + error));
    }


    // 📌 Загрузка доступных ролей
    function loadRoles() {
        fetch(apiRolesUrl)
            .then(response => response.json())
            .then(roles => {
                rolesSelect.innerHTML = `<option disabled selected>Выберите роль</option>` +
                    roles.map(role => `<option value="${role.name}">${role.name}</option>`).join("");
            })
            .catch(error => console.error("Ошибка при загрузке ролей:", error));
    }

    // 📌 Редактирование пользователя
    /*function EditUser(userId) {
        fetch(`${apiBaseUrl}/${userId}`)
            .then(response => response.json())
            .then(data => {
                editUserId.value = data.id;
                editFirstName.value = data.firstName;
                editPassword.value = "";
                loadEditRoles(data.roles);
                new bootstrap.Modal(document.getElementById("editUserModal")).show();
            })
            .catch(error => console.error("Error fetching user:", error));
    }

    function loadEditRoles(selectedRoles = []) {
        fetch(apiRolesUrl)
            .then(response => response.json())
            .then(roles => {
                editRoles.innerHTML = roles.map(role => `
                    <option value="${role.name}" ${selectedRoles.includes(role.name) ? "selected" : ""}>
                        ${role.name}
                    </option>
                `).join("");
            })
            .catch(error => console.error("Error loading roles:", error));
    }

    editUserModal.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedUser = {
            firstName: editFirstName.value,
            password: editPassword.value || null,
            roles: Array.from(editRoles.selectedOptions).map(option => option.value)
        };

        fetch(`${apiBaseUrl}/${editUserId.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || "Failed to update user");
                    });
                }
                return response.json();
            })
            .then(() => {
                loadUsers();
                alert("User updated successfully!");
                bootstrap.Modal.getInstance(document.getElementById("editUserModal")).hide();
            })
            .catch(error => alert("Error updating user: " + error.message));
    });*/

    function showLoading() {
        document.getElementById("loadingIndicator").style.display = "block";
    }

    function hideLoading() {
        document.getElementById("loadingIndicator").style.display = "none";
    }


    loadRoles(); // Загружаем роли при загрузке страницы
    loadUsers(); // Загружаем пользователей при загрузке страницы
});
