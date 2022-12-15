<template>
    <div id="app">
        <p>SORTED LIST OF DOCUMENTS:</p>
        <div v-if="sortedList.length != 0">
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
                        <tr v-for="(doc, index) in sortedList" :key="index">
                            <td>{{ doc.authors }}</td>
                            <td>{{ doc.description }}</td>
                            <td>{{doc.isbn}}</td>
                            <td>{{doc.title}}</td>
                            <td>{{doc.publishedAt}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'SortDocs',
    data: function(){
        return {
            sortedList: []
        }
    },
    mounted: function(){
        const _this = this;
        axios.get('http://localhost:3000/sorted_list').then(function(response){
            _this.sortedList = response.data;
        })
    }
}
</script>