'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://13.60.17.29';

export default function EditProjectPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('planned');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;

      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();

      const project = data.find((p: any) => p.id === id);

      if (project) {
        setTitle(project.title);
        setStatus(project.status);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  async function handleUpdate() {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status }),
    });

    if (!res.ok) {
      alert('Update failed');
      return;
    }

    alert('Project updated!');
  }

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Edit Project</h1>

      <div style={{ marginTop: 20 }}>
        <label>Title</label>
        <br />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Status</label>
        <br />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button onClick={handleUpdate} style={{ marginTop: 20 }}>
        Update Project
      </button>

      <div style={{ marginTop: 20 }}>
        <Link href="/projects">← Back</Link>
      </div>
    </main>
  );
}