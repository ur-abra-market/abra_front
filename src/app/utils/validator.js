export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config){
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = data.trim()==="";
                break;
            case "isEmail": {
                const emailRegExsp = /^\S+@\S+\.\S+$/g;
                statusValidate = (!emailRegExsp.test(data));
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = (!capitalRegExp.test(data));
                break;
            }
            case "isDigitSymbol": {
                const digitRegExp = /\d+/g;
                statusValidate = (!digitRegExp.test(data));
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            case "isPhoneNumber": {
                const firstOption = /(\+90|\+7|8)+[- (]?\d{3}\)?[- ]?\d{2}[ -]?\d{2}[ -]?\d{3}$/g;
                const secondOption = /(\+90|\+7|8)+[- (]?\d{3}\)?[- ]?\d{3}[ -]?\d{2}[ -]?\d{2}$/g;
                const thirdOption = /(\+90|\+7|8)+[- (]?\d{3}\)?[- ]?\d{3}[ -]?\d{4}$/g;
                statusValidate = ((!firstOption.test(data)) || (!secondOption.test(data)) || (!thirdOption.test(data)));
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
            if (error&&(!errors[fieldName])) {
                errors[fieldName] = error;
            }
        }
    }
    return errors
}