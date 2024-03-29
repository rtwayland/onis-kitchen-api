import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'user-recipe-data',
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) return success(result.Item);
    return success({});
  } catch (e) {
    return failure({ status: false });
  }
}
