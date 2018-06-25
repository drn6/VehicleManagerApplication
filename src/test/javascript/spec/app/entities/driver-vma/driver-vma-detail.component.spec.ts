/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { DriverVmaDetailComponent } from '../../../../../../main/webapp/app/entities/driver-vma/driver-vma-detail.component';
import { DriverVmaService } from '../../../../../../main/webapp/app/entities/driver-vma/driver-vma.service';
import { DriverVma } from '../../../../../../main/webapp/app/entities/driver-vma/driver-vma.model';

describe('Component Tests', () => {

    describe('DriverVma Management Detail Component', () => {
        let comp: DriverVmaDetailComponent;
        let fixture: ComponentFixture<DriverVmaDetailComponent>;
        let service: DriverVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [DriverVmaDetailComponent],
                providers: [
                    DriverVmaService
                ]
            })
            .overrideTemplate(DriverVmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DriverVmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriverVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DriverVma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.driver).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
