import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[wfmDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') private isOpen: boolean = false;

    @HostListener('click') onClick(){
        this.isOpen = !this.isOpen;
    }
}