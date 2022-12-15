<template>
    <div id="app">
        <p>Add the book</p>
        <form @submit.prevent="addBook">
            <label>Title</label>
            <input type="text" id="title">
            <label>ISBN</label>
            <input type="text" id="isbn">
            <label>Authors</label>
            <input type="text" id="authors">
            <label>Description</label>
            <input type="text" id="description">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert'

export default{
    name: 'AddBook',
    methods: {
        addBook(){
            const title = document.getElementById('title').value;
            const isbn = document.getElementById('isbn').value;
            const authors = document.getElementById('authors').value;
            const description = document.getElementById('description').value;
            //checking validations
            if(title == '' || isbn == '' || authors == '' || description == ''){
                swal({title: 'Please enter all fields', icon: "warning"})
            } else{
                axios.post('http://localhost:3000/add_book', {
                    title: title,
                    isbn: isbn,
                    authors: authors,
                    description: description
                }).then(function(){
                    swal({title: 'Book added successfully', icon: "success"});
                })
            }
            
            
        }
    }
}
</script>