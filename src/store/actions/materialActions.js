import { addAlert as addMessage } from '../tools/shareActions'

export const add = ({ material, component }) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  dispatch({ type: 'POST_ADD_MATERIAL_START' });
  try {
    let docRef = await getFirestore().collection('materials').add({
      ...material,
      image: 'default.png',
      addedBy: getState().firebase.auth.uid,
      inventoryHistory: [],
      currentQuantity: 0,
    });
    let { image } = material;
    let imageName = `${docRef.id}${image.name}`;
    let uploadImageFile = getFirebase().storage().ref(`images/materials/${imageName}`);
    let uploadFileTask = uploadImageFile.put(image);
    uploadFileTask.on(
      'state_changed',
      snapshoot => {},
      err => dispatch({ type: 'POST_ADD_MATERIAL_ERROR', message: err.message }),
      async () => {
        // get image link for download image
        try {
          let image = await getFirebase().storage().ref('images/materials/')
            .child(`${imageName}`)
            .getDownloadURL();
          await getFirestore().collection('materials').doc(docRef.id).update({
              image
          });
          dispatch({ type: 'POST_ADD_MATERIAL_SUCCESS', message: `${material.name} added with success ;)` });
          component.target.reset();
          component.push('/');
        } catch (error) {
          dispatch({ type: 'POST_ADD_MATERIAL_ERROR', message: error.message });          
        }  
      }
    )
  } catch (error) {
    dispatch({ type: 'POST_ADD_MATERIAL_ERROR', message: error.message });
  }
}


/**
 * add error 
 * @see ../tools/shareActions
 */
export const addAlert = addMessage;

/**
 * modify a inventory state of current material
 * @param {Object} material some details about material inventory like quantity, price added1
 */
export const modifyInventory = (material) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  let { currentMaterialId, quantityToAdd, currentMaterialName, unit, addedAt: dateOfInventory } = material;
  dispatch({ type: 'UPDATE_MATERIAL_INVENTORY_START'})
  try {
    let currentMaterial = await getFirestore().collection('materials').doc(currentMaterialId).get();
    let { currentQuantity } = currentMaterial.data();
    await getFirestore().collection('materials').doc(currentMaterialId).update({
      currentQuantity: parseFloat(currentQuantity) + parseFloat(quantityToAdd),
      inventoryHistory: getFirebase().firestore.FieldValue.arrayUnion({
        addedBy: getState().firebase.auth.uid,
        quantity: quantityToAdd,
        price: material.price,
        dateOfInventory,
        addedAt: Date.now(),
        projectId: material.projectId,
      })
    })
    dispatch({
      type: 'UPDATE_MATERIAL_INVENTORY_SUCCESS', 
      message: `You add ${quantityToAdd} ${unit} of ${currentMaterialName} :)`}
    );
  } catch (error) {
    dispatch({ type: 'UPDATE_MATERIAL_INVENTORY_ERROR', message: error.message });    
  }
} 

export const update = ({material, componet}) => async (dispatch, getState, {getFirestore}) => {
  dispatch({ type: 'UPDATE_MATERIAL_START' });
  try {
    await getFirestore().collection('materials').doc(material.currentDoc).update({
      name: material.name,
      unit: material.unit,
      currency: material.currency,
      threshold: material.threshold,
    });
    dispatch({ type: 'UPDATE_MATERIAL_SUCCESS', message: `You update ${material.name} with success ;)` });
  } catch (error) {
    dispatch({ type: 'UPDATE_MATERIAL_ERROR', message: error.message });    
  }
}
