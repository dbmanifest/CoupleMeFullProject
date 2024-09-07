'use client';
import { useState } from 'react';
export default function ImageUpload({ setFile }) {
  return (
    <input
      type="file"
      name="file"
      onChange={(e) => setFile(e.target.files?.[0])}
    />
  );
}