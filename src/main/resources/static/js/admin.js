document.addEventListener("DOMContentLoaded", () => {
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
}

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

