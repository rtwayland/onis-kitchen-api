import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context, callback) {
  const { id, email } = JSON.parse(
    event.body
  );

  const params = {
    TableName: 'users',
    Item: {
      id,
      email,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (err) {
    console.log(err);
    return failure({ status: false });
  }
}
