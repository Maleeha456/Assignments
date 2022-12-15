<template>
    <div id="app">
        <p>Add the magazine</p>
        <form @submit.prevent="addMagazine">
            <label>Title</label>
            <input type="text" id="title">
            <label>ISBN</label>
            <input type="text" id="isbn">
            <label>Authors</label>
            <input type="text" id="authors">
            <label>Published At</label>
            <input type="text" id="publishedAt">
            <button>Add</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert'

export default{
    name: 'AddMagazine',
    methods: {
        addMagazine(){
            const title = document.getElementById('title').value;
            const isbn = document.getElementById('isbn').value;
            const authors = document.getElementById('authors').value;
            const publishedAt= document.getElementById('publishedAt').value;
            //checking validations
            if(title == '' || isbn == '' || authors == '' || publishedAt == ''){
                swal({title: 'Please enter all fields', icon: "warning"})
            } else{
                axios.post('http://localhost:3000/add_magazine', {
                    title: title,
                    isbn: isbn,
                    authors: authors,
                    publishedAt: publishedAt
                }).then(function(){
                    swal({title: 'Magazine added successfully', icon: "success"});
                })
            }
            
            
        }
    }
}
</script>