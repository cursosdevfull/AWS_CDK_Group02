import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { NodeJsLambda } from './constructs/node-js-lambda';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda01 = new NodeJsLambda(this, "Lambda01", {
      description: "Mi primera lambda con NodeJS",
      entry: path.join(__dirname, "code-lambda/index.ts")
    })



    /*     const lambda01 = new nodejs.NodejsFunction(this, "Lambda01", {
          functionName: "Lambda01",
          description: "Mi primera lambda con NodeJS",
          entry: path.join(__dirname, "code-lambda/index.ts"),
          handler: "handler",
          runtime: cdk.aws_lambda.Runtime.NODEJS_22_X,
          bundling: {
            minify: true,
            sourceMap: true,
            externalModules: ["aws-sdk"],
            forceDockerBundling: false,
          },
          memorySize: 512,
          timeout: cdk.Duration.minutes(15),
        }) */

    new cdk.CfnOutput(this, "Lambda01Output", {
      value: lambda01.functionName,
      description: "Nombre de la Lambda01",
    });

  }
}
