const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './files')
    },
    filename: (req, file, next) => {
        next(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});

let csvRoute = (req, res, next) => {
    res.sendFile(__dirname + '/csvTester.html');
};

router.post('/fileUpload', upload.single('csv'), (req, res, next) => {
    if (req && req.file && req.file.path) {
        csv().fromFile(req.file.path).then(function (jsonObj) {
            let tableHtml = '<html><head></head><body><table>';
            for (let i = 0; i < jsonObj.length; i++) {
                tableHtml += '<tr>';
                console.log('row', jsonObj[i]);
                for (let j = 0; j < Object.keys(jsonObj[i]).length; j++) {
                    tableHtml += '<td>' + jsonObj[i][Object.keys(jsonObj[i])[j]] + '</td>';
                }
                tableHtml += '</tr>';
            }
            tableHtml += '</table></body></html>';
            res.send(tableHtml);
        })
    }
    res.send('<html><head></head><body><span>Sorry, you forgot to select a file, please try again <a href="http://localhost:8080">here</a></span></body></html>');
});

router.get('/csvTester', csvRoute);
router.get('/', csvRoute);

module.exports = router;