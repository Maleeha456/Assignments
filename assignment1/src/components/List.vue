<template>
    <div id="app">
        <h2>Library Portal</h2>
        <p>Listing the details:</p>
        <router-link :to="'/book_list'"
            class="btn btn-small waves-effect waves-light indigo ">
            List Books
        </router-link>
        &nbsp;&nbsp;
        <router-link :to="'/magazine_list'"
            class="btn btn-small waves-effect waves-light indigo">
            List Magazines
        </router-link>
        <br />
        <p>Sort the Documents</p>
        <router-link :to="'/sort'"
            class="btn btn-small waves-effect waves-light indigo">
           Sort
        </router-link>
        <br />
        <p>Add New Document</p>
        <router-link :to="'/add_magazine'"
            class="btn btn-small waves-effect waves-light indigo">
           Add Magazine
        </router-link>
        &nbsp;&nbsp;
        <router-link :to="'/add_book'"
            class="btn btn-small waves-effect waves-light indigo">
           Add Book
        </router-link>
        <br />
        <p>Search for the items:</p>
        <div>
            <label>Seach for the book/magazine using ISBN number</label>
            <input type="text" id="search_by_isbn">
            <button @click="searchByISBN">Search</button>
            <div v-if="list != ''">
                <table>
                    <thead>
                        <tr>
                        <th>Authors</th>
                        <th>Description</th>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Published At</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ list.authors }}</td>
                            <td>{{ list.description }}</td>
                            <td>{{list.isbn}}</td>
                            <td>{{list.title}}</td>
                            <td>{{list.publishedAt}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <label>Seach for all books and magazines by author name</label>
            <input type="text" id="search_by_author">
            <button @click="searchByAuthor">Search</button>
            <div v-if="docs != ''">
                <table>
                    <thead>
                        <tr>
                        <th>Authors</th>
                        <th>Description</th>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Published At</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(docs, index) in docs" :key="index">
                            <td>{{ docs.authors }}</td>
                            <td>{{ docs.description }}</td>
                            <td>{{docs.isbn}}</td>
                            <td>{{docs.title}}</td>
                            <td>{{docs.publishedAt}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import M from 'materialize-css';
import swal from 'sweetalert'

export default{
    name: 'ListView',
    data: function(){
        return {
            list: '',
            docs: ''
        }
    },
    methods:{
        searchByISBN(){
           const  _this = this;
            const isbn = document.getElementById('search_by_isbn').value;
            axios.get('http://localhost:3000/search_by_isbn/'+ isbn).then(function(response){
                if(response.data == 'wrong isbn'){
                    _this.list = '';
                    swal({title: 'Wrong ISBN entered', icon: "warning"})
                }else{
                    _this.list = response.data
                }
            })
        },
        searchByAuthor(){
            const  _this = this;
            const author = document.getElementById('search_by_author').value;
            axios.get('http://localhost:3000/search_by_author/'+ author).then(function(response){
                if(response.data == 'wrong author'){
                    _this.docs = '';
                    swal({title: 'Wrong author entered', icon: "warning"})
                }else{
                    _this.docs = response.data
                }
            })
        }
    },
    mounted: function(){
        M.AutoInit();
    }
}
</script>