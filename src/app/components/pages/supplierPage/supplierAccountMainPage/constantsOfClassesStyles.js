import style from "./supplierAccountMainPage.module.css";

export const textFieldClasses = {
  label: `${style.textFieldLabel}`,
  inputWrapper: `${style.inputWrapper}`,
  input: `${style.textFieldInput}`,
};
export const accountDetails__textFieldClasses = {
  label: `${style.textFieldLabel}`,
  inputWrapper: `${style.inputWrapper}`,
  input: `${style.accountDetails__textFieldInput}`,
  password: {
    inputTextFieldPassword: `${style.accountDetails__inputTextFieldPassword}`,
  },
};

export const notificationCheckboxClasses = {
  labelCheckbox: `${style.notificationLabelCheckbox}`,
  inputCheckbox: `${style.notificationInputCheckbox}`,
};
export const checkboxClasses = {
  labelCheckbox: `${style.labelCheckbox}`,
  inputCheckbox: `${style.inputCheckbox}`
};
export const SelectCountryClasses = {
  selectWrapper: `${style.selectWrapper}`,
  select_headerWrapper: `${style.select_headerWrapper}`,
  select_header: `${style.select_header}`,
  select_options: `${style.select_options__country}`,
  option: `${style.option}`,
}
export const SelectPersonalPhoneClasses = {
  selectWrapper: `${style.selectWrapper}`,
  select_headerWrapper: `${style.select_headerWrapper}`,
  select_header: `${style.select_header}`,
  select_options: `${style.select_options__phonePersonal}`,
  option: `${style.option}`,
}
export const SelectBusinessPhoneClasses = {
  selectWrapper: `${style.selectWrapper}`,
  select_headerWrapper: `${style.select_headerWrapper}`,
  select_header: `${style.select_header}`,
  select_options: `${style.select_options__phoneBusiness}`,
  option: `${style.option}`,
}
export const SelectBusinessSectorClasses = {
  selectWrapper: `${style.selectWrapper__businessSector}`,
  select_headerWrapper: `${style.select_headerWrapper}`,
  select_header: `${style.select_header}`,
  select_options: `${style.select_options__businessSector}`,
  option: `${style.option}`,
}
export const SelectNumberOfEmployeesClasses = {
  selectWrapper: `${style.selectWrapper__numberOfEmployees}`,
  select_headerWrapper: `${style.select_headerWrapper}`,
  select_header: `${style.select_header}`,
  select_options: `${style.select_options__numberOfEmployees}`,
  option: `${style.option}`,
}