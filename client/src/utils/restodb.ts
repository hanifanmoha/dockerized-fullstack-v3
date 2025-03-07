import axios from "axios";
import Menu from "../model/Menu";
import Category from "../model/Category";

interface Response {
    success: boolean
    message: string
    error: string
    data: any
}

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
});

export const getCategories = async (): Promise<Category[]> => {
    const response = await axiosInstance.get("/categories");
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return data.data.map((category: any) => Category.fromJson(category));
};

export const getCategory = async (id: number): Promise<Category> => {
    const response = await axiosInstance.get(`/categories/${id}`);
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return Category.fromJson(data.data);
};

export const saveCategory = async (category: Category): Promise<Category> => {
    const response = await axiosInstance.post("/categories", category);
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return Category.fromJson(data.data);
};

export const updateCategory = async (category: Category): Promise<Category> => {
    const response = await axiosInstance.put(`/categories/${category.id}`, category);
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return Category.fromJson(data.data);
};

export const deleteCategory = async (id: number): Promise<void> => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
};

export const getMenus = async (): Promise<Menu[]> => {
    const response = await axiosInstance.get("/menus");
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return data.data.map((menu: any) => Menu.fromJson(menu));
};

export const getMenu = async (id: number): Promise<Menu> => {
    const response = await axiosInstance.get(`/menus/${id}`);
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return Menu.fromJson(data.data);
};

export const saveMenu = async (menu: Menu): Promise<Menu> => {
    const response = await axiosInstance.post("/menus", menu.toJson());
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return Menu.fromJson(data.data);
};

export const updateMenu = async (menu: Menu): Promise<Menu> => {
    const response = await axiosInstance.put(`/menus/${menu.id}`, menu.toJson());
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
    return Menu.fromJson(data.data);
};

export const deleteMenu = async (id: number) => {
    const response = await axiosInstance.delete(`/menus/${id}`);
    const data = response.data as Response
    if (!data.success) {
        throw new Error(data.error)
    }
};

