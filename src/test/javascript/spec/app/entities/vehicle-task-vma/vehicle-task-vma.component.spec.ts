/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { VehicleTaskVmaComponent } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.component';
import { VehicleTaskVmaService } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.service';
import { VehicleTaskVma } from '../../../../../../main/webapp/app/entities/vehicle-task-vma/vehicle-task-vma.model';

describe('Component Tests', () => {

    describe('VehicleTaskVma Management Component', () => {
        let comp: VehicleTaskVmaComponent;
        let fixture: ComponentFixture<VehicleTaskVmaComponent>;
        let service: VehicleTaskVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [VehicleTaskVmaComponent],
                providers: [
                    VehicleTaskVmaService
                ]
            })
            .overrideTemplate(VehicleTaskVmaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleTaskVmaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleTaskVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VehicleTaskVma(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehicleTasks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
