/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EmployeesTestModule } from '../../../test.module';
import { TitleDetailComponent } from '../../../../../../main/webapp/app/entities/title/title-detail.component';
import { TitleService } from '../../../../../../main/webapp/app/entities/title/title.service';
import { Title } from '../../../../../../main/webapp/app/entities/title/title.model';

describe('Component Tests', () => {

    describe('Title Management Detail Component', () => {
        let comp: TitleDetailComponent;
        let fixture: ComponentFixture<TitleDetailComponent>;
        let service: TitleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [TitleDetailComponent],
                providers: [
                    TitleService
                ]
            })
            .overrideTemplate(TitleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TitleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TitleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Title(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.title).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
