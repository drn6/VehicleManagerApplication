/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskDetailsVmaComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.component';
import { VehicleTaskDetailsVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.service';
import { VehicleTaskDetailsVma } from '../../../../../../main/webapp/app/entities/vehicle-task-details-vma/vehicle-task-details-vma.model';

describe('Component Tests', () => {

    describe('VehicleTaskDetailsVma Management Component', () => {
        let comp: VehicleTaskDetailsVmaComponent;
        let fixture: ComponentFixture<VehicleTaskDetailsVmaComponent>;
        let service: VehicleTaskDetailsVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskDetailsVmaComponent],
                providers: [
                    VehicleTaskDetailsVmaService
                ]
            })
            .overrideTemplate(VehicleTaskDetailsVmaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskDetailsVmaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskDetailsVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VehicleTaskDetailsVma(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehicleTaskDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
