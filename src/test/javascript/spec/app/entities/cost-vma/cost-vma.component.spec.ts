/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VehicleManagerApplicationTestModule } from '../../../test.module';
import { CostVmaComponent } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.component';
import { CostVmaService } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.service';
import { CostVma } from '../../../../../../main/webapp/app/entities/cost-vma/cost-vma.model';

describe('Component Tests', () => {

    describe('CostVma Management Component', () => {
        let comp: CostVmaComponent;
        let fixture: ComponentFixture<CostVmaComponent>;
        let service: CostVmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VehicleManagerApplicationTestModule],
                declarations: [CostVmaComponent],
                providers: [
                    CostVmaService
                ]
            })
            .overrideTemplate(CostVmaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostVmaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostVmaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostVma(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.costs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
