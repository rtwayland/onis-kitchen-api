import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'user-recipe-data',
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'SET isFavorite = :isFav, tags = :tags, notes = :notes',
    ExpressionAttributeValues: {
      ':isFav': typeof data.isFavorite === 'boolean' ? data.isFavorite : null,
      ':tags': data.tags || null,
      ':notes': data.notes || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
