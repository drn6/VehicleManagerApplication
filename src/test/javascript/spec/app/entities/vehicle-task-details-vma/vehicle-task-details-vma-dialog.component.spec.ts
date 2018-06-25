/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskDetailsVmaDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma-dialog.component';
import { VehicleTaskDetailsVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.service';
import { VehicleTaskDetailsVma } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.model';
import { VehicleTaskVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-vma';

describe('Component Tests', () => {

    describe('VehicleTaskDetailsVma Management Dialog Component', () => {
        let comp: VehicleTaskDetailsVmaDialogComponent;
        let fixture: ComponentFixture<VehicleTaskDetailsVmaDialogComponent>;
        let service: VehicleTaskDetailsVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskDetailsVmaDialogComponent],
                providers: [
                    VehicleTaskVmaService,
                    VehicleTaskDetailsVmaService
                ]
            })
            .overrideTemplate(VehicleTaskDetailsVmaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskDetailsVmaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskDetailsVmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VehicleTaskDetailsVma(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vehicleTaskDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vehicleTaskDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VehicleTaskDetailsVma();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vehicleTaskDetails = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vehicleTaskDetailsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
