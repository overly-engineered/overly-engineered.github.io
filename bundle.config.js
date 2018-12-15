// bundle.config.js
module.exports = {
    bundle: {
        main: {
            scripts: [
                './js/*.js'
            ],
            styles: './css/*.css'
        },
        vendor: {
        }
    },
    copy: './images/*.png'
};