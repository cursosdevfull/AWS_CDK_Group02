import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class ResourcesStack extends cdk.Stack {
    table: dynamodb.TableV2;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.table = new dynamodb.TableV2(this, "MyTable", {
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            billing: dynamodb.Billing.provisioned({
                readCapacity: dynamodb.Capacity.autoscaled({ maxCapacity: 10 }),
                writeCapacity: dynamodb.Capacity.autoscaled({ maxCapacity: 10 })
            }),
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })
    }
}