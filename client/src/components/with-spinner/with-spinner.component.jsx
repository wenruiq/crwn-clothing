import React from 'react';

import Spinner from '../spinner/spinner.component';

// HOC, if not loading, then just render whatever wrapped inside normally
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
