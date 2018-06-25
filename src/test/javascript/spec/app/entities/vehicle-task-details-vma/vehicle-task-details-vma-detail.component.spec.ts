/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskDetailsVmaDetailComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma-detail.component';
import { VehicleTaskDetailsVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.service';
import { VehicleTaskDetailsVma } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.model';

describe('Component Tests', () => {

    describe('VehicleTaskDetailsVma Management Detail Component', () => {
        let comp: VehicleTaskDetailsVmaDetailComponent;
        let fixture: ComponentFixture<VehicleTaskDetailsVmaDetailComponent>;
        let service: VehicleTaskDetailsVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskDetailsVmaDetailComponent],
                providers: [
                    VehicleTaskDetailsVmaService
                ]
            })
            .overrideTemplate(VehicleTaskDetailsVmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskDetailsVmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskDetailsVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VehicleTaskDetailsVma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehicleTaskDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
