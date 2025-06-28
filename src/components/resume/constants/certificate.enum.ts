export const CERTIFICATE_TYPES = ['LICENSE', 'AWARD'] as const;
export type CertificateType = (typeof CERTIFICATE_TYPES)[number]; // 'LICENSE' | 'AWARD'

export const CERTIFICATE_LABELS: Record<CertificateType, string> = {
  LICENSE: '자격증',
  AWARD: '수상',
};
