
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "away" | "offline" | "blocked";
  role: string;
  lastActive: string;
}
