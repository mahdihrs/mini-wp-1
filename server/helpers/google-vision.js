// const {Storage} = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'APIKey-Google-Vision.json'
});

module.exports = {
    autoGenerateTags(img) {
        return new Promise((resolve, reject) => {
            client
              .labelDetection(img)
              .then(results => {
                const labels = results[0].labelAnnotations;
                let theLabels = labels.map(e => e.description)
                resolve(theLabels)
              })
              .catch(err => {
                console.error('ERROR:', err);
                reject(err)
              });
        })
    }
}