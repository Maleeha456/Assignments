<template>
    <div id="app">
        <p>List of Magazines</p>
        <table class="table striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>ISBN</th>
                    &nbsp;
                    <th>Authors</th>
                    &nbsp;
                    <th>Published At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(magazines, index) in magazines" :key="index">
                    <td>{{ magazines.title }}</td>
                    <td>{{ magazines.isbn }}</td> 
                    &nbsp;
                    <td>{{ magazines.authors }}</td>
                    &nbsp;
                    <td>{{ magazines.publishedAt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'MagazineList',
  data: function(){
    return{
        magazines: []
    }
  },
  methods: {

  },
  mounted: function(){
    const _this = this;
    axios.get('http://localhost:3000/magazine_list').then(function(response){
        _this.magazines = response.data
    });
  }
}
</script>