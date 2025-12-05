 const API_BASE = "http://localhost:5000/api";

export async function apiGet(endpoint: string) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return res.json();
}

export async function apiPost(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
