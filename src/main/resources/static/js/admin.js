document.addEventListener("DOMContentLoaded", function () {
    const tableUser = document.getElementById("tableAllUsers");
    const currentUserLogin = document.getElementById("currentUserLogin");
    const currentUserRoles = document.getElementById("currentUserRoles");

    const apiBaseUrl = "http://localhost:8080/admin/users";
    const apiRolesUrl = "http://localhost:8080/admin/users/roles";

    // Заполняем данные текущего пользователя
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(data => {
            let currentUser = data.find(user => user.username === currentUserLogin.innerText);
            if (currentUser) {
                currentUserRoles.textContent = currentUser.roles.map(role => role.name.substring(5)).join(", ");
            }
        });

    // Заполняем таблицу пользователей
    function fillUsersTable() {
        fetch(apiBaseUrl)
            .then(response => response.json())
            .then(data => {
                tableUser.innerHTML = data.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.username}</td>
                        <td>${user.roles.map(role => role.name.substring(5)).join(", ")}</td>
                        <td>
                            <button class="btn btn-primary btn-sm edit-user" data-id="${user.id}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Delete</button>
                        </td>
                    </tr>
                `).join("");
            });
    }

    fillUsersTable();

    // Добавление нового пользователя
    document.getElementById("formNewUser").addEventListener("submit", function (e) {
        e.preventDefault();

        const newUser = {
            firstName: document.getElementById("firstName").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            roles: Array.from(document.getElementById("rolesNew").selectedOptions).map(option => ({
                name: "ROLE_" + option.innerText
            }))
        };

        fetch(apiBaseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (response.ok) {
                fillUsersTable();
                document.getElementById("formNewUser").reset();
                alert("User added successfully!");
            } else {
                alert("Error adding user.");
            }
        });
    });
});


/*document.addEventListener("DOMContentLoaded", () => {
    // Загрузка текущего пользователя
    fetch('/api/users/me')
        .then(response => response.json())
        .then(user => {
            document.getElementById('current-user-name').textContent = `${user.firstName} ${user.lastName}`
        })

    // Загрузка всех пользователей
    fetch('/api/users/all')
        .then(response => response.json())
        .then(users => {
            const usersTable = document.getElementById('users-table-body')
            users.forEach(user => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.join(", ")}</td>
                `
                usersTable.appendChild(row);
            })
        })
})
function logout() {
    window.location.href = '/logout';
}*/

/*
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
            url: '/api/admin/users/' + userId,
            type: 'DELETE',
            success: function () {
                alert('User deleted successfully!');
                location.reload();
            },
            error: function (xhr) {
                alert('Failed to delete user: ' + xhr.responseText);
            }
        });
    }
}*/

