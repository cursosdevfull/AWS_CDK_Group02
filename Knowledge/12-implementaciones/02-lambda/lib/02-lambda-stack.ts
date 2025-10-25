import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import type { Env } from '../env';
import * as path from 'path';
import * as fs from 'fs';
import * as esbuild from 'esbuild';
import AdmZip from 'adm-zip';

interface LambdaStackProps extends cdk.StackProps {
  dataEnv: Env
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // crear un bucket para almacenar el código lambda
    const codeBucket = new s3.Bucket(this, "CodeBucket", {
      versioned: true,
      removalPolicy: props.dataEnv.ENVIRONMENT === "production" ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: !(props.dataEnv.ENVIRONMENT === "production")
    })

    // compilar el código del lambda
    this.buildLambdaCode();

    // subir el código al bucket de tipo deployment
    const codeDeployment = new s3deploy.BucketDeployment(this, "CodeDeployment", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "code-lambda-dist"))],
      destinationBucket: codeBucket,
      destinationKeyPrefix: "lambda-code"
    })

    // crear las lambdas
    const lambda01 = new lambda.Function(this, "Lambda01", {
      functionName: `lambda-01-${props.dataEnv.ENVIRONMENT}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: "index.handler",
      code: lambda.Code.fromBucket(codeBucket, "lambda-code/lambda01/lambda01.zip"),
      environment: {
        CODE_BUCKET_NAME: codeBucket.bucketName,
        NODE_OPTIONS: "--enable-source-maps"
      }
    })

    lambda01.node.addDependency(codeDeployment)

    // agregar permisos necesarios

    // agregar salidas al cloudformation
    new cdk.CfnOutput(this, "Lambda01FunctionName", {
      value: lambda01.functionName,
      exportName: "Lambda01FunctionName"
    })
  }

  private buildLambdaCode() {
    const source = path.join(__dirname, "code-lambda")
    const target = path.join(__dirname, "code-lambda-dist")

    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true })
    }

    const lambdas = [
      { folder: "lambda01", "entry": "index.ts" },
    ]

    lambdas.forEach(({ folder, entry }) => {
      const lambdaSourcePath = path.join(source, folder)
      const lambdaTargetPath = path.join(target, folder)
      const entryFile = path.join(lambdaSourcePath, entry)
      const targetFile = path.join(lambdaTargetPath, `${folder}.js`)

      if (!fs.existsSync(lambdaTargetPath)) {
        fs.mkdirSync(lambdaTargetPath, { recursive: true })
      }

      if (!fs.existsSync(lambdaTargetPath)) {
        fs.mkdirSync(lambdaTargetPath, { recursive: true })
      }

      if (!fs.existsSync(entryFile)) {
        throw new Error(`El archivo de entrada ${entryFile} no existe`)
      }

      try {
        esbuild.buildSync({
          entryPoints: [entryFile],
          bundle: true,
          minify: true,
          sourcemap: true,
          platform: "node",
          target: ["node22"],
          outfile: targetFile,
          external: ["aws-sdk"],
          banner: {
            js: 'exports.handler = require("./").handler'
          }
        })

        const zip = new AdmZip();
        zip.addLocalFile(targetFile);
        zip.writeZip(path.join(lambdaTargetPath, `${folder}.zip`));

        console.log("Compiled and packed")
      } catch (error) {
        console.log("Error", error)
      }
    })

  }
}
