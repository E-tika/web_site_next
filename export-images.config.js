// export-images.config.js
/** @type {import('next-export-optimize-images').Config} */
const config = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    sharpOptions: {
        webp: {
            effort: 0,
        },
        avif: {
            effort: 0,
        }
    },
    convertFormat: [
        ['png', 'webp'],
        ['jpg', 'avif'],
    ],
}

module.exports = config;
