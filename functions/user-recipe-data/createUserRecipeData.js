import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'user-recipe-data',
    Item: {
      id: data.id,
      userId: data.userId,
      recipeId: data.recipeId,
      isFavorite: data.isFavorite,
      tags: data.tags || [],
      notes: data.notes || [],
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
