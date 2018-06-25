/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleVmaDetailComponent } from '../../../../../../main/webapp/app/entities/vehicle-vma/vehicle-vma-detail.component';
import { VehicleVmaService } from '../../../../../../main/webapp/app/entities/vehicle-vma/vehicle-vma.service';
import { VehicleVma } from '../../../../../../main/webapp/app/entities/vehicle-vma/vehicle-vma.model';

describe('Component Tests', () => {

    describe('VehicleVma Management Detail Component', () => {
        let comp: VehicleVmaDetailComponent;
        let fixture: ComponentFixture<VehicleVmaDetailComponent>;
        let service: VehicleVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleVmaDetailComponent],
                providers: [
                    VehicleVmaService
                ]
            })
            .overrideTemplate(VehicleVmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleVmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VehicleVma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehicle).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
