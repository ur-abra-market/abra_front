import React, {useState, useEffect} from "react";
import style from "./passwordComplexity.module.css";
import PasswordStrengthIndicatorItem from "../passwordStrengthIndicatorItem/passwordStrengthIndicatorItem";
import PropTypes from "prop-types";

const PasswordComplexity = ({valueOfNewPassword}) => {
    const [passwordValidyty, setPasswordValidyty] = useState({
        minLength: null,
        digitSymbol: null,
        capitalSymbol: null,
        containsSpecSymbols: null,
    })

    useEffect(()=> {
        const digitRegExp = /\d/g;
        const capitalRegExp = /[A-Z]/g;
        const specSymbolRegExp = /[!#+*]/g;
        setPasswordValidyty({
            minLength: valueOfNewPassword?.length >= 8,
            digitSymbol: !!digitRegExp.test(valueOfNewPassword),
            capitalSymbol: !!capitalRegExp.test(valueOfNewPassword),
            containsSpecSymbols: !!specSymbolRegExp.test(valueOfNewPassword),
        })

    }, [valueOfNewPassword])

    return (
        <>
        <div className={style.requirementsWrapper}>
            <PasswordStrengthIndicatorItem
            text="1 capital letter"
            isValid = {passwordValidyty?.capitalSymbol}
            />
            <PasswordStrengthIndicatorItem
            text="1 number"
            isValid = {passwordValidyty?.digitSymbol}
            />
            <PasswordStrengthIndicatorItem
            text="8 symbols"
            isValid = {passwordValidyty?.minLength}
            />
            <PasswordStrengthIndicatorItem
            text="!/#/+/*"
            isValid = {passwordValidyty?.containsSpecSymbols}
            />
        </div>
        </>
    );
};
export default PasswordComplexity;

PasswordComplexity.propTypes={
    valueOfNewPassword: PropTypes.string,
}