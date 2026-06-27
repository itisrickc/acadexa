"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function updateProfile() {
  if (!name.trim()) {
    alert("Please enter your name.");
    return;
  }

  const res = await fetch("/api/settings/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Profile updated successfully!");
}

  async function changePassword() {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const res = await fetch("/api/settings/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Password changed successfully!");

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
}

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-gray-500">
          Manage your ACADEXA account.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          👤 Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>

            <input
              className="w-full rounded-lg border px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <button
            onClick={updateProfile}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          🔒 Security
        </h2>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full rounded-lg border px-4 py-2"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-lg border px-4 py-2"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border px-4 py-2"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button
            onClick={changePassword}
            className="rounded-lg bg-green-600 px-5 py-2 text-white"
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          ℹ️ About
        </h2>

        <p className="text-gray-700">
          <strong>ACADEXA v1.0</strong>
        </p>

        <p className="mt-2 text-gray-500">
          Powered by ACADEXA AI
        </p>

        <p className="mt-1 text-gray-500">
          Built & Designed by @itisrickc
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          🚪 Session
        </h2>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-lg bg-red-600 px-5 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}