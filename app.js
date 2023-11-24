const express = require('express');

const app = express();

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        test: "test"
    })
})
const delay = (timeInSec) => {
    return new Promise((resolve) => setTimeout(resolve, timeInSec*1000));
}
const secondsDiffFromTimeStamp = (timestart) => {
    let current = new Date();
    return ((current.getTime() - timestart.getTime())/ 1000)
}   
router.get("/testing-1/:id", (req, res) => {
    const id = req.params.id;
    console.log('sync fn testing 1', id);
    const timestart = new Date();
    while( secondsDiffFromTimeStamp(timestart) < 5) {

    }
    console.log('sync fn testing 2 resp', id)
    res.send('hello from sync')
})
router.get("/testing-2/:id", async (req, res) => {
    const id = req.params.id;
    console.log('async testing 2', id);
    await delay(10);
    console.log('async testing 2 resp', id);
    res.send('hello from async function');
})
app.use((req, res, next) => {
    const timestart = new Date();
    const timeoutId = setInterval(() => {
        console.log('route: ', req.path, '  time elapsed: ', (new Date().getTime() - timestart.getTime() )/1000);
    }, 3000);
    res.on('finish', () => {
        clearTimeout(timeoutId);
    })
    next();
})
app.listen(4002, () => {
    console.log(`Server running on port 4002`)
});
console.log(process.env.NODE_ENV)
app.use(router)
module.exports = app;

