"use server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify, errors } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(key);
}

export async function decrypt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      console.log("Token has expired");
      return null; // Return null if the token has expired
    } else {
      throw error; // Rethrow other errors
    }
  }
}

export async function login(formData: FormData) {
  // Verify credentials & get the user (Replace with real logic)
  const username = formData.get("username");
  const password = formData.get("password");
  const user = { name: username };

  // Create the token
  const token = await encrypt({ user });

  // Save the token in a cookie
  cookies().set("token", token, { httpOnly: true });
  return { success: true, message: "Login successful!", token };
}

export async function getSession() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return await decrypt(token);
}

export async function logout() {
  // Destroy the token
  cookies().set("token", "", { expires: new Date(0) });
  return { success: true, message: "Logout successful!" };
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return;

  // Refresh the token so it doesn't expire
  const parsed = await decrypt(token);
  if (parsed) {
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "token",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
}
