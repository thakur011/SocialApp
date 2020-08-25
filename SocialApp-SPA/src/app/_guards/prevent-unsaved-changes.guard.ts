import {Injectable} from '@angular/core';
import {MemberEditComponent} from '../members/member-edit/member-edit.component';
import { CanDeactivate } from '@angular/router';

@Injectable()
// PreventUnsavedChanges is a guard and is implemented to prevent us to clicking outside if we made any changes.
// CanDeactivate is an interface and <MemberEditComponent> which component this interface applied to.
// canDeactivate is a method. (component) is a parameter of type MemberEditComponent
// component is passed as a parameter to get access to the form in side the component
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate (component: MemberEditComponent){
        if (component.editForm.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}