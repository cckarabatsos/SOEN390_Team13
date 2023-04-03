import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigatewayv2-alpha';
import * as integrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import path = require('path');



interface BackendProps extends cdk.StackProps {
    frontendUrls: string[];
}
export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: BackendProps) {
    super(scope, id, props);
    const sourcePath = process.env.BACKEND_SOURCE_PATH || path.join(__dirname, '..', '..', 'soen390_backend', 'dist');

    const allowedOrigins: string[] = props!.frontendUrls;

    const backendHandler = new lambda.Function(this, 'backendHandler', {
        functionName: 'soen390-backend',
        description: 'Express backend for the SOEN390 project',
            handler: 'index.handler',
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset(sourcePath),
        timeout: cdk.Duration.seconds(30),
        environment: {
            FIREBASECONFIG: process.env.FIREBASECONFIG || '',
        }
    });

    const integration = new integrations.HttpLambdaIntegration('backendIntegration', backendHandler);

    const api = new apigateway.HttpApi(this, 'Api', {
        apiName: 'soen390-backend',
        description: 'Backend for the SOEN390 project',
        defaultIntegration: integration,
        corsPreflight: {
            allowCredentials: true,
            allowHeaders: ['*'],
            allowMethods: [apigateway.CorsHttpMethod.GET, apigateway.CorsHttpMethod.POST, apigateway.CorsHttpMethod.PUT, apigateway.CorsHttpMethod.DELETE,
                apigateway.CorsHttpMethod.HEAD, apigateway.CorsHttpMethod.OPTIONS, apigateway.CorsHttpMethod.PATCH
            ],
            allowOrigins: allowedOrigins
        }
    });



    

  }
}
