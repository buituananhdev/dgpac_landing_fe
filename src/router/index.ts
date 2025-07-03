import { createRouter, createWebHistory } from 'vue-router'

export enum RoutePrefix {
    Default = '',
    Auth = '/auth',
    Admin = '/admin'
}

export enum RoutePath {
    Home = RoutePrefix.Default + '/',
    Projects = RoutePrefix.Default + '/projects',
    Login = RoutePrefix.Auth + '/login',
    ProjectManage = RoutePrefix.Admin + '/project-manage',
    ProductManage = RoutePrefix.Admin + '/product-manage',
    ContactManage = RoutePrefix.Admin + '/contact-manage'
}

export const PUBLIC_ROUTE_PATHS: string[] = [RoutePath.Home]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: RoutePrefix.Default,
            children: [
                {
                    path: RoutePath.Home,
                    name: 'home',
                    component: () => import('../views/Home.vue'),
                    meta: {
                        layout: 'landing-page'
                    }
                },
                {
                    path: RoutePath.Projects,
                    name: 'projects',
                    component: () => import('../views/FindProject.vue'),
                    meta: {
                        layout: 'landing-page'
                    }
                }
            ]
        },
        {
            path: RoutePrefix.Auth,
            children: [
                {
                    path: RoutePath.Login,
                    name: 'login',
                    component: () => import('../views/Login.vue'),
                    meta: {
                        layout: 'landing-page'
                    }
                }
            ]
        },
        {
            path: RoutePrefix.Admin,
            children: [
                {
                    path: RoutePath.ProductManage,
                    name: 'product-manage',
                    component: () => import('../views/admin/ProductManage.vue'),
                    meta: {
                        layout: 'landing-page'
                    }
                },
                {
                    path: RoutePath.ProjectManage,
                    name: 'project-manage',
                    component: () => import('../views/admin/ProjectManage.vue'),
                    meta: {
                        layout: 'landing-page'
                    }
                },
                {
                    path: RoutePath.ContactManage,
                    name: 'contact-manage',
                    component: () => import('../views/admin/ContactManage.vue'),
                    meta: {
                        layout: 'landing-page'
                    }
                }
            ]
        }
    ]
})

export default router
