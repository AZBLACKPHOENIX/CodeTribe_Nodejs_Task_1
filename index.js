const http = require("http");
const address = "127.0.0.1";
const port = 1000;

let movies = [
    { id: 0, name: "Mega Mind", genre: "Animation/Comdey" },
    { id: 1, name: "Caroline", genre: "Animation/Horror" },
    { id: 2, name: "Appleseed", genre: "Animation/Action" },
    { id: 3, name: "Trumans Show", genre: "Comdey" },

]

let songs = [
    { id: 0, name: "Even when it hurts", artist: "Jesus Culture", genre: "Gospel" },
    { id: 1, name: "Island", artist: "Jarico", genre: "Tropical-House" },
    { id: 2, name: "Revolution", artist: "Diplo", genre: "Trap-House" },
    { id: 3, name: "Fearless", artist: "", genre: "Trap-House" },
    { id: 4, name: "Bruxo Fantasma Super Slowed", artist: "Bruxo", genre: "Phonk" },
]

let series = [
    { id: 0, name: "NARUTO", genre: "Animation/Adventure" },
    { id: 1, name: "One Piece", genre: "Animation/Adventure" },
    { id: 2, name: "Death Note", genre: "Animation/Survival" },
    { id: 3, name: "Blood C", genre: "Animation/Horror" },
]

const server = http.createServer((req, res) => {
    
    if (req.url === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("WELCOME TO THE DEFAULT, PLEASE FEEL FREE TO NAVIGATE")
    } else if (req.url === "/movies") {
        switch (req.method) {
            case "GET":
                res.writeHead(200, { "content-type": "text/html" });
                res.end(JSON.stringify(movies));
                break;
            case "POST":
                res.writeHead(200, { "content-type": "text/html" });
                movies.push([{ id: 4, name: "Ready Player One", genre: "Action/Sci-Fi" }])
                res.end(JSON.stringify({ movies }))
                break;
            case "PUT":
                res.writeHead(200, { "content-type": "text/html" });
                for (i = 0; i < movies.length; i++) {
                    if (movies[i].id === 3) {
                        console.log("UPDATED");
                        movies[i].genre = "Adventure/Comedy"
                    }
                }
                if (movies.length < 3) {
                    res.end(JSON.stringify("Movie Not Found"))
                } else {
                    res.end(JSON.stringify(movies))
                }
                break;
            case "DELETE":
                res.writeHead(200, { "content-type": "text/html" });
                movies.pop()
                res.end(JSON.stringify(movies))
                break;
            default:
                res.writeHead(404, { "content-type": "text/html" });
                res.end("REQUEST NOT FOUND")

        }
    } else if (req.url === "/songs") {
        switch (req.method) {
            case "GET":
                res.writeHead(200, { "content-type": "text/html" });
                res.end(JSON.stringify(songs));
                break;
            case "POST":
                res.writeHead(200, { "content-type": "text/html" });
                songs.push([{ id: 5, name: "Drive", artist: "Markvard", genre: "Tropical-House" }])
                res.end(JSON.stringify(songs));
                break;
            case "PUT":
                res.writeHead(200, { "content-type": "text/html" });
                for (let i = 0; i < songs.length; i++) {
                    if (songs[i].id === 3) {
                        songs[i].genre = "Internation Deep House"
                    }
                }
                if (songs.length < 3) {
                    res.end("SONG NOT FOUND")
                } else {
                    res.end(JSON.stringify(songs))

                }
                break;
            case "DELETE":
                res.writeHead(200, { "content-type": "text/html" });
                songs.pop()
                res.end(JSON.stringify(songs))
                break;
            default:
                res.writeHead(404, { "content-type": "text/html" });
                res.write("404")
                res.end("<h1>REQUEST METHOD NOT FOUND</h1>")
        }
    } else if (req.url==="/series"){
        switch(req.method){
            case "GET":
                res.writeHead(200, { "content-type": "text/html" });
                res.end(JSON.stringify(series))
                break;
            case "POST":
                res.writeHead(200, { "content-type": "text/html" });
                series.push([{id:6, name:"The 100",genre:"Adventure/Drama"}])
                res.end(JSON.stringify(series))
                break;
            case "PUT":
                res.writeHead(200, { "content-type": "text/html" });
                for (let i = 0; i<series.length;i++){
                    if (series[3].id===3){
                        series[i].genre="ANIME / SURVIVAL"
                    }
                }
                res.end(JSON.stringify(series))
                break;
            case "DELETE":
                res.writeHead(200, { "content-type": "text/html" });
                series.pop()
        }
    } else{
        res.write("<h1>REQUEST URL NOT FOUND</h1>")
        res.end("404")
    }
});

server.listen(port, address, () => {
    console.log("Server Log")
})