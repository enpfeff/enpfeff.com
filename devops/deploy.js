/**
 * Created by enpfeff on 2/27/17.
 */
const env = require('env2');
const P = require('bluebird');
const _ = require('lodash');
const glob = P.promisify(require('glob'));
const path = require('path');
const fs = require('fs');
const readDir = P.promisify(fs.readdir);
const AWS = require('aws-sdk');

// used in development so i dont share aws secrets
if(fs.existsSync('.env')) env('.env');

AWS.config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const BUILD_DIR = 'dist';

const PRETTY_PRINT_SPACER = '\n\t*  ';

const CONTENT_TYPE_MAP = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.gif': 'image/gif',
    'jpeg': 'image/jpeg'
};

const CACHE_CONTROL_MAP = {
    '.html': 'max-age=0, must-revalidate'
};

function entry() {
    const GLOB_OPTIONS = {
        matchBase: true,
        cwd: '..',
        ignore: ['**/node_modules/**'],
        absolute: true
    };

    // go find all gulpfiles in this folder
    // install them and build the dist folder
    return glob('**/gulpfile.js', GLOB_OPTIONS)
        .map((path) => getAndUploadDistribution(path));
}

function singleEntry(path, branch) {
    return getAndUploadDistribution(path, branch);
}

function getAndUploadDistribution(gulpFile, branch) {
    const dirname = path.dirname(gulpFile);
    const pkg = require(`${dirname}/package.json`);
    const { name, meta } = pkg;

    console.log(`Passed in Branch is: ${!branch ? 'undefined' : branch}`);
    const branchName = !branch ? getBranchName() : branch;
    const isProd = branchName === 'prod';

    // if its prod then we are pushing to whatever is in the meta of the package json
    const bucketName = `${isProd ? meta.deploy.prefix.prod : meta.deploy.prefix.dev}${name}`;
    const directoryPath = `${dirname}/dist`;

    console.log(`Bucket Name: ${bucketName}`);
    // first we want to remove all items in the bucket
    return removeItems(bucketName)
        .then(() => uploadDir(directoryPath));

    function logFiles(files) {
        let prettyFiles = _.clone(files);
        prettyFiles[0] = PRETTY_PRINT_SPACER + prettyFiles[0];
        prettyFiles = prettyFiles.join(PRETTY_PRINT_SPACER);
        console.log(`Attempting to upload to ${bucketName}: ${prettyFiles}`);
        return files;
    }

    function uploadDir(aPath) {
        return readDir(aPath)
            .then(logFiles)
            .then(files => {
                return P.map(files, file => {
                    file = path.join(aPath, file);

                    if(fs.lstatSync(file).isDirectory()) return uploadDir(file);
                    return uploadFile(file);
                });
            });
    }

    function uploadFile(fullFilePath) {
        const uploadKey = fullFilePath.substring(fullFilePath.indexOf(BUILD_DIR) + 5);

        const readStream = fs.createReadStream(fullFilePath);
        readStream.on('error', (d) => console.log(d.toString()));

        return new P((resolve, reject) => {
            s3.upload({
                Bucket: bucketName,
                Key: uploadKey,
                Body: readStream,
                ContentType: getContentType(fullFilePath),
                CacheControl: getCacheControl(fullFilePath)
            }, (err, data) => {
                if(err) {
                    console.log('Error', err);
                    return reject(err);
                }
                if(data) console.log('Upload Success', data.Location);
                return resolve();
            });
        });
    }
}


function removeItems(bucketName) {
    return new P((resolve, reject) => {
        s3.listObjectsV2({Bucket: bucketName}, (err, data) => {
            if(err) {
                console.log('Error in bucket listing', err.message);
                return reject(err);
            }

            console.log(`Deleting from ${bucketName}`);

            const params = {
                Bucket: bucketName,
                Delete: {
                    Objects: _.compact(_.map(data.Contents, (content) => {
                        const key = _.get(content, 'Key');
                        if(_.isUndefined(key)) return;
                        console.log(`\t*  ${key}`);
                        return { Key: key };
                    }))
                }
            };

            if(_.isEmpty(params.Delete.Objects)) return resolve();

            // now that we have all the object go and delete them
            s3.deleteObjects(params, (err, data) => {
                if(err) {
                    console.log('Error in bucket removing', err.message);
                    return reject(err);
                }
                return resolve();
            });
        });
    });
}

function getCacheControl(file) {
    let cache = CACHE_CONTROL_MAP[path.extname(file)];
    // default is 30 days
    if(_.isUndefined(cache)) cache = 'max-age=2592000, must-revalidate';
    return cache;
}

function getContentType(file) {
    return CONTENT_TYPE_MAP[path.extname(file)];
}

// this is specially passed in for the build
function getBranchName() {
    const branch = process.argv[2];
    console.log(`Deploy argument is ${branch}`);
    return branch;
}


module.exports = {
    entry,
    singleEntry
};

if(require.main === module) {
    entry();
}
