import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');

export class FrontendStack extends cdk.Stack {
    readonly cfDomainName: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const sourcePath = process.env.FT_SOURCE_PATH || path.join(__dirname, '..', '..', 'soen390_web', 'build');

    const bucket = new Bucket(this, 'Bucket', {
        bucketName: 'soen390-frontend',

    });

    const distribution = new cloudfront.Distribution(this, 'CDN', {
        comment: 'CDN for the frontend of the SOEN390 project',
        defaultBehavior: { origin: new S3Origin(bucket), compress: true,
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        },
        defaultRootObject: 'index.html',
        errorResponses: [
            {
                responsePagePath: '/index.html',
                responseHttpStatus: 200,
                httpStatus: 403,
           },
            {
                responsePagePath: '/index.html',
                responseHttpStatus: 200,
                httpStatus: 404,
            }]
    });

    new BucketDeployment(this, 'DeployWebsite', {
        sources: [Source.asset(sourcePath)],
        destinationBucket: bucket,
        distribution,
        distributionPaths: ['/index.html', '/static/*'],
    });
    this.cfDomainName = distribution.distributionDomainName;
  }
}
