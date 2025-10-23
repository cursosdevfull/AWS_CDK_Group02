import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // crear un bucket para almacenar el código lambda

    // compilar el código del lambda

    // subir el código al bucket de tipo deployment

    // crear las lambdas

    // agregar permisos necesarios

    // agregar salidas al cloudformation


  }
}
