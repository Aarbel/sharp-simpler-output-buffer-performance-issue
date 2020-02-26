const sharp = require('sharp');
const fs = require('fs').promises;
const { generateImages } = require('./generateImages');


exports.lambdaHandler = async (input) => {
    const { imagesQuantity, imagePath } = input;

    console.log('');
    console.log('');
    console.log('START running FAST function');

    const sharpImage = sharp(imagePath)
        .toColorspace('srgb');

    await generateImages(sharpImage, imagesQuantity);

    console.log('>>>> FINISHED running FAST function');
};
