'use client';

import { useDiagnosis } from '@/hooks/useDiagnosis';
import { DiagnosisIntro } from '@/components/diagnosis';

export default function DiagnosisPage() {
  const { selectedRole, selectRole, startTest } = useDiagnosis();

  return (
    <div className='min-h-screen px-4 pb-16 pt-24'>
      {/* 배경 */}
      <div className='pointer-events-none fixed inset-0'>
        <div
          className='absolute inset-0'
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 100% 100%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div className='z-14 relative'>
        <DiagnosisIntro
          onStart={startTest}
          selectedRole={selectedRole}
          onRoleSelect={selectRole}
        />
      </div>
    </div>
  );
}
