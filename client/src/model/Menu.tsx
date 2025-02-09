import Category, { ICategory } from "./Category"

export interface IMenu {
    id: number
    name: string
    description: string
    price: number
    category: ICategory
}

class Menu implements IMenu {
    id: number
    name: string
    description: string
    price: number
    category: ICategory

    constructor({ id, name, description, price, category }: IMenu) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.category = Category.fromJson(category)
    }

    static fromJson(json: IMenu): Menu {
        return new Menu(json)
    }

    getCategoryName(): string {
        return this.category.name
    }

}

export default Menu