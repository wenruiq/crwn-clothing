import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Convert object to array for collection overview componen to select
// need to look into the structure of shop.data to understand the structure
// and then see collections-overview.component to see how it is being selected and rendered
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  );
