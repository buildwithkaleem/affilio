"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Search,
  Eye,
  Trash2,
  CalendarDays,
  Loader2,
  AlertCircle,
  Inbox,
} from "lucide-react";

import {
  getAllContacts,
  deleteContact,
} from "@/lib/contactApi";

export default function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // ========================================
  // FETCH CONTACTS
  // ========================================

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllContacts();

      setContacts(response?.contacts || []);
    } catch (error) {
      console.error(
        "Fetch contacts error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Failed to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ========================================
  // DELETE
  // ========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteContact(id);

      setContacts((prev) =>
        prev.filter((contact) => contact._id !== id)
      );
    } catch (error) {
      console.error(
        "Delete contact error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete contact message."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ========================================
  // SEARCH
  // ========================================

  const filteredContacts = contacts.filter((contact) => {
    const searchValue = search.toLowerCase();

    return (
      contact.name?.toLowerCase().includes(searchValue) ||
      contact.email?.toLowerCase().includes(searchValue) ||
      contact.subject?.toLowerCase().includes(searchValue) ||
      contact.message?.toLowerCase().includes(searchValue)
    );
  });

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Contact Messages
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage messages received from your website visitors.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <Inbox className="h-4 w-4" />
          {contacts.length} Messages
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Empty */}
      {filteredContacts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
          <Mail className="mx-auto h-10 w-10 text-slate-300" />

          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            No contact messages
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {search
              ? "No messages match your search."
              : "You haven't received any contact messages yet."}
          </p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Created
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {contact.name}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        {contact.email}
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="max-w-[250px] px-6 py-4">
                      <div className="truncate text-sm font-medium text-slate-800">
                        {contact.subject}
                      </div>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays className="h-4 w-4" />

                        {new Date(
                          contact.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/contact/${contact._id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(contact._id)
                          }
                          disabled={
                            deletingId === contact._id
                          }
                          className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === contact._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}