'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AddClubPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      meetingTime: formData.get('meetingTime'),
      skillLevel: formData.get('skillLevel'),
      tags: (formData.get('tags') as string)?.split(/[\s,]+/).filter(Boolean) ?? [],
      contactEmail: formData.get('contactEmail'),
      joinLink: formData.get('joinLink'),
    };

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/clubs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(json.error ?? `Submission failed (${res.status})`);
        return;
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit');
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Link
          href="/clubs"
          className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Clubs
        </Link>

        <h1 className="text-2xl font-bold sm:text-3xl">Add a Club</h1>
        <p className="mt-2 text-gray-600">Submit your club for approval. Your submission will be reviewed.</p>

        {status === 'success' && (
          <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-800">
            Thanks! Your club has been submitted for approval.
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-800">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Club name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700">
              Meeting time
            </label>
            <input
              id="meetingTime"
              name="meetingTime"
              type="text"
              placeholder="e.g. Fridays at 5 PM"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
              Skill level
            </label>
            <select
              id="skillLevel"
              name="skillLevel"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All levels">All levels</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma or space separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="e.g. sports, music, tech"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Contact email *
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="joinLink" className="block text-sm font-medium text-gray-700">
              Join link (Discord, email list, etc.)
            </label>
            <input
              id="joinLink"
              name="joinLink"
              type="url"
              placeholder="https://..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="rounded-full bg-red-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting…' : 'Submit for approval'}
            </button>
            <Link
              href="/clubs"
              className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
