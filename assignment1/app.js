const express = require('express');
const fs = require('fs'); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//Point 1 - Reads the CSV data
app.get('/authors', (req,res) => {
    fs.readFile('./public/authors.csv', {encoding: 'utf-8'}, function(err, authors){
        if(err){
            console.log('error is', err);
        } else{
            res.send(authors);
        }
    });
});

app.get('/books', (req,res) => {
    fs.readFile('./public/books.csv', {encoding: 'utf-8'}, function(err, books){
        if(err){
            console.log('error is', err);
        } else{
            res.send(books);
        }
    });
});

app.get('/magazines', (req,res) => {
    fs.readFile('./public/magazines.csv', {encoding: 'utf-8'}, function(err, magazines){
        if(err){
            console.log('error is', err);
        } else{
            res.send(magazines);
        }
    });
});

//Point 2 - print books and magazines
app.get('/book_list', async function(req, res){
  const booklist = await readBook();
  res.send(booklist);  
});

app.get('/magazine_list', async function(req, res){
   const magazineList = await readMagazine();
   res.send(magazineList);
});

//Point 3 - find a book or magazine by its ISBN
app.get('/search_by_isbn/:isbn', async function(req,res){
    const bookList = await readBook();
    let doc = '';
    for(let index in bookList){
        if(bookList[index].isbn == req.params.isbn){
            doc = bookList[index];
        }
    }
    if(doc == ''){
        const magazineList = await readMagazine();
        for(let index in magazineList){
            if(magazineList[index].isbn == req.params.isbn){
                doc = magazineList[index];
            }
        }   
    }
    if(doc == ''){
        res.send('wrong isbn')
    }else{
    res.send(doc);
    }
});

//Point 4 - Find books and magazines by authors email
app.get('/search_by_author/:author', async function(req, res){
    const bookList = await readBook();
    const magazineList = await readMagazine();
    const list = bookList.concat(magazineList);
    let docs = [];
    for(let index in list){
        if(list[index].authors.includes(',')){
            let authors = list[index].authors.split(',');
            for(let authorIndex in authors){
                if(authors[authorIndex] == req.params.author){
                docs.push(list[index]);
                }
            }
        }
        if(list[index].authors == req.params.author){
            docs.push(list[index]);
        }
    }
    if(docs.length == 0){
        res.send('wrong author')
    } else{
    res.send(docs);
    }
});

//Point 5 - Print Books and Magazines
app.get('/sorted_list', async function(req,res){
    const bookList = await readBook();
    const magazineList = await readMagazine();
    const list = bookList.concat(magazineList);
    list.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
    res.send(list);
});

//Point 6 - Add magazine and export to new csv file
app.post('/add_magazine', async function(req,res)
{
    let keys = Object.keys(req.body);
    let index = keys;
    let values = ''
    for( keys in req.body){
        values = values + req.body[keys] + ';';
    }
    let data = ''
    for(let i in index){
        data = data + index[i] + ';';
    }
    data = data + "\r\n" + values;
    const result = await createDoc(data);
    res.send(result);
});

app.post('/add_book', async function(req,res)
{
    let keys = Object.keys(req.body);
    let index = keys;
    let values = ''
    for( keys in req.body){
        values = values + req.body[keys] + ';';
    }
    let data = ''
    for(let i in index){
        data = data + index[i] + ';';
    }
    data = data + "\r\n" + values;
    const result = await createDoc(data);
    res.send(result);
});

function readMagazine(){
    return new Promise(resolve => {
		let magazineList = [];
        fs.readFile('./public/magazines.csv', {encoding: 'utf-8'}, function(err, magazines){
            if(err){
                console.log('error is', err);
            } else{
                magazines.split(/\r?\n/).forEach((line) => {
                    line = line.split(';')
                    magazineList.push({title: line[0], isbn: line[1], authors: line[2], publishedAt: line[3]});  
                }); 
                magazineList = magazineList.slice(1,magazineList.length-1);
                resolve(magazineList);
            }
        });
    });
}

function readBook(){
    return new Promise(resolve => {
		let bookList = [];
        fs.readFile('./public/books.csv', {encoding: 'utf-8'}, function(err, books){
            if(err){
                console.log('error is', err);
            } else{
                books.split(/\r?\n/).forEach((line) => {
                    line = line.split(';')
                    bookList.push({title: line[0], isbn: line[1], authors: line[2], description: line[3]});  
                });
                bookList = bookList.slice(1,bookList.length-1);
                resolve(bookList); 
            }      
        });
    });
}

function createDoc(data){
    return new Promise(resolve => {
        fs.readFile('./public/docs.csv', {encoding: 'utf-8'}, function(err, docs){
            if(err){
                fs.writeFile('./public/docs.csv',data, function(err, status){
                    if(err){
                        console.log(err)
                    }else{
                        resolve('added successfully');
                    }
                });
            }
            else{
                let updatedData = docs + '\r\n' + data
                fs.writeFile('./public/docs.csv',updatedData, function(err, status){
                    if(err){
                        console.log(err)
                    }else{
                        resolve('added successfully');
                    }
                });
                
            }
        });
    })
}

//Assignment 2
app.post('/position', function(req,res){
    currentRow = parseInt(req.body.row);
    currentColumn = parseInt(req.body.column);
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
        res.send(positions);
    } else{
        res.send('wrong position');
    }
})

app.listen(PORT, function() {
    console.log('Listening to port', PORT );
});