/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleVmaComponent } from '../../../../../../main/webapp/app/entities/vehicle-vma/vehicle-vma.component';
import { VehicleVmaService } from '../../../../../../main/webapp/app/entities/vehicle-vma/vehicle-vma.service';
import { VehicleVma } from '../../../../../../main/webapp/app/entities/vehicle-vma/vehicle-vma.model';

describe('Component Tests', () => {

    describe('VehicleVma Management Component', () => {
        let comp: VehicleVmaComponent;
        let fixture: ComponentFixture<VehicleVmaComponent>;
        let service: VehicleVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleVmaComponent],
                providers: [
                    VehicleVmaService
                ]
            })
            .overrideTemplate(VehicleVmaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleVmaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VehicleVma(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehicles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
