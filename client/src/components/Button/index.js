/* Core */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({ size, color, type, loading, children, ...props }) => (
  <button
    {...props}
    className={`button ${props.className} button-size-${size} button-color-${color} button-type-${type}`}
  >
    {loading ? <i className="fa fa-spinner fa-pulse" /> : children}
  </button>
);

Button.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
}

Button.defaultProps = {
  size: 'default',
  color: 'default',
  type: 'default',
  loading: false,
};

export default Button;
