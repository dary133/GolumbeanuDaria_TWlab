
/* Exercitiul 3 */

const API_URL = 'https://jsonplaceholder.typicode.com';

// Preia lista de utilizatori
export async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

// Preia un utilizator dupa ID
export async function fetchUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}
