const api = "http://localhost:8080";

export function getToken() {
    return localStorage.getItem("token") || false;
}

export async function login(email, password) {
    const res = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
    });
    
    if(!res.ok) return false;

    let result = await res.json();
    localStorage.setItem("token", result.token);

    return result;
}

export async function register(name, email, password) {
    const res = await fetch(`${api}/register`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ name, email, password }),
    });

    if(!res.ok) return false;

    let user = await res.json();
    return user;
}

export async function fetchUser() {
    const token = getToken();

    if(!token) return false;

    const res = await fetch(`${api}/user`,{
        headers: {
            "authorization": `Bearer ${token}`,
        },
    });

    if(!res.ok) return false;

    let result = await res.json();
    return result;
}

export async function getUser(id) {
    const res = await fetch(`${api}/user/${id}`);

	if (!res.ok) return false;

    let result = await res.json();
    return result;
}

export async function getProducts() {
    const res = await fetch(`${api}/products`);

    if(!res.ok) return false;

    const result = await res.json();
    return result;
}

export async function getProduct(id) {
    const res = await fetch(`${api}/products/${id}`);

    if(!res.ok) return false;

    const result = await res.json();
    return result;

}

