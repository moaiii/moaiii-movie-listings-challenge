
# list buckets
aws s3 ls

#build and deploy the app
npm run build

aws s3 sync build/ s3://moaiii-movie-listing-challenge