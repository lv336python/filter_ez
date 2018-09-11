import {AbstractControl, ValidatorFn} from "@angular/forms";


export function TextFormatDirective(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const correct = nameRe.test(control.value);
        return correct ? null : {'wrongFormat': {value: control.value}} ;
    };
}