import Category, { ICategory } from "./Category"

export interface IMenu {
    id?: number
    name?: string
    description?: string
    price?: number
    categoryID?: number
    category?: ICategory
}

class Menu {
    id: number
    name: string
    description: string
    price: number
    categoryID: number
    category: ICategory | undefined

    constructor({ id, name, description, price, categoryID, category }: IMenu) {
        this.id = id ?? 0
        this.name = name ?? ''
        this.description = description ?? ''
        this.price = price ?? 0
        this.categoryID = categoryID ?? 0
        this.category = category ?? undefined
    }

    static fromJson(json: any): Menu {
        const menu = new Menu({})
        menu.id = json.id ?? 0
        menu.name = json.name ?? ''
        menu.description = json.description ?? ''
        menu.price = json.price ?? 0
        menu.categoryID = json.category_id ?? 0
        menu.category = json.category ? Category.fromJson(json.category) : undefined
        return menu
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            category_id: this.categoryID
        }
    }

    getCategoryName(): string {
        return this.category?.name ?? ''
    }

}

export default Menu