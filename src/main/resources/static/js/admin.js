document.addEventListener("DOMContentLoaded", function () {
    const tableUser = document.getElementById("tableAllUsers");
    const currentUserLogin = document.getElementById("currentUserLogin");
    const currentUserRoles = document.getElementById("currentUserRoles");
    const rolesSelect = document.getElementById("rolesNew");

    const apiBaseUrl = "/admin/users"; // Обновляем URL API
    const apiCurrentUserUrl = "/me"; // Запрос текущего пользователя

    // 📌 Получение текущего пользователя
    fetch(apiCurrentUserUrl)
        .then(response => {
            console.log("Raw response:", response);
            if (!response.ok) throw new Error("Failed to fetch current user");
            return response.clone().json() // Используем `clone()`, чтобы избежать `bodyUsed: true`
                .catch(() => response.text());
        })
        .then(data => {
            currentUserLogin.textContent = data.username;
            document.getElementById("currentUserRoles").textContent = data.roles
                ? data.roles.map(role => role).join(", ")
                : "Unknown Role";
        })
        .catch(error => {
            console.error("Error fetching current user:", error);
            currentUserLogin.textContent = "Unknown User";
            currentUserRoles.textContent = "Unknown Role";
        });

    // 📌 Функция загрузки всех пользователей в таблицу
    function loadUsers() {
        fetch(apiBaseUrl)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch users");
                return response.json();
            })
            .then(data => {
                tableUser.innerHTML = data.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.username}</td>
                        <td>${user.roles.map(role => role).join(", ")}</td>
                        <td>
                            <button class="btn btn-primary btn-sm edit-user" data-id="${user.id}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Delete</button>
                        </td>
                    </tr>
                `).join("");
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
            password: document.getElementById("password").value,
            roles: Array.from(document.getElementById("rolesNew").selectedOptions).map(option => option.value)
        };

        fetch(apiBaseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(() => {
                formNewUser.reset();
                loadUsers();
                alert("User added successfully!");
            })
            .catch(error => alert("Error adding user: " + error));
    });

    // 📌 Функция удаления пользователя
    function deleteUser(userId) {
        if (!confirm("Are you sure you want to delete this user?")) return;

        fetch(`${apiBaseUrl}/${userId}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("User deleted successfully!");
                loadUsers();
            })
            .catch(error => alert("Error deleting user: " + error));
    }

    // 📌 Функция редактирования пользователя
    function editUser(userId) {
        const newName = prompt("Enter new first name:");
        if (!newName) return;

        fetch(`${apiBaseUrl}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName: newName })
        })
            .then(() => {
                alert("User updated successfully!");
                loadUsers();
            })
            .catch(error => alert("Error updating user: " + error));
    }

    loadUsers(); // Загружаем пользователей при загрузке страницы

    // 📌 Функция загрузки доступных ролей
    function loadRoles() {
        fetch("/admin/roles")
            .then(response => response.json())
            .then(roles => {
                rolesSelect.innerHTML = roles.map(role => `
                    <option value="${role.name}">${role.name}</option>
                `).join("");
            })
            .catch(error => console.error("Error loading roles:", error));
    }
});