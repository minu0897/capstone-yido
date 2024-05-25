import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function reactcustomscroll() {
  return (
    <Scrollbars
        autoHide
        autoHideTimeout={1000}
        style={{ width: "440px", height: "300px" }}
    >
    </Scrollbars>
  );
}

export default reactcustomscroll;