import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const {
    pathParameters: { key, value },
  } = event;
  const params = {
    TableName: 'recipes',
    FilterExpression: '#key = :value',
    ExpressionAttributeNames: {
      '#key': key,
    },
    ExpressionAttributeValues: { ':value': value },
  };

  try {
    const result = await dynamoDbLib.call('scan', params);
    if (result.Items) return success(result.Items);
    return failure({ status: false, error: 'Items not found.' });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
