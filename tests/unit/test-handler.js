'use strict';

const fastApp = require('../../app-fast.js');
const slowApp = require('../../app-slow.js');
const chai = require('chai');
const expect = chai.expect;
const event = {
    body: {
        "imagesQuantity": 512,
    },
};


describe('Tests index', function () {
    describe('with small starting image', () => {

        it('tests fast app with few files', async () => {
            await fastApp.lambdaHandler({
                "imagesQuantity": 5,
                "imagePath": 'small.png',
            })
        });
        it('tests slow app with few files', async () => {
            await slowApp.lambdaHandler({
                "imagesQuantity": 5,
                "imagePath": 'small.png',
            })
        });
        it('tests fast app with many files', async () => {
            await fastApp.lambdaHandler({
                "imagesQuantity": 100,
                "imagePath": 'small.png',
            })
        });
        it('tests slow app with many files', async () => {
            await slowApp.lambdaHandler({
                "imagesQuantity": 100,
                "imagePath": 'small.png',
            })
        });
    });

    describe('with big (just 3Mo) starting image', () => {

        it('tests fast app with few files', async () => {
            await fastApp.lambdaHandler({
                "imagesQuantity": 5,
                "imagePath": 'big.png',
            })
        });
        it('tests slow app with few files', async () => {
            await slowApp.lambdaHandler({
                "imagesQuantity": 5,
                "imagePath": 'big.png',
            })
        });
        it('tests fast app with many files', async () => {
            await fastApp.lambdaHandler({
                "imagesQuantity": 100,
                "imagePath": 'big.png',
            })
        });
        it('tests slow app with many files', async () => {
            await slowApp.lambdaHandler({
                "imagesQuantity": 100,
                "imagePath": 'big.png',
            })
        });
    });
});
