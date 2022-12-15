<template>
    <div id="app">
        <p>List of Books</p>
        <table class="table striped">
            <thead>
                <tr>
                    <th>Authors</th>
                    <th>Description</th>
                    <th>ISBN</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(books, index) in books" :key="index">
                    <td>{{books.authors}}</td>
                    <td>{{books.description}}</td>
                    <td>{{books.isbn}}</td>
                    <td>{{books.title}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'BookList',
  data: function(){
    return{
        books: []
    }
  },
  mounted: function(){
    const _this = this;
    axios.get('http://localhost:3000/book_list').then(function(response){
        _this.books = response.data
    });
  }
}
</script>