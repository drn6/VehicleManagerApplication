/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleServiceCostVmaDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma-dialog.component';
import { VehicleServiceCostVmaService } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.service';
import { VehicleServiceCostVma } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.model';
import { VehicleVmaService } from '../../../../../../main/webapp/app/entities/vehicle-vma';

describe('Component Tests', () => {

    describe('VehicleServiceCostVma Management Dialog Component', () => {
        let comp: VehicleServiceCostVmaDialogComponent;
        let fixture: ComponentFixture<VehicleServiceCostVmaDialogComponent>;
        let service: VehicleServiceCostVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleServiceCostVmaDialogComponent],
                providers: [
                    VehicleVmaService,
                    VehicleServiceCostVmaService
                ]
            })
            .overrideTemplate(VehicleServiceCostVmaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleServiceCostVmaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleServiceCostVmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VehicleServiceCostVma(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vehicleServiceCost = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vehicleServiceCostListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VehicleServiceCostVma();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.vehicleServiceCost = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'vehicleServiceCostListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
