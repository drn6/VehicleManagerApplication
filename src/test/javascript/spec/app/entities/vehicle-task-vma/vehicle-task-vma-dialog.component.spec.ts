/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskVmaDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma-dialog.component';
import { VehicleTaskVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.service';
import { VehicleTaskVma } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.model';
import { VehicleVmaService } from '../../../../../../main/webapp/app/entities/vehicle-vma';
import { DriverVmaService } from '../../../../../../main/webapp/app/entities/driver-vma';

describe('Component Tests', () => {

    describe('VehicleTaskVma Management Dialog Component', () => {
        let comp: VehicleTaskVmaDialogComponent;
        let fixture: ComponentFixture<VehicleTaskVmaDialogComponent>;
        let service: VehicleTaskVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskVmaDialogComponent],
                providers: [
                    VehicleVmaService,
                    DriverVmaService,
                    VehicleTaskVmaService
                ]
            })
            .overrideTemplate(VehicleTaskVmaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskVmaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskVmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VehicleTaskVma(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vehicleTask = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vehicleTaskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VehicleTaskVma();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vehicleTask = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vehicleTaskListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
