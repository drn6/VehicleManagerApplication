/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskVmaDetailComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma-detail.component';
import { VehicleTaskVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.service';
import { VehicleTaskVma } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.model';

describe('Component Tests', () => {

    describe('VehicleTaskVma Management Detail Component', () => {
        let comp: VehicleTaskVmaDetailComponent;
        let fixture: ComponentFixture<VehicleTaskVmaDetailComponent>;
        let service: VehicleTaskVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskVmaDetailComponent],
                providers: [
                    VehicleTaskVmaService
                ]
            })
            .overrideTemplate(VehicleTaskVmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskVmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VehicleTaskVma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehicleTask).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
