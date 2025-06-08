// src/utils/generate-password.util.ts
import { randomBytes } from 'crypto';

export function generate8CharHexPassword(): string {
  return randomBytes(4).toString('hex');
}
