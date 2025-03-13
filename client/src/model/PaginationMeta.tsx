export interface IPaginationMeta {
    limit?: number
    total?: number
    current?: number
}

class PaginationMeta implements IPaginationMeta {
    limit: number
    total: number
    current: number

    constructor({ limit, total, current }: IPaginationMeta) {
        this.limit = limit ?? 0
        this.total = total ?? 0
        this.current = current ?? 1
    }

    static fromJson(json: any): PaginationMeta {
        const paginationMeta = new PaginationMeta({})
        paginationMeta.limit = json.limit ?? 0
        paginationMeta.total = json.total ?? 0
        return paginationMeta
    }

    setCurrent(current: number) {
        this.current = current
    }


}

export default PaginationMeta