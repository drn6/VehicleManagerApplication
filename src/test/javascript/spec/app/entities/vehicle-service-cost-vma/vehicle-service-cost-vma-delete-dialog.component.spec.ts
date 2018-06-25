/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleServiceCostVmaDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma-delete-dialog.component';
import { VehicleServiceCostVmaService } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.service';

describe('Component Tests', () => {

    describe('VehicleServiceCostVma Management Delete Component', () => {
        let comp: VehicleServiceCostVmaDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleServiceCostVmaDeleteDialogComponent>;
        let service: VehicleServiceCostVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleServiceCostVmaDeleteDialogComponent],
                providers: [
                    VehicleServiceCostVmaService
                ]
            })
            .overrideTemplate(VehicleServiceCostVmaDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleServiceCostVmaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleServiceCostVmaService);
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
