import VueRouter from "vue-router";
import Vue from 'vue';
import BookList from '../components/BookList'
import MagazineList from '../components/MagazineList'
import List from '../components/List'
import Sort from '../components/SortDocs'
import AddMagazine from '../components/AddMagazine'
import AddBook from '../components/AddBook'
import KnightPositions from '../components/KnightPositions'

Vue.use(VueRouter);

const routes = [
    {
        path: '/book_list',
        name: 'BookList',
        component: BookList
    },
    {
        path: '/magazine_list',
        name: 'MagazineList',
        component: MagazineList
    },
    {
        path: '/',
        name: 'Listview',
        component: List
    },
    {
        path: '/sort',
        name: 'SortDocs',
        component: Sort
    },
    {
        path: '/add_magazine',
        name: 'AddDoc',
        component: AddMagazine
    },
    {
        path: '/add_book',
        name: 'AddBook',
        component: AddBook
    },
    {
        path: '/positions',
        name: 'KnightPositions',
        component: KnightPositions
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;