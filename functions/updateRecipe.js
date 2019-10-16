import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { attachment, name, category } = data;
  const params = {
    TableName: 'recipes',
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression:
      'SET #name_key = :name, category = :category, attachment = :attachment',
    ExpressionAttributeNames: {
      '#name_key': 'name',
    },
    ExpressionAttributeValues: {
      ':attachment': attachment || null,
      ':name': name || null,
      ':category': category || null,
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
