import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ContextsCustomStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcExisting = ec2.Vpc.fromLookup(this, "vpc-cache-context", {
      vpcId: this.node.tryGetContext('vpc-0b0f4f71')
    })

    new autoscaling.AutoScalingGroup(this, 'ASG-Context', {
      vpc: vpcExisting,
      instanceType: new ec2.InstanceType('t4g.small'),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(ecs.AmiHardwareType.ARM),
      desiredCapacity: 1,
      minCapacity: 1,
      maxCapacity: 11
    })
  }
}
