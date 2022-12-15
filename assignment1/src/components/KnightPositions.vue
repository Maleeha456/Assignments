<template>
    <div id="app">
        <label>Enter the Positions with comma separated value of the index for 8*8 chessboard</label>
        <input type="text" id="position">
        <button id="submit" @click="positionEntered">Submit</button>
        <div v-if="positions.length != 0">
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pos, index) in positions" :key="index">
                        <td>{{pos}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert'

export default{
    name: 'KnightPositions',
    data: function(){
        return {
            positions: []
        }
    },
    methods: {
        positionEntered(){
            const _this = this;
            let position = document.getElementById('position').value;
            if(!position.includes(',')){
                swal({title: 'Please enter valid position', icon: 'warning'})
            } else{
            position = position.split(',')
            axios.post('http://localhost:3000/position', {row: position[0], column: position[1]}).then(function(response){
                if(response.data == 'wrong position'){
                    swal({title: 'Please enter the  valid position', icon: 'warning'});
                } else{
                    _this.positions = response.data
                }
            })
            }
        }
    }
}
</script>