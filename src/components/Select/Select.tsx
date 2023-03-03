// import React, { useState } from 'react'
import React, { FC } from 'react';

interface SelectProps {
  options?: any[];
  defaultName?: string;
  img?: string;
  value?: string;
  register?: any;
  classes?: any;
  defaultValue?: any;
}
const Select: FC<SelectProps> = ({ options, ...rest }) => {
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
      {options?.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
