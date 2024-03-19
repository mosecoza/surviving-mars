import useDisclosure from '../app/hooks/useDisclosure';
import { act, renderHook } from '@testing-library/react'

describe("useDisclosure can open and close modals and alert", () => {
  test('initial state is closed', async () => {
    const { result } = renderHook(useDisclosure);
    expect(result.current.isOpen).toBe(false); 
  });

  test('onOpen sets isOpen to true', async () => {
    const { result } = renderHook(() => useDisclosure());

    await act(async () => await result.current.onOpen());

    expect(result.current.isOpen).toBe(true); 
  });

  test('onClose sets isOpen to false', async () => {
    const { result } = renderHook(() => useDisclosure());

    await act(async () => await result.current.onOpen());
    expect(result.current.isOpen).toBe(true); 
    await act(async () => await result.current.onClose());

    expect(result.current.isOpen).toBe(false); 
  });

});