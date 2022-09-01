const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 7020

app.use(cors({
    origin: '*'
}));

// app level middleware
// Logging the requests
app.use(morgan("dev"));
// app.use(express.json());

// http://localhost:5000/posts/5?likeCount=5
// app.get('/:id', (request, response) => {
//     const postId = request.params.id
//     // request.headers
//     // request.body
//     const likeCount = request.query.likeCount
//     // go to the database and do some CRUD actions
//   res.json(['apples', 'cherries'])
// })

const HOST = 'localhost';
const API_BASE_URL = 'https://api.myanimelist.net/v2/anime/6702?'
app.use('/posts', createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/posts`]: '',
    },
}));


app.listen(port, HOST,  (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log(`Example app listening on port ${HOST}:${port}`)
    }
})