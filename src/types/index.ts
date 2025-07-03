export interface ServiceItem {
    id: number
    title: string
    description: string
    icon: string
}

export interface ProductItem {
    id: number
    title: string
    description: string
    image: string
}

export interface ProjectItem {
    id: number
    title: string
    category: string
    image: string
}

export interface BlogTag {
    id: number
    name: string
}

export interface BlogArticle {
    id: number
    title: string
    excerpt: string
    date: string
    tags: number[]
}

export interface TeamMember {
    id: number
    name: string
    role: string
    image: string
    linkedin: string
}
