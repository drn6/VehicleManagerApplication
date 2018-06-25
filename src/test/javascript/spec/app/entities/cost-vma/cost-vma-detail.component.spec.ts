/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { CostVmaDetailComponent } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma-detail.component';
import { CostVmaService } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.service';
import { CostVma } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.model';

describe('Component Tests', () => {

    describe('CostVma Management Detail Component', () => {
        let comp: CostVmaDetailComponent;
        let fixture: ComponentFixture<CostVmaDetailComponent>;
        let service: CostVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [CostVmaDetailComponent],
                providers: [
                    CostVmaService
                ]
            })
            .overrideTemplate(CostVmaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostVmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostVma(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cost).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
