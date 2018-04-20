## AWS set up
1.  Copy the "Seed" thin app folder as the base for the new thin app.
2.  Make a new directory under ThinClients for your app and copy the seed into it. Pick a good name.
3.  In the package.json of your new project change the name to be the domain and end of the website.
For example if i was creating app.innate.ly my package.json name would be innate.ly
4.  Go to S3 and create a new Bucket that matches your domain name and a new Bucket for the dev version.
For example if my website was innate.ly i would create a bucket called app.innate.ly and app-dev.innate.ly
5.  When creating the Buckets set Static website hosting using the parameters index.html and error.html for
Index document and Error document respectively (you gotta type these in even though they look like defaults and are 
already set)
6.  When creating the Buckets you must add a Permissions Bucket Policy, go to the bucket and click on the permissions tab.
Once there click Bucket Policy, enter the following into the Bucket Policy make sure to replace the variables  ARN URL in the json

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "<ARN URL>"
        }
    ]
}
```
7.  The front to all our s3 buckets is a Cloud Front CDN.  We now need to create a Cloud Front Distribution in order.
Head over to AWS cloudfront and select Create Distribution
8.  Under Web select Get Started
9.  Fill the form out with the following params
*  Origin Domain Name:  select the s3 bucket you want
*  Allowed Http methods to All (GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE)
*  Redirect HTTP to HTTPS
*  fill in the CNAMES (e.g. www.apha.myshowday.com,apha.myshowday.com )
*  choose the custom SSL Cert (you will need to upload this if this is not under a domain we have in AWS yet)
*  Default Root Object to `index.html`
10.  Since the thin apps need all routes to redirected to the index we need to add the following error condition handlers
*  Select the distribution and go to the `Error Pages` Tab select `Create Custom Error Response`
*  Select `404` and add a Custom Error Response the Response Page Path will be `/index.html` adn the response code is `200`
*  Repeat this for `403`
11.  you will need to repeat step 9 and 10 so we have both `dev` and `prod` cloudfront distros
12.  After the CF distributions complete you need to add their dns records to DNSimple. Generally you need to add a CNAME for this example 
i went to the innate.ly DNS record added a CNAME for worker.innate.ly that resolves to the cloudfront distribution.  Do this for both
prod and dev distributions
13.  If you need to enable CORS [go here](https://www.boxuk.com/insight/tech-posts/enabling-cross-domain-access-cloudfront) and follow the directions

## Deploy
```
//Deploy keys needed

AWS_ACCESS_KEY_ID: '',
AWS_SECRET_ACCESS_KEY: '',
// where the bucket is located
AWS_REGION: ''
```
### Local
you need to add a file env.js to the top level of the directory this file should export an object of env with the above keys
### Travis
set up travis ci to have environment for this build and add the above keys.