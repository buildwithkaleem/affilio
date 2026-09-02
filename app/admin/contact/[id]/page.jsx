"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  MessageSquare,
  CalendarDays,
  Clock3,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  getSingleContact,
  deleteContact,
} from "@/lib/contactApi";

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const id = params?.id;

  // ========================================
  // FETCH CONTACT
  // ========================================

  useEffect(() => {
    if (!id) return;

    const fetchContact = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getSingleContact(id);

        setContact(response?.contact || null);
      } catch (error) {
        console.error(
          "Fetch contact error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          "Failed to load contact message."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  // ========================================
  // DELETE
  // ========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteContact(id);

      router.replace("/admin/contact");
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
      setDeleting(false);
    }
  };

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

  // ========================================
  // ERROR / NOT FOUND
  // ========================================

  if (error || !contact) {
    return (
      <div className="space-y-5">
        <Link
          href="/admin/contact"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Contact Messages
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error || "Contact message not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/contact"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Contact Messages
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}

          Delete
        </button>
      </div>

      {/* Message Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Mail className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-900">
                {contact.subject}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />

                  {new Date(
                    contact.createdAt
                  ).toLocaleString()}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />

                  Updated:{" "}
                  {new Date(
                    contact.updatedAt
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sender */}
        <div className="grid gap-6 border-b border-slate-200 px-6 py-6 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Name
            </p>

            <div className="flex items-center gap-3 text-sm font-medium text-slate-800">
              <User className="h-5 w-5 text-slate-400" />
              {contact.name}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </p>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-sm font-medium text-blue-600 hover:underline"
            >
              <Mail className="h-5 w-5 text-slate-400" />
              {contact.email}
            </a>
          </div>
        </div>

        {/* Message */}
        <div className="px-6 py-8 sm:px-8">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-slate-400" />

            <h2 className="text-sm font-semibold text-slate-700">
              Message
            </h2>
          </div>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {contact.message}
          </div>
        </div>
      </div>
    </div>
  );
}