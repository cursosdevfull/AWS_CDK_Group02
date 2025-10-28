import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { Queues } from './constructs/queue';
import { Functions } from './constructs/functions';

export class AppointmentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { appointment, appointment_co, appointment_pe, appointment_mx } = new Functions(this, 'AppointmentFunctions');
    const { queuePE, queueMX, queueCO } = new Queues(this, 'AppointmentQueues', { appointment, appointment_co, appointment_pe, appointment_mx });

  }
}
