const app = require('express')();
const cors = require('cors');
const bparser = require('body-parser');
const axios = require('axios');

app.use(cors());
app.use(bparser.json());

app.get('/', (req, res) => {
    res.send('JOBS API SERVER IS RUNNING!');
});

app.get(['/jobs', '/jobs/page/:page'], async (req, res) => {
    let page = req.params.page || 1;
    let url = `https://jobs.github.com/positions.json?page=${page}`;
    await axios.get(url)
    .then(response => {
        console.log(res.data)
        res.send(response.data)
    })
    .catch(err => res.send(err));
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});
