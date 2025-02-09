export interface ICategory {
    id: number
    name: string
}

class Category implements ICategory {
    id: number
    name: string

    constructor({ id, name }: ICategory) {
        this.id = id
        this.name = name
    }

    static fromJson(json: ICategory): Category {
        return new Category(json)
    }
}

export default Category