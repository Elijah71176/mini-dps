'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  status: 'planned' | 'active' | 'done';
  customerId: string;
};

type Customer = {
  id: string;
  name: string;
  email: string;
};

const styles = {
  page: { padding: 24, maxWidth: 1100, margin: '0 auto' } as const,
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  } as const,
  h1: { margin: 0, fontSize: 28, fontWeight: 800 } as const,
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    background: 'white',
  } as const,
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  } as const,
  buttonLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    textDecoration: 'none',
    fontWeight: 700,
  } as const,
  smallMuted: { color: '#6b7280', fontSize: 13 } as const,
  tableWrap: { overflowX: 'auto' } as const,
  table: { width: '100%', borderCollapse: 'collapse' } as const,
  th: {
    textAlign: 'left',
    padding: 10,
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 800,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#374151',
  } as const,
  td: { padding: 10, borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' } as const,
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: 999,
    border: '1px solid #e5e7eb',
    fontWeight: 800,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  } as const,
  actions: { display: 'flex', gap: 10, alignItems: 'center' } as const,
  actionLink: { fontWeight: 800, textDecoration: 'none' } as const,
  dangerBtn: {
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: '6px 10px',
    background: 'white',
    fontWeight: 800,
    cursor: 'pointer',
  } as const,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    async function load() {
      setError(null);
      setLoading(true);
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/customers`),
        ]);

        if (!pRes.ok) throw new Error(await pRes.text());
        if (!cRes.ok) throw new Error(await cRes.text());

        const pData = (await pRes.json()) as Project[];
        const cData = (await cRes.json()) as Customer[];

        setProjects(pData);
        setCustomers(cData);
      } catch (e: any) {
        setError(e?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [API_URL]);

  const customerMap = useMemo(() => new Map(customers.map((c) => [c.id, c])), [customers]);

  async function deleteProject(id: string) {
    const ok = confirm('Delete this project?');
    if (!ok) return;

    const res = await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) {
      alert('Delete failed');
      return;
    }

    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Projects</h1>
        <Link href="/projects/new" style={styles.buttonLink}>
          + New Project
        </Link>
      </div>

      <div style={styles.card}>
        <div style={styles.topRow}>
          <div>
            <div style={{ fontWeight: 800 }}>Dashboard</div>
            <div style={styles.smallMuted}>View, edit and delete projects</div>
          </div>
          <div style={styles.smallMuted}>
            API: <b>{API_URL}</b>
          </div>
        </div>

        {loading && <div>Loading…</div>}

        {!loading && error && (
          <div style={{ color: 'crimson', fontWeight: 800 }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Customer</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const c = customerMap.get(p.customerId);
                  const customerLabel = c ? `${c.name} (${c.email})` : p.customerId;

                  return (
                    <tr key={p.id}>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 800 }}>{p.title}</div>
                        <div style={styles.smallMuted}>{p.id}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.badge}>{p.status}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 800 }}>{customerLabel}</div>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <div style={styles.actions}>
                            <Link href={`/projects/${p.id}/edit`} style={styles.actionLink}>
                              Edit
                            </Link>
                            <button style={styles.dangerBtn} onClick={() => deleteProject(p.id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {projects.length === 0 && (
                  <tr>
                    <td colSpan={4} style={styles.td}>
                      <div style={{ fontWeight: 800 }}>No projects yet.</div>
                      <div style={styles.smallMuted}>
                        Click <b>New Project</b> to create one.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
