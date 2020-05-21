import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// HOC, if not loading, then just render whatever wrapped inside normally
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
