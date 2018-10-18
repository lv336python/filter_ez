import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService} from '../_services/modal.service';

@Component({
    selector: 'app-modal',
    template: '<ng-content></ng-content>'
})

export class ModalsComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        if (!this.id) {
            console.error('modal must have an id');
            return;
        }


        document.body.appendChild(this.element);

        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'modal') {
                console.debug('closing modal');
                modal.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        console.log('>>>>open');
        this.element.style.display = 'block';
        // this.element.children[0].style.display = 'block';
        document.body.classList.add('modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        // this.element.children[0].style.display = 'none';
        document.body.classList.remove('modal-open');
        console.log('<<<<close')
    }
}