import { User } from "@/types";

const API_URL = "https://rental-prime-backend.onrender.com/users";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiYWRtaW5fdXNlcl90eXBlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3NDY2OTU4NTUsImV4cCI6MTc0Njc4MjI1NX0.X3-1vpvUVOCPkqeHgd0iLJ49gL6Y5gM_-CYbi8UBisU";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AUTH_TOKEN}`,
};

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const users = await response.json();
  return users.map((user: any) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.user_type,
    status: "active", // Default status since it's not in the API
    lastActive: new Date().toLocaleDateString(), // Default date since it's not in the API
    avatar: "/placeholder.svg" // Default avatar since it's not in the API
  }));
}

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  user_type: "Owner" | "Renter";
}): Promise<User> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  const user = await response.json();
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.user_type,
    status: "active",
    lastActive: new Date().toLocaleDateString(),
    avatar: "/placeholder.svg"
  };
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}
