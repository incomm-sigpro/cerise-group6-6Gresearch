export interface User {
  id?: string;
  name: string;
  email: string;
  isActive: boolean;
  avatar?: string;
  birthday?: string;
  firstLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Corporation {
  id: string;
  name: string;
  cnpj: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Inventory {
  id: string;
  name: string;
  year: number;
  status: 'PREENCHENDO' | 'ANALISANDO' | 'CONSOLIDADO';
  isActive: boolean;
  userId: string;
  corporationId: string;
  user?: User;
  corporation?: Corporation;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  scope: 'SCOPE_01' | 'SCOPE_02' | 'SCOPE_03';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  scope: 'SCOPE_01' | 'SCOPE_02' | 'SCOPE_03';
  uf: string;
  description?: string;
  quantity: number;
  categoryId: string;
  inventoryId: string;
  isActive: boolean;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  type: 'USER' | 'USER_ADMIN';
  role: 'IS_ADMIN' | 'IS_SUPPORT' | 'IS_CLIENT';
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  ip: string;
  userAgent?: string;
  country?: string;
  region?: string;
  language?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 