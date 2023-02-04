// import React, { useState } from 'react'
import React from 'react';

import PropTypes from 'prop-types';

const Select = ({ options, ...rest }) => {
  // const Select = ({ defaultName, img, options, classes, value, register }) => {
  // const [option, setOption] = useState(value ? value : defaultName)
  // const [list, setList] = useState(false)
  // const styleList = {
  //   height: list ? 'fit-content' : '0px'
  // }

  return (
    // <div className={classes.selectWrapper}>
    //   <div
    //     className={classes.select_headerWrapper}
    //     onClick={() => setList(!list)}
    //   >
    //     <div className={classes.select_header}>{option}</div>
    //     <div className={classes.select_img}>
    //       <img src={img} alt="arrow-down" />
    //     </div>
    //   </div>
    //   <ul className={classes.select_options} style={styleList}>
    //     {options.map((option) => (
    //       <li
    //         key={option}
    //         className={classes.option}
    //         onClick={() => {
    //           setOption(option)
    //           setList(!list)
    //         }}
    //       >
    //         {option}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <select {...rest}>
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  defaultName: PropTypes.string,
  img: PropTypes.string,
  value: PropTypes.string,
  register: PropTypes.object,
  classes: PropTypes.object,
};

export default Select;
