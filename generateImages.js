const _ = require('lodash');
const sharp = require('sharp');
const Promise = require("bluebird");
const fs = require('fs').promises;
const tileSize = 512;


const generateImages = async (sharpImage, imagesQuantity) => {
    console.log('>>>> START GENERATING IMAGES');

    /* Generating lots of images streams */
    const imagesArray = [];
    for(let i = 0; i < imagesQuantity; i++) {
        const newSharpImageInstance =  sharpImage.clone();

        const cropedImage = newSharpImageInstance.extract({
            left: 0,
            top: 0,
            width: 512,
            height: 512,
        });
        
        imagesArray.push(cropedImage);
    }
    console.log('GENERATED SHARP IMAGES');


    const convertedImagesStreamsToBuffers = await Promise.mapSeries(imagesArray,
        async (imageStream, index) => {
            const imageBuffer = await imageStream
                    .png()
                    .toBuffer();

            console.log(`converted image ${index} to Buffer`);
            
            return imageBuffer;
        }
    );
    
    console.log('>>>> FINISHED GENERATING IMAGES BUFFERS');
    return convertedImagesStreamsToBuffers
};

module.exports = {
    generateImages,
}

