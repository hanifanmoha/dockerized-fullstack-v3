export interface ICategory {
    id?: number
    name?: string
}

class Category implements ICategory {
    id: number
    name: string

    constructor({ id, name }: ICategory) {
        this.id = id ?? 0
        this.name = name ?? ''
    }

    static fromJson(json: any): Category {
        const category = new Category({})
        category.id = json.id ?? 0
        category.name = json.name ?? ''
        return category
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name
        }
    }
}

export default Category