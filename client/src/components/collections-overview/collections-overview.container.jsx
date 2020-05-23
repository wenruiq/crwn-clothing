import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections.overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

// compose is just a way to make it more readable, it exist not just in redux
// Read from right to left, CollectionsOverview passed to WithSpinner first -> WithSpinner(CollectionsOverview)
// then pass that into connect(mapStateToProps) -> connect(mapStateToProps)(WithSpinner(CollectonsOverview))
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
// ** Containers don't render anything, they just pass props down to components, it is used to separate things we don't need on our shop page to the individual components it renders

// // Above code does the same as
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionsOverview)
// );
