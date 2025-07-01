import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse, PaginatedResponse, User } from '../types';

const API_BASE_URL = 'http://172.16.40.226:3000'; // IP local da máquina

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor para adicionar token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor para tratar erros
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          // Token expirado ou inválido
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          // Redirecionar para login
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ tokenData: { token: string }; currentUser: User }>> {
    return await this.api.post('/user/login', { email, password });
  }

  async register(userData: any): Promise<ApiResponse<any>> {
    return await this.api.post('/user/register', userData);
  }

  async logout(): Promise<void> {
    await this.api.post('/user/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  }

  // User endpoints
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<any>> {
    return await this.api.get(`/user?page=${page}&limit=${limit}`);
  }

  async getUserById(id: string): Promise<ApiResponse<any>> {
    return await this.api.get(`/user/${id}`);
  }

  async updateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return await this.api.put(`/user/${id}`, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<any>> {
    return await this.api.delete(`/user/${id}`);
  }

  // Inventory endpoints
  async getInventories(page = 1, limit = 10): Promise<PaginatedResponse<any>> {
    const response = await this.api.get(`/inventories?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getInventoryById(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/inventories/${id}`);
    return response.data;
  }

  async createInventory(inventoryData: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/inventories', inventoryData);
    return response.data;
  }

  async updateInventory(id: string, inventoryData: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/inventories/${id}`, inventoryData);
    return response.data;
  }

  async deleteInventory(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.delete(`/inventories/${id}`);
    return response.data;
  }

  // Inventory Items endpoints
  async getInventoryItems(inventoryId: string): Promise<ApiResponse<any[]>> {
    const response = await this.api.get(`/inventories/${inventoryId}/items`);
    return response.data;
  }

  async createInventoryItem(inventoryId: string, itemData: any): Promise<ApiResponse<any>> {
    const response = await this.api.post(`/inventories/${inventoryId}/items`, itemData);
    return response.data;
  }

  async updateInventoryItem(inventoryId: string, itemId: string, itemData: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/inventories/${inventoryId}/items/${itemId}`, itemData);
    return response.data;
  }

  async deleteInventoryItem(inventoryId: string, itemId: string): Promise<ApiResponse<any>> {
    const response = await this.api.delete(`/inventories/${inventoryId}/items/${itemId}`);
    return response.data;
  }

  // Categories endpoints
  async getCategories(): Promise<ApiResponse<any[]>> {
    const response = await this.api.get('/categories');
    return response.data;
  }

  async createCategory(categoryData: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/categories', categoryData);
    return response.data;
  }

  async updateCategory(id: string, categoryData: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/categories/${id}`, categoryData);
    return response.data;
  }

  async deleteCategory(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.delete(`/categories/${id}`);
    return response.data;
  }

  // Corporations endpoints
  async getCorporations(): Promise<ApiResponse<any[]>> {
    const response = await this.api.get('/corporations');
    return response.data;
  }

  async createCorporation(corporationData: any): Promise<ApiResponse<any>> {
    const response = await this.api.post('/corporations', corporationData);
    return response.data;
  }

  async updateCorporation(id: string, corporationData: any): Promise<ApiResponse<any>> {
    const response = await this.api.put(`/corporations/${id}`, corporationData);
    return response.data;
  }

  async deleteCorporation(id: string): Promise<ApiResponse<any>> {
    const response = await this.api.delete(`/corporations/${id}`);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService; 