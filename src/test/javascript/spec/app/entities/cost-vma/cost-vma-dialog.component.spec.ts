/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { CostVmaDialogComponent } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma-dialog.component';
import { CostVmaService } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.service';
import { CostVma } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.model';
import { VehicleTaskVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-vma';

describe('Component Tests', () => {

    describe('CostVma Management Dialog Component', () => {
        let comp: CostVmaDialogComponent;
        let fixture: ComponentFixture<CostVmaDialogComponent>;
        let service: CostVmaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [CostVmaDialogComponent],
                providers: [
                    VehicleTaskVmaService,
                    CostVmaService
                ]
            })
            .overrideTemplate(CostVmaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostVmaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostVmaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostVma(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cost = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostVma();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cost = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
