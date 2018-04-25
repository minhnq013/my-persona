import { get, post, deleteRequest } from '../util/apis_util';

export function createEntityRequest(entityType, entity) {
  return { type: 'ENTITY_CREATE_REQUEST', entityType, entity };
}

export function createEntitySuccess(entityType, entity) {
  return { type: 'ENTITY_CREATE_SUCCESS', entityType, entity };
}

export function createEntityFail(entityType, errors) {
  return { type: 'ENTITY_CREATE_FAIL', entityType, errors };
}

export const createEntityAsync = (entityType, entity) => (dispatch) => {
  dispatch(createEntityRequest(entityType, entity));

  // Perform the call
  return post(entityType, entity)
    .then((result) => {
      dispatch(createEntitySuccess(entityType, result));
      return result;
    })
    .catch((errors) => {
      dispatch(createEntityFail(entityType, errors));
    });
};

export function updateEntityRequest(entityType, entity) {
  return { type: 'ENTITY_UPDATE_REQUEST', entityType, entity };
}

export function updateEntitySuccess(entityType, entity) {
  return { type: 'ENTITY_UPDATE_SUCCESS', entityType, entity };
}

export function updateEntityFail(entityType, errors) {
  return { type: 'ENTITY_UPDATE_FAIL', entityType, errors };
}

export function deleteEntityRequest(entityType, entityId) {
  return { type: 'ENTITY_DELETE_REQUEST', entityType, entityId };
}

export function deleteEntitySuccess(entityType, entity) {
  return { type: 'ENTITY_DELETE_SUCCESS', entityType, entity };
}

export function deleteEntityFail(entityType, errors) {
  return { type: 'ENTITY_DELETE_FAIL', entityType, errors };
}

export const deleteEntityAsync = (entityType, entityId) => (dispatch) => {
  dispatch(deleteEntityRequest(entityType, entityId));

  // Perform the call
  return deleteRequest(entityType, {
    id: entityId,
  })
    .then((result) => {
      dispatch(deleteEntitySuccess(entityType, result));
      return result;
    })
    .catch((errors) => {
      dispatch(deleteEntityFail(entityType, errors));
    });
};

export function queryEntityRequest(entityType, query) {
  return { type: 'ENTITY_QUERY_REQUEST', entityType, query };
}

export function queryEntitySuccess(entityType, entitiesList) {
  return { type: 'ENTITY_QUERY_SUCCESS', entityType, entitiesList };
}

export function queryEntityFail(entityType, errors) {
  return { type: 'ENTITY_QUERY_FAIL', entityType, errors };
}

export const queryEntityAsync = (entityType, query) => (dispatch) => {
  dispatch(queryEntityRequest(entityType, query));

  // Perform the call
  return get(entityType, query)
    .then((result) => {
      dispatch(queryEntitySuccess(entityType, result));
      return result;
    })
    .catch((errors) => {
      dispatch(queryEntityFail(entityType, errors));
      throw errors;
    });
};

export function fetchEntityRequest(entityType, entityId) {
  return { type: 'ENTITY_FETCH_REQUEST', entityType, entityId };
}

export function fetchEntitySuccess(entityType, entity) {
  return { type: 'ENTITY_FETCH_SUCCESS', entityType, entity };
}

export function fetchEntityFail(entityType, errors) {
  return { type: 'ENTITY_FETCH_FAIL', entityType, errors };
}
