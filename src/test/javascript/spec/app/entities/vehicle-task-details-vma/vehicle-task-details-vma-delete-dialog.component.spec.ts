/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskDetailsVmaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma-delete-dialog.component';
import { VehicleTaskDetailsVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.service';

describe('Component Tests', () => {

    describe('VehicleTaskDetailsVma Management Delete Component', () => {
        let comp: VehicleTaskDetailsVmaDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleTaskDetailsVmaDeleteDialogComponent>;
        let service: VehicleTaskDetailsVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskDetailsVmaDeleteDialogComponent],
                providers: [
                    VehicleTaskDetailsVmaService
                ]
            })
            .overrideTemplate(VehicleTaskDetailsVmaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskDetailsVmaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskDetailsVmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
