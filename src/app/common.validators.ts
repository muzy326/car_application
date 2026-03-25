import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CommonValidators {

  static cannotContainSpaces(control: AbstractControl): ValidationErrors | null {

    if (control.value && control.value.indexOf(' ') >= 0) {
      return { spaceExists: true };
    }

    return null;
  }
}
