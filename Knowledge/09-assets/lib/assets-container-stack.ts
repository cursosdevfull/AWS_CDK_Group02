import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';

export class AssetsContainerStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const taskDefinition = new ecs.FargateTaskDefinition(this, "MyTaskDef", {
            cpu: 512,
            memoryLimitMiB: 1024
        })

        const assetsImage = new ecr_assets.DockerImageAsset(this, "MyAssetImage", {
            directory: path.join(__dirname, "/apps"),
            assetName: "my-app-image"
        })

        taskDefinition.addContainer("MyContainer", {
            image: ecs.ContainerImage.fromDockerImageAsset(assetsImage),
        })
    }
}