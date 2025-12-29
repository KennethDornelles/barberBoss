
import apiClient from './apiClient';

export interface Client {
	id: string;
	name: string;
	phone: string;
	email?: string;
}

export interface PaginatedClients {
	data: Client[];
	total: number;
}

export const usersService = {
	async getClients(search = ''): Promise<Client[]> {
		const params: any = { role: 'CLIENT', limit: 100 };
		if (search) params.search = search;
		const res = await apiClient.get('/users', { params });
		if (res.data && Array.isArray(res.data.users)) return res.data.users;
		if (Array.isArray(res.data)) return res.data;
		return res.data?.data || [];
	},


	async createClient(data: { name: string; phone: string }): Promise<Client> {
		try {
			const res = await apiClient.post('/users', { ...data, role: 'CLIENT' });
			return res.data;
		} catch (error: any) {
			throw new Error(error?.message || 'Erro ao criar cliente');
		}
	},


	async updateClient(id: string, data: { name: string; phone: string }): Promise<Client> {
		try {
			const res = await apiClient.patch(`/users/${id}`, data);
			return res.data;
		} catch (error: any) {
			throw new Error(error?.message || 'Erro ao atualizar cliente');
		}
	},

	async deleteClient(id: string): Promise<void> {
		await apiClient.delete(`/users/${id}`);
	},
};
