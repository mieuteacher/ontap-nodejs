var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer((request, response) => {
    
    let urlObj = url.parse(request.url, true)

    if (urlObj.pathname == "/") {
        let homeTemplatePath = path.join(__dirname, 'templates/home.html');

        fs.readFile(homeTemplatePath, 'utf-8', (err ,data) => {
            if (err){

                response.statusMessage = 'Khong lam duoc adasdasdasas'; 
        
                response.writeHead(400, {
                    'Content-Type': 'text/html',
                  })

                response.end(`Server vẫn đang chạy ổn tại địa chỉ: http://127.0.0.1:2912 <> Template HTML load failed`)
                return
            }

            response.writeHead(200, {
                'Content-Type': 'text/html',
              })
            
            response.end(data.replace("{{Register}}", "Đăng Ký"))
        })
    }else {
        let template404 = path.join(__dirname, "templates/404.html");

        fs.readFile(template404, 'utf-8', (err, data) => {
            if (err) {
                response.statusCode(404);
                response.end("Trang khong ton tai")
            }else {
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                })

                response.end(data.replace("{{urlhome}}", "/"))
            }
        })

    }

}).listen(2912)