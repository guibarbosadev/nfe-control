import { User, UserCredentials } from "../store/auth/authTypes";
import bcrypt from "bcryptjs";

const dbKeys = {
  users: "users",
  loggedInUser: "logged_in_user",
};

function getUsersOnDB() {
  let users: User[] = [];

  try {
    users = (JSON.parse(localStorage.getItem(dbKeys.users) ?? "") ||
      []) as User[];
  } catch {
    users = [];
  }

  return users;
}

export async function login(credentials: UserCredentials) {
  const users = getUsersOnDB();
  const user = users.find(({ email, password }) => {
    const doEmailMatches = credentials.email === email;
    const doPasswordMatches =
      doEmailMatches && bcrypt.compareSync(credentials.password, password);

    return doEmailMatches && doPasswordMatches;
  });

  if (!user) {
    throw new Error("Invalid email/password");
  }

  localStorage.setItem(dbKeys.loggedInUser, credentials.email);

  return user;
}

function encryptPassword(uncryptedPassword: string) {
  const saltRound = 10;
  const encryptedPassword = bcrypt.hashSync(uncryptedPassword, saltRound);

  return encryptedPassword;
}

export async function signUp(user: User) {
  const users = getUsersOnDB();
  const isAlreadySigned = users.some(({ email }) => user.email === email);

  if (isAlreadySigned) {
    throw new Error("E-mail already used");
  }

  const password = encryptPassword(user.password);
  const userOnDb: User = { ...user, password };
  const updatedUsers = users.concat(userOnDb);
  const stringifiedUsers = JSON.stringify(updatedUsers);

  localStorage.setItem(dbKeys.users, stringifiedUsers);
  localStorage.setItem(dbKeys.loggedInUser, userOnDb.email);

  return userOnDb;
}

export async function getLoggedInUser() {
  const email = localStorage.getItem(dbKeys.loggedInUser);
  const isLoggedIn = Boolean(email);
  let user: User | null = null;

  if (isLoggedIn) {
    const users = getUsersOnDB();
    user = users.find((currentUser) => currentUser.email === email) ?? null;
  }

  return user;
}

export async function logout() {
  localStorage.setItem("logged_in_user", "");
}
