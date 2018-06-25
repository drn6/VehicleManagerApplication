/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { DriverVmaComponent } from '../../../../../../main/webapp/app/entities/driver-vma/driver-vma.component';
import { DriverVmaService } from '../../../../../../main/webapp/app/entities/driver-vma/driver-vma.service';
import { DriverVma } from '../../../../../../main/webapp/app/entities/driver-vma/driver-vma.model';

describe('Component Tests', () => {

    describe('DriverVma Management Component', () => {
        let comp: DriverVmaComponent;
        let fixture: ComponentFixture<DriverVmaComponent>;
        let service: DriverVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [DriverVmaComponent],
                providers: [
                    DriverVmaService
                ]
            })
            .overrideTemplate(DriverVmaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DriverVmaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriverVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DriverVma(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.drivers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
