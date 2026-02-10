

"use client";

import { useEffect, useState } from "react";
import { changePassword } from "@/lib/api/auth-api";
import { deactivateAccount, updateAccount, getAccount } from "@/lib/api/account-api";



export default function MyAccountPage() {

const [email, setEmail] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

useEffect(() => {
  const loadAccount = async () => {
    const data = await getAccount();
    setEmail(data?.email ?? "");
  };

  loadAccount();
}, []);


const handlePasswordUpdate = async () => {
  if (newPassword.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  if (!/[A-Z]/.test(newPassword)) {
    alert("Must contain at least one uppercase letter");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  await changePassword({ currentPassword, newPassword });
  alert("Password updated successfully");

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
};

const handleSaveChanges = async () => {
  try {
    await updateAccount({ email });
    alert("Account details updated successfully");
  } catch (err: any) {
    alert(err.message || "Failed to update account");
  }
};

  return (
    <div className="flex gap-6">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white rounded-lg shadow p-4 h-fit">
        <h3 className="text-xs font-semibold text-gray-500 mb-3">
          MANAGE ACCOUNT
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="bg-blue-50 text-blue-600 px-3 py-2 rounded font-medium">
            Profile Settings
          </li>
          <li className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
            Saved Addresses
          </li>
          <li className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
            Payment Methods
          </li>
          <li className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
            Notifications
          </li>
          <li className="px-3 py-2 rounded text-red-500 hover:bg-red-50 cursor-pointer">
            Sign Out
          </li>
        </ul>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your personal information and security preferences.
        </p>

        {/* PERSONAL DETAILS */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="font-semibold">Personal Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Full Name</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Retail Customer"
              />
            </div>

            <div>
              <label className="text-sm">Email Address</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@islandlink.com"
              />
            </div>

            <div>
              <label className="text-sm">Phone Number</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="+1 (555) 000-1234"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm">Default Shipping Address</label>
              <textarea
                className="w-full border rounded px-3 py-2 mt-1"
                rows={3}
                placeholder="123 Harbor View Road, Central Port District, Island State"
              />
            </div>
          </div>

          <button
  onClick={handleSaveChanges}
  className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
>
  Save Changes
</button>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="font-semibold">Change Password</h2>
          <p className="text-sm text-black-400 mt-1">
            Ensure your account is using a long, random password to stay secure. Your password should be at least 8 characters with an Uppercase character.
          </p>

          <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          />

           <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          />

          <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          />


          <button
          onClick={handlePasswordUpdate}
          className="bg-black text-white px-4 py-2 rounded"
           >
          Update Password
          </button>
        </div>

        {/* DEACTIVATE */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="font-semibold text-red-600">Deactivate Account</h2>
          <p className="text-sm text-red-500 mt-1">
            Once you deactivate your account, there is no going back. Please be certain.
          </p>

          <button
  onClick={async () => {
    if (confirm("Are you sure? This cannot be undone.")) {
      await deactivateAccount();
      alert("Account deactivated");
    }
  }}
  className="border border-red-400 text-red-600 px-4 py-2 rounded mt-3"
  >
  Deactivate Account
</button>
        </div>
      </div>
    </div>
  );
}