/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskVmaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma-delete-dialog.component';
import { VehicleTaskVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.service';

describe('Component Tests', () => {

    describe('VehicleTaskVma Management Delete Component', () => {
        let comp: VehicleTaskVmaDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleTaskVmaDeleteDialogComponent>;
        let service: VehicleTaskVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskVmaDeleteDialogComponent],
                providers: [
                    VehicleTaskVmaService
                ]
            })
            .overrideTemplate(VehicleTaskVmaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskVmaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskVmaService);
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
