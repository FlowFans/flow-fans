import React, { PureComponent } from 'react';
import {
  // Box,
  Typography,
  Button,
} from '@material-ui/core';
import classnames from 'classnames';

import Box from './Box';
import BoxStyle from './Box.module.css';

class Footer extends PureComponent {

  render() {

    const { footerVisible, t } = this.props;

    // console.log(19, footerVisible);

    if (!footerVisible) return null;

    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classnames("footer", BoxStyle.footer)}>
          <Box className={BoxStyle.footer_title}>
            <Typography variant="h5" className="footer_title">
              {t('more')}
            </Typography>
          </Box>
          <Button
            variant="contained"
            className="submitBtn"
            style={{ textTransform: 'none' }}
            onClick={() => {
              window.open('https://github.com/FlowFans/FlowFans.org/issues');
            }}
          >
            {t('submit')}
          </Button>
        </Box>
      </>
    )

  }

}

export default Footer;
