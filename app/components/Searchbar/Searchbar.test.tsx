import '@testing-library/jest-dom';
import Searchbar from './Searchbar';
import { RenderResult, render } from '@testing-library/react';

describe('< Searchbar />', () => {
     let component : RenderResult;

    test('should render', () => {
        component = render(<Searchbar/>)
        expect(component.container).toBeInTheDocument()
    })
})
