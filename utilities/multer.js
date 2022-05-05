
const multer = require('multer');
const path = require('path');
const appConfigs = require('./../config/app');

module.exports = {
    generateFilename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const dateField = (new Date().getTime() / 1000 | 0);
        const randomField = Math.random().toString(36).substring(2);
        const fileName = `${dateField}-${randomField}.${extension}`;
        cb(null, fileName);
    },
    imageUpload: function () {
        return multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path.join(__dirname, `./../uploads`));
                },
                filename: this.generateFilename
            }),
            limits: {
                fileSize: 1024 * 1024 * appConfigs.image_max_size // MB
            },
            fileFilter: (req, file, cb) => {
                let valid = (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
                cb(null, valid);
            },
        });
    },
};
