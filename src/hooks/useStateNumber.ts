// Buat file terpisah, misalnya useSliceState.ts
'use client';
import { useState } from 'react';

export function useSliceState(initialValue: number) {
    const [slice, setSlice] = useState(initialValue);
  
    const incrementSlice = () => {
      setSlice((prevSlice) => prevSlice + 6);
    };
  
    return { slice, incrementSlice };
  }