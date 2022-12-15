const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question('Please enter the current position of chess ', position => {
    position = position.split(',');
    let currentRow = parseInt(position[0]);
    let currentColumn = parseInt(position[1]);
    if( currentRow < 8 && currentRow >= 0 && currentColumn < 8 && currentColumn >= 0){
        let chess = Array(8).fill().map(() => Array(8).fill(0));
        let rows = [-1, -1, -2, -2, 1, 1, 2, 2]
        let columns = [-2, 2, -1, 1, -2, 2, -1, 1]
        let positions =[]
        for(let i =0; i<8; i++){
            let posX = currentRow + rows[i];
            let posY = currentColumn + columns[i]
            if(posX < 8 && posX >= 0 && posY < 8 && posY >= 0){
                let pos = posX + ',' + posY
                positions.push(pos);
            }
        }
        console.log(positions);
    } else{
       console.log('wrong position');
    }
    readline.close();
  });