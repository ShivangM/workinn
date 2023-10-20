interface APIResponse<T> {
    data: T
    total: number
    pageTotal?: number
}

interface BreadcrumLink {
    name: string
    link: string
}