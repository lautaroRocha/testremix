import '@testing-library/jest-dom';
import PaymentMethods from './PaymentMethods';
import { RenderResult, render } from '@testing-library/react';

describe('< PaymentMethods />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<PaymentMethods/>)
        expect(component.container).toBeInTheDocument()
    })
})
