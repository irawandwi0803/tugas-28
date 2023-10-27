const http = require(`http`);
const fs = require(`fs`);

http
    .createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': `text/html`,
        });

        const url = req.url;
        if(url === '/about') {
            fs.readFile('./about.html', (err, data) => {
                if(err) {
                    res.writeHead(404);
                    res.write('Error: File Not Found')
                } else {
                    res.write(data);
                }
                res.end();
            })
        } else if (url === '/contact') {
            fs.readFile('./contact.html', (err, data) => {
                if(err) {
                    res.writeHead(404);
                    res.write('Error: File Not Found')
                } else {
                    res.write(data);
                }
                res.end();
            })
        } else {
            fs.readFile('./index.html', (err, data) => {
                if(err) {
                    res.writeHead(404);
                    res.write('Error: File Not Found')
                } else {
                    res.write(data);
                }
                res.end();
            })
        }
    })
    .listen(3000, () => {
        console.log(`Server is listening on port 3000...`);
    });