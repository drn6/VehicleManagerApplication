/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleServiceCostVmaDetailComponent } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma-detail.component';
import { VehicleServiceCostVmaService } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.service';
import { VehicleServiceCostVma } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.model';

describe('Component Tests', () => {

    describe('VehicleServiceCostVma Management Detail Component', () => {
        let comp: VehicleServiceCostVmaDetailComponent;
        let fixture: ComponentFixture<VehicleServiceCostVmaDetailComponent>;
        let service: VehicleServiceCostVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleServiceCostVmaDetailComponent],
                providers: [
                    VehicleServiceCostVmaService
                ]
            })
            .overrideTemplate(VehicleServiceCostVmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleServiceCostVmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleServiceCostVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VehicleServiceCostVma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehicleServiceCost).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
