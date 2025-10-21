import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import { Asset } from "aws-cdk-lib/aws-s3-assets"
import * as path from "path"


export class ConstructsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.generateConstructL1();
    this.generateConstructL2();
    this.generateConstructL3();
  }

  generateConstructL1() {
    const sampleCfnRole = new iam.CfnRole(this, "SampleL1Role", {
      assumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: {
              Service: "lambda.amazonaws.com",
            },
          },
        ],
      },
      description: "sample cfn role",
      managedPolicyArns: ["arn:aws:iam::aws:policy/AWSLambdaExecute"],
      roleName: "sample-cfn-role",
    });

    const lambdaFunctionSourceCode = new Asset(this, "sample-l1-code", {
      path: path.join(__dirname, "./functions")
    })

    new lambda.CfnFunction(this, "sample-l1-function", {
      functionName: "sample-l1-function",
      code: {
        s3Bucket: lambdaFunctionSourceCode.s3BucketName,
        s3Key: lambdaFunctionSourceCode.s3ObjectKey
      },
      runtime: "nodejs22.x",
      handler: "sample-l1-function.handler",
      role: sampleCfnRole.attrArn,
    })
  }

  generateConstructL2() {
    new lambda.Function(this, "sample-l2-function", {
      functionName: "sample-l2-function",
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "sample-l2-function.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "./functions")),
    })
  }

  generateConstructL3() {
    new apigateway.LambdaRestApi(this, "sample-l3-api", {
      handler: new lambda.Function(this, "sample-l3-function", {
        functionName: "sample-l3-function",
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: "sample-l3-function.handler",
        code: lambda.Code.fromAsset(path.join(__dirname, "./functions")),
      }),
      proxy: true
    })
  }
}
