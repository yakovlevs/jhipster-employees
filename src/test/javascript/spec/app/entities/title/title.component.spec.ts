/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmployeesTestModule } from '../../../test.module';
import { TitleComponent } from '../../../../../../main/webapp/app/entities/title/title.component';
import { TitleService } from '../../../../../../main/webapp/app/entities/title/title.service';
import { Title } from '../../../../../../main/webapp/app/entities/title/title.model';

describe('Component Tests', () => {

    describe('Title Management Component', () => {
        let comp: TitleComponent;
        let fixture: ComponentFixture<TitleComponent>;
        let service: TitleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [TitleComponent],
                providers: [
                    TitleService
                ]
            })
            .overrideTemplate(TitleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TitleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TitleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Title(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.titles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
