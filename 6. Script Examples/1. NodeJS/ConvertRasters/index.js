//Core and Extra NodeJS Modules
const async = require('async') //Used to multi thread
const prettyMs = require('pretty-ms') //Used for timing
const klaw = require('klaw') //Used to list files in directory
const path = require('path')
const child_process = require('child_process'); //Used to run the GDAL commands

//GDAL Setup Options
const tiled = '-co TILED=YES'
const epsg = '-a_srs EPSG:27700' //Set projection to British National Grid
const compress = '-co COMPRESS=NONE' //[JPEG/LZW/PACKBITS/DEFLATE/CCITTRLE/CCITTFAX3/CCITTFAX4/LZMA/ZSTD/LERC/LERC_DEFLATE/LERC_ZSTD/WEBP/NONE]
const threads = '-co NUM_THREADS=ALL_CPUS'
const fileExtension = '.tif'

//Setup directories
const sourceDirectory = ''
const outputDirectory = ''

const convertRasters = () => {
    const start = new Date();
    async.waterfall([
        function(callback) {//List files within source directory
            let files = [];
            klaw(sourceDirectory)
                .on('data', function (item) {
                    if(path.extname(item.path) === fileExtension) {
                        files.push(item.path)
                    }
                })
                .on('end', function () {
                    console.log(`Found ${files.length} files`);
                    callback(null, files);
                })
        },
        function(files, callback) { //This does the initial GDAL translation and uses mapLimit to fan out to use as many CPU cores as possible
            async.mapLimit(files, 8, function (in_file, callback) {
                let out_file = path.join(outputDirectory, path.basename(in_file)) //Set the output file
                async.waterfall([ //Use another async waterfall so we can do the gdal_translate followed by the gdaladdo
                    function(callback) {
                        const gdalCMD = `gdal_translate -of GTiff ${in_file} ${out_file} ${tiled} ${epsg} ${compress} ${threads}`
                        child_process.exec(gdalCMD, function (error, stdout, stderr){
                            if(error) {
                                console.log(error);
                                callback(error);
                            }
                            callback(null, 'translated')
                        });
                    },
                    function(response, callback) {
                        const overviewsCMD = `gdaladdo ${out_file}`
                        child_process.exec(overviewsCMD, function (error, stdout, stderr){
                            if(error) {
                                console.log(error);
                                callback(error);
                            }
                            callback(null, 'overviews')
                        });
                    }
                ], function(err, result) {
                    var end = new Date() - start;
                    console.log('Finished processing ', out_file);
                    callback()
                });

            }, function(error, results) {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    console.log('Finished translating files');
                    callback(null, 'done');
                }
            });
        },
    ], function(err, result) {
        var end = new Date() - start;
        console.log('Finished processing in ', prettyMs(end));
    });
};

convertRasters();