import {Directive, OnInit} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS, ValidationErrors} from "@angular/forms";

@Directive({
  selector: '[validate-pid]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatePersonalId, multi: true}]
})
export class ValidatePersonalId implements Validator, OnInit{

  constructor() { }

  ngOnInit(): void {
    console.log("Validator init");
  }

  validate(c: AbstractControl): ValidationErrors | null  {
    if (!c.value)
      return {missing: true};
    let before = c.value.pIdBefore;
    let after = c.value.pIdAfter;
    let all = before+ after;
    if (all.length < 10)
      return {short: true};
    let number = Number(all);
    let modulo = number % 11;
    if (modulo)
      return {notValid: true};
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

}
