#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

const config = {
    region: 'us-east-1'
}
const frontend = new FrontendStack(app, 'Soen390Frontend', {
    env: {
        region: config.region
    }

});
new BackendStack(app, 'Soen390Backend', {
    env: {
        region: config.region
    },
    frontendUrls: [`https://${frontend.cfDomainName}`]
});
