let initState = {
  addMaterialLaoding: false,
  addMaterialError: null,
  
  updateMaterialLaoding: false,
  updateMaterialError: null,
  updateMaterialSuccess: null,

  updateMaterialInventoryLaoding: false,
  updateMaterialInventoryError: null,
  updateMaterialInventorySuccess: null,
}

export const materialReducer = (state = initState, action) => {
  switch (action.type) {
    case 'POST_ADD_MATERIAL_START':
      return {
        ...state,
        addMaterialLaoding: true,
        addMaterialError: null,
        addMaterialSuccess: null,
      };
    case 'POST_ADD_MATERIAL_SUCCESS':
      return {
        ...state,
        addMaterialLaoding: false,
        addMaterialError: null,
        addMaterialSuccess: action.message,
      };
    case 'POST_ADD_MATERIAL_ERROR':
      return {
        ...state,
        addMaterialLaoding: false,
        addMaterialSuccess: null,
        addMaterialError: action.message,
      };

    case 'UPDATE_MATERIAL_START':
      return {
        ...state,
        updateMaterialLaoding: true,
        updateMaterialError: null,
        updateMaterialSuccess: null,
      };
    case 'UPDATE_MATERIAL_SUCCESS':
      return {
        ...state,
        updateMaterialLaoding: false,
        updateMaterialError: null,
        updateMaterialSuccess: action.message,
      };
    case 'UPDATE_MATERIAL_ERROR':
      return {
        ...state,
        updateMaterialLaoding: false,
        updateMaterialError: action.message,
        updateMaterialSuccess: null,
      };

    case 'UPDATE_MATERIAL_INVENTORY_START':
      return {
        ...state,
        updateMaterialInventoryLaoding: true,
        updateMaterialInventoryError: null,
        updateMaterialInventorySuccess: null,
      };
    case 'UPDATE_MATERIAL_INVENTORY_SUCCESS':
      return {
        ...state,
        updateMaterialInventoryLaoding: false,
        updateMaterialInventoryError: null,
        updateMaterialInventorySuccess: action.message,
      };
    case 'UPDATE_MATERIAL_INVENTORY_ERROR':
      return {
        ...state,
        updateMaterialInventoryLaoding: false,
        updateMaterialInventorySuccess: null,
        updateMaterialInventoryError: action.message,
      }; 
    case 'UPDATE_MATERIAL_INVENTORY_INIT':
      return {
        ...state,
        updateMaterialInventoryLaoding: false,
        updateMaterialInventorySuccess: null,
        updateMaterialInventoryError: null,
      }; 
    default: return {...state};
  }
}