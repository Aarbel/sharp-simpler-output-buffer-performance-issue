const sharp = require('sharp');
const fs = require('fs').promises;
const { generateImages } = require('./generateImages');


exports.lambdaHandler = async (input) => {
    const { imagesQuantity, imagePath } = input;

    console.log('');
    console.log('');
    console.log('START running SLOOWWW function');

    let fileBuffer
    await fs.readFile(imagePath)
        .then((data) => {
            console.log('File read success');
            fileBuffer = data;
        })
        .catch((err) => {
            console.log('File read error');
            console.log(err.code, "-", err.message);
        })

    /* Here the input of sharp is a Buffer, not a string path */
    // const sharpImage = sharp(fileBuffer, { sequentialRead: true })
    //     .toColorspace('srgb');

    const { data, info } = await sharp(fileBuffer)
        .raw()
        .toBuffer({ resolveWithObject: true });

    const sharpRaw = await sharp(data, { raw: info })


    await generateImages(sharpRaw, imagesQuantity);


    console.log('>>>> FINISHED running SLOOWWW function');
};
