"use client";

import { useState } from "react";
import Link from "next/link";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <Logo />
          <p className="mt-3 text-slate-500">
            Create your account 🚀
          </p>
        </div>

        <form
  className="space-y-5"
  onSubmit={async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Account created successfully!");
    window.location.href = "/login";
  }}
>
  <Input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <Input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <Input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <Button
    type="submit"
    className="w-full"
  >
    Create Account
  </Button>
</form>

        <p className="mt-6 text-center text-slate-500">
          Already have an account?
          <Link
            href="/login"
            className="ml-2 font-semibold text-blue-600"
          >
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}