'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Customer, Project } from '@/lib/types';

type Status = 'planned' | 'active' | 'done';

const styles = {
  page: { padding: 24, maxWidth: 800, margin: '0 auto' } as const,
  h1: { margin: 0, fontSize: 28, fontWeight: 800 } as const,
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    background: 'white',
    marginTop: 16,
  } as const,
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } as const,
  field: { display: 'grid', gap: 6 } as const,
  label: { fontWeight: 800 } as const,
  input: { width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e5e7eb' } as const,
  select: { width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e5e7eb' } as const,
  actions: { display: 'flex', gap: 10, marginTop: 14 } as const,
  btn: {
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    background: 'white',
    fontWeight: 800,
    cursor: 'pointer',
  } as const,
  primary: { background: '#111827', color: 'white', border: '1px solid #111827' } as const,
  danger: { color: 'crimson' } as const,
  error: { color: 'crimson', fontWeight: 800 } as const,
  muted: { color: '#6b7280', fontSize: 13 } as const,
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const [project, setProject] = useState<Project | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setError(null);
      setLoading(true);

      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${API_URL}/projects/${projectId}`),
          fetch(`${API_URL}/customers`),
        ]);

        if (!pRes.ok) throw new Error((await pRes.text()) || 'Project not found');
        if (!cRes.ok) throw new Error((await cRes.text()) || 'Failed to load customers');

        setProject((await pRes.json()) as Project);
        setCustomers((await cRes.json()) as Customer[]);
      } catch (e: any) {
        setError(e?.message || 'Failed to load project');
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [API_URL, projectId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!project) return;

    setError(null);

    if (!project.title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: project.title.trim(),
          status: project.status,
          customerId: project.customerId,
        }),
      });

      if (!res.ok) {
        setError((await res.text()) || 'Failed to update project');
        return;
      }

      router.push('/projects');
    } catch {
      setError('Network error. Is the API running?');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!project) return;
    if (!confirm('Delete this project?')) return;

    setError(null);
    setDeleting(true);

    try {
      const res = await fetch(`${API_URL}/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) {
        setError((await res.text()) || 'Failed to delete project');
        return;
      }
      router.push('/projects');
    } catch {
      setError('Network error. Is the API running?');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <main style={styles.page}>Loading…</main>;

  if (!project) {
    return (
      <main style={styles.page}>
        <div style={styles.error}>{error || 'Project not found'}</div>
        <button style={styles.btn} onClick={() => router.push('/projects')}>
          Back
        </button>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.h1}>Edit Project</h1>
      <div style={styles.muted}>
        Project ID: <b>{project.id}</b>
      </div>

      <div style={styles.card}>
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Title</label>
              <input
                style={styles.input}
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                style={styles.select}
                value={project.status}
                onChange={(e) => setProject({ ...project, status: e.target.value as Status })}
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Customer</label>
              <select
                style={styles.select}
                value={project.customerId}
                onChange={(e) => setProject({ ...project, customerId: e.target.value })}
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.actions}>
            <button
              type="submit"
              disabled={saving || deleting}
              style={{ ...styles.btn, ...styles.primary, opacity: saving || deleting ? 0.7 : 1 }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>

            <button
              type="button"
              disabled={saving || deleting}
              style={styles.btn}
              onClick={() => router.push('/projects')}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={saving || deleting}
              style={{ ...styles.btn, ...styles.danger }}
              onClick={remove}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
