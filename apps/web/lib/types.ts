export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type Project = {
  id: string;
  title: string;
  status: 'planned' | 'active' | 'done';
  customerId: string;
};
