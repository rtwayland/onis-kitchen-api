import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { tags } = data;
  const params = {
    TableName: 'users',
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'SET tags = :tags, lastLogin = :lastLogin',
    ExpressionAttributeValues: {
      ':tags': tags || null,
      ':lastLogin': Date.now(),
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
