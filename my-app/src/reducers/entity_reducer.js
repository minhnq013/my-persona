const defaultState = {};

const entityReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const { entityType } = action;
  const stateEntities = state[entityType] || [];

  switch (action.type) {
    case 'ENTITY_CREATE_SUCCESS': {
      // Add the item to the list in state
      const entities = [...stateEntities, action.entity];
      return {
        ...state,
        [entityType]: entities,
      };
    }
    case 'ENTITY_QUERY_SUCCESS': {
      let entitiesList = [];

      // Replace the entity list in the state
      if (action.entitiesList.length) {
        entitiesList = [...action.entitiesList];
      }
      return {
        ...state,
        [entityType]: entitiesList,
      };
    }
    case 'ENTITY_DELETE_SUCCESS': {
      const entitiesList = [...stateEntities];
      const deletedItemIndex = stateEntities.findIndex(item => item.id === action.entity.id);

      // Delete the item from the list
      entitiesList.splice(deletedItemIndex, deletedItemIndex + 1);

      // Update state
      return {
        ...state,
        [entityType]: entitiesList,
      };
    }
    default:
      return state;
  }
};

export default entityReducer;


// 'ENTITY_CREATE_REQUEST'
// 'ENTITY_CREATE_SUCCESS'
// 'ENTITY_CREATE_FAIL'

// 'ENTITY_UPDATE_REQUEST'
// 'ENTITY_UPDATE_SUCCESS'
// 'ENTITY_UPDATE_FAIL'

// 'ENTITY_DELETE_REQUEST'
// 'ENTITY_DELETE_SUCCESS'
// 'ENTITY_DELETE_FAIL'

// 'ENTITY_QUERY_REQUEST'
// 'ENTITY_QUERY_SUCCESS'
// 'ENTITY_QUERY_FAIL'

// 'ENTITY_FETCH_REQUEST'
// 'ENTITY_FETCH_SUCCESS'
// 'ENTITY_FETCH_FAIL'
