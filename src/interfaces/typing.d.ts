interface APIResponse<T> {
    data: T
    total: number
    pageTotal?: number
}