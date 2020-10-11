export function validateID(param) {
    return {
        personalNumber: /^\d{6,9}$/.test(param),
        identityCard: (() => {
            if (param) {
                let idNumber = param.toString();
                if (!idNumber.match(/^\d{5,9}$/g)) return false;
                // The number is too short - add leading zeroes
                idNumber = idNumber.padStart(9, '0');
                //ID Validation
                const accumulator = idNumber.split('').reduce((count, currChar, currIndex) => {
                    const num = Number(currChar) * ((currIndex % 2) + 1);
                    return count += num > 9 ? num - 9 : num;
                }, 0);
                return (accumulator % 10 === 0);
            }
        })(param),
    }
}

function validateIdentityCard(param) {
    if (param) {
        let idNumber = param.toString();
        if (!idNumber.match(/^\d{5,9}$/g)) return false;
        // The number is too short - add leading zeroes
        idNumber = idNumber.padStart(9, '0');
        //ID Validation
        const accumulator = idNumber.split('').reduce((count, currChar, currIndex) => {
            const num = Number(currChar) * ((currIndex % 2) + 1);
            return count += num > 9 ? num - 9 : num;
        }, 0);
        return (accumulator % 10 === 0);
    }
}


export function validateAll(formData, errors) {
    errors.personalNumber = /^\d{6,9}$/.test(formData.personalNumber) ? "" : "מספר אישי לא תקין";
    errors.identityCard = validateIdentityCard(formData.identityCard) ? "" : "מספר זהות לא תקין";
    errors.cantSubmit = errors.personalNumber || errors.identityCard || errors.dataSource;
    return errors;
}

// export function areEnoughFields(idObj) {
//     let isValid = true;
//     if(!idObj.identityCard && !idObj.personalNumber && !idObj.domainUser){
//         isValid = false;
//     }
//     if (!!idObj.identityCard && !validator(idObj.identityCard).identityCard) {
//         isValid = false;
//     }
//     if (!!idObj.personalNumber && !validator(idObj.personalNumber).personalNumber) {
//         isValid = false;
//     }
// };
