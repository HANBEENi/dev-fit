export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// 페이지뷰 추적
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_ID) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
};

// 이벤트 추적
export const event = (action: string, params: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && GA_ID) {
    window.gtag('event', action, params);
  }
};

// 진단 관련 이벤트
export const trackDiagnosisStart = () => {
  event('diagnosis_start', { test_type: 'individual' });
};

export const trackDiagnosisComplete = (resultType: string, stressType: string) => {
  event('diagnosis_complete', {
    test_type: 'individual',
    result_type: resultType,
    stress_type: stressType,
  });
};

// 팀 분석 관련 이벤트
export const trackTeamAnalysisStart = () => {
  event('team_analysis_start', { test_type: 'team' });
};

export const trackTeamAnalysisComplete = (teamSize: number, teamName: string) => {
  event('team_analysis_complete', {
    test_type: 'team',
    team_size: teamSize,
    team_name: teamName,
  });
};

// 공유 이벤트
export const trackShare = (method: string, contentType: string) => {
  event('share', {
    method,
    content_type: contentType,
  });
};

// gtag 타입 선언
declare global {
  interface Window {
    gtag: (command: 'config' | 'event', targetId: string, config?: Record<string, unknown>) => void;
  }
}
