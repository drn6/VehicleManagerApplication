/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleServiceCostVmaComponent } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.component';
import { VehicleServiceCostVmaService } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.service';
import { VehicleServiceCostVma } from '../../../../../../main/webapp/app/entities/vehicle-service-cost-vma/vehicle-service-cost-vma.model';

describe('Component Tests', () => {

    describe('VehicleServiceCostVma Management Component', () => {
        let comp: VehicleServiceCostVmaComponent;
        let fixture: ComponentFixture<VehicleServiceCostVmaComponent>;
        let service: VehicleServiceCostVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleServiceCostVmaComponent],
                providers: [
                    VehicleServiceCostVmaService
                ]
            })
            .overrideTemplate(VehicleServiceCostVmaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleServiceCostVmaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleServiceCostVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VehicleServiceCostVma(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehicleServiceCosts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
