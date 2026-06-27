"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      alert("Invalid email or password.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <Card className="w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <Logo />

          <p className="mt-3 text-slate-500">
            Welcome Back 👋
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Don't have an account?

          <Link
            href="/signup"
            className="ml-2 font-semibold text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </Card>
    </main>
  );
}