const express = require('express');
const router = express.Router();

const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Multer = require('multer');
const { Stream } = require('stream');
const fs = require('fs');
const Invoice = require('../models/Invoice');

let cloudConnect = new Storage({
    keyFilename: path.join(__dirname, '../../feisty-reef-377620-db7353eac6bb.json'),
    projectId: 'feisty-reef-377620'
});
let bucket = cloudConnect.bucket('invoice-box');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
    },
});

router.post("/fileUpload", multer.single("imgfile"), (req, res) => {
    console.log("Made it /upload");
    try {
        if (req.file) {
            console.log("File found, trying to upload...");
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream();

            blobStream.on("finish", () => {
                res.status(200).send("Success");
                console.log("Success");
            });
            blobStream.end(req.file.buffer);
        } else throw "error with img";
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/uploadAttachment", (req, res) => {
    // const decodedStr = Buffer.from(req.body.file, "base64").toString("ascii");
    // const file = fs.writeFile('upload.pdf', req.body.file, { encoding: 'base64' })
    // console.log(file)

    var file = bucket.file('my-file.jpg');
    //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
    bin.pipe(file.createWriteStream({
        metadata: {
            contentType: 'application/pdf',
            metadata: {
                custom: 'metadata'
            }
        },
        public: false,
        validation: "md5"
    }))
        .on('error', function (err) { })
        .on('finish', function () {
            // The file upload is complete.
        });
});

router.get("/getAttachments", async (req, res) => {
    try {
        const file = cloudConnect.bucket('invoice-box').file('1_777726ac-0a4e-47a2-8022-bed709673630_post.pdf');
        console.log(file)

        // file.download(function (err, contents) {
        //     console.log("file err: " + err);
        //     console.log("file data: " + contents);
        // });
    } catch (error) {
        console.log(error)
    }
})

router.post('/createInvoice', (req, res) => {
    let payload = req.body
    Invoice.create(payload)
        .then(function (item) {
            res.status(200).json({ success: true, Item: item });
        }).catch(function (err) {
            res.status(400).json({ success: false, err });
        });
})


module.exports = router;
