import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './ShipInputField.css';

const ShipInputField = forwardRef(
  (
    {
      id,
      children,
      type = 'text',
      value,
      min = 0,
      max = 9,
      onChangeFunc,
      className = 'form-field',
    },
    ref
  ) => {
    return (
      <div className={className}>
        <label htmlFor={id}>{children}</label>
        <input
          id={id}
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={onChangeFunc}
          ref={ref}
        />
      </div>
    );
  }
);

ShipInputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChangeFunc: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ShipInputField.displayName = 'NumberInputField';

export default ShipInputField;
