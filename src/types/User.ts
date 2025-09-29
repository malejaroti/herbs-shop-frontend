export interface IUser {
    user_id: string
    firstName: string
    lastName: string
    email: string;
    password: string;
    role: "admin" | "customer"
}

