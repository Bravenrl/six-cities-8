import {renderHook} from '@testing-library/react-hooks';

import useMap from './use-map';
import { useRef } from 'react';
import { GenerateFakeCity } from '../mock/mock';

describe('Hook: useMap', () => {
  it('should render correctly', () => {
    const mapRef = renderHook(() => useRef(null)).result.current;
    const {result} = renderHook(() => useMap(mapRef, GenerateFakeCity()));
    expect(result).toBeInstanceOf(Object);
  });
});
