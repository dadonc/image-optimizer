# Notes

## Download all images
scp -r domenic@116.203.79.131:/home/domenic/www/snipsnap-server/server/static/files /Users/domenic/Downloads/files

## Upload optimized images
scp -r /Users/domenic/Projects/image-optimizer/files/optimized domenic@116.203.79.131:/home/domenic/www/snipsnap-server/server/static/files/optimized2


## Remember to run npm run build on the server for the images to be copied into the build folder