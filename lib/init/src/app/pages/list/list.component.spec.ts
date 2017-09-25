import {
    inject,
    TestBed
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested.
 */
import {
    ListComponent
} from './list.component';

describe('ListComponent', () => {
    /**
     * Provide our implementations or mocks to the dependency injector
     */
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            ListComponent
        ]
    }));

    it('should log ngOnInit', inject([ListComponent], (list: ListComponent) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        list.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));

});