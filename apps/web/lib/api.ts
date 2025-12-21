import type { Customer, Project } from './types';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/* ---------------- Customers ---------------- */

export async function getCustomers(): Promise<Customer[]> {
  const res = await fetch(`${API_URL}/customers`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch customers');
  }

  return res.json();
}

/* ---------------- Projects ---------------- */

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  return res.json();
}

export async function createProject(data: {
  title: string;
  status: 'planned' | 'active' | 'done';
  customerId: string;
}): Promise<Project> {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok && res.status !== 204) {
    throw new Error('Failed to delete project');
  }
}
