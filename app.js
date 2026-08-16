/**
 * Easy Accident Report - 차량 사고 간편 신고 앱
 * Mobile-first, offline-capable, multi-language
 */

(function () {
  'use strict';

  // ========== i18n ==========
  const translations = {
    ko: {
      appName: 'CrashReport',
      tagline: '안전 확인 → 사진 → 보험 서식 보고서',
      betaBanner: '베타 · 접수 보조 도구',
      disclaimer: '본 앱은 보험 접수 보조 도구입니다. 최종 청구는 보험사 절차를 따릅니다. 응급·의료 조언이 아닙니다. 위치·사진은 기기 권한에 따라 달라질 수 있으며, 데이터는 주로 기기에 저장되어 삭제될 수 있습니다.',
      startReport: '사고 신고 시작하기',
      continueDraft: '작성 중인 신고 이어하기',
      newReport: '새 신고 시작',
      features: [
        { title: '현장 사진 촬영', desc: '사고 현장, 차량 손상 부위를 쉽게 촬영' },
        { title: '상대방·증인 정보', desc: '운전자, 연락처, 보험 정보를 체계적으로 수집' },
        { title: '원클릭 공유', desc: '완성된 보고서를 이메일·메신저로 바로 전송' }
      ],
      steps: {
        basic: '기본 정보',
        scene: '현장 사진',
        myVehicle: '내 차량',
        otherVehicle: '상대 차량',
        witnesses: '증인',
        review: '검토 및 제출'
      },
      basic: {
        title: '사고 기본 정보',
        datetime: '사고 일시',
        location: '사고 장소',
        getLocation: '현재 위치 가져오기',
        locationHint: 'GPS로 자동 입력하거나 직접 입력하세요',
        description: '사고 경위',
        descPlaceholder: '어떻게 사고가 났는지 간단히 적어주세요. (예: 직진 중 옆 차량이 차선 변경하며 충돌)',
        weather: '날씨 / 도로 상태',
        weatherOptions: ['맑음', '흐림', '비', '눈', '안개', '기타'],
        injuries: '인명 피해',
        injuriesNone: '없음',
        injuriesMinor: '경상',
        injuriesSerious: '중상',
        police: '경찰 신고 번호 (선택)',
        policePlaceholder: '신고했다면 접수 번호'
      },
      scene: {
        title: '사고 현장 사진',
        hint: '전체 현장, 도로 표지, 스키드 마크, 주변 환경을 촬영하세요. (최소 1장 권장)',
        addPhoto: '사진 추가',
        camera: '카메라',
        gallery: '갤러리'
      },
      myVehicle: {
        title: '내 차량 정보',
        plate: '차량 번호',
        platePlaceholder: '12가 3456',
        makeModel: '제조사 / 모델',
        color: '색상',
        insurance: '보험사',
        policy: '증권 번호 (선택)',
        photos: '차량 손상 사진',
        photosHint: '전면, 후면, 측면, 손상 부위 클로즈업을 촬영하세요'
      },
      otherVehicle: {
        title: '상대 차량 정보',
        plate: '차량 번호',
        makeModel: '제조사 / 모델',
        color: '색상',
        driverName: '운전자 성명',
        driverPhone: '연락처',
        driverLicense: '면허 번호 (선택)',
        insurance: '보험사',
        policy: '증권 번호 / 보험 정보',
        photos: '상대 차량 사진',
        photosHint: '차량 전체, 손상 부위, 번호판, 보험 증서 사진을 촬영하세요',
        noOther: '상대 차량 없음 (단독 사고)',
        addOther: '상대 차량 정보 입력'
      },
      witnesses: {
        title: '증인 정보',
        hint: '목격자가 있다면 이름과 연락처를 남겨주세요. (선택 사항)',
        addWitness: '증인 추가',
        name: '성명',
        phone: '연락처',
        statement: '진술 요약 (선택)',
        none: '증인 없음'
      },
      review: {
        title: '검토 및 제출',
        subtitle: '내용을 확인한 후 공유하거나 저장하세요',
        generatePdf: 'PDF 보고서 생성',
        share: '공유하기',
        download: 'PDF 다운로드',
        email: '이메일로 보내기',
        copyText: '텍스트 복사',
        saveDraft: '임시 저장',
        clearAll: '초기화',
        noPhotos: '사진 없음',
        photosCount: '장',
        confirmClear: '모든 데이터를 삭제하고 처음부터 다시 시작하시겠습니까?'
      },
      common: {
        next: '다음',
        prev: '이전',
        save: '저장',
        cancel: '취소',
        delete: '삭제',
        required: '필수',
        optional: '선택',
        loading: '처리 중...',
        success: '완료되었습니다',
        error: '오류가 발생했습니다',
        locationSuccess: '위치를 가져왔습니다',
        locationError: '위치를 가져올 수 없습니다. 직접 입력해주세요',
        photoAdded: '사진이 추가되었습니다',
        draftSaved: '임시 저장되었습니다',
        shareNotSupported: '이 기기에서는 공유를 지원하지 않습니다. PDF를 다운로드하세요.',
        pdfReady: 'PDF가 준비되었습니다',
        copied: '클립보드에 복사되었습니다',
        lang: 'Language'
      },
      validation: {
        needDescription: '사고 경위를 입력해주세요',
        needScenePhoto: '현장 사진을 최소 1장 촬영해주세요',
        needMyPlate: '내 차량 번호를 입력해주세요'
      },
      profile: {
        title: '내 정보 사전 등록',
        subtitle: '한 번 등록하면 사고 신고 시 자동으로 불러옵니다',
        name: '이름 (신고자)',
        phone: '연락처',
        insurance: '보험사',
        policy: '증권 번호',
        plate: '차량 번호',
        makeModel: '제조사 / 모델',
        color: '차량 색상',
        save: '저장하기',
        saved: '내 정보가 저장되었습니다',
        manage: '내 정보 관리',
        prefilled: '사전 등록 정보로 자동 입력됨',
        empty: '등록된 정보가 없습니다'
      },
      photo: {
        take: '카메라 촬영',
        gallery: '갤러리 선택',
        add: '사진 추가'
      }
    },
    en: {
      appName: 'CrashReport',
      tagline: 'Safety first → photos → insurer-ready report',
      betaBanner: 'Beta · Claim support tool',
      disclaimer: 'This app is a claim support tool, not official insurer filing. Final claims follow your insurer’s process. Not medical or emergency advice. Location and photos depend on device permissions. Data is stored mainly on-device and may be lost if cache is cleared.',
      startReport: 'Start Accident Report',
      continueDraft: 'Continue Draft',
      newReport: 'New Report',
      features: [
        { title: 'Scene Photos', desc: 'Easily capture the scene and vehicle damage' },
        { title: 'Party & Witness Info', desc: 'Collect driver, contact and insurance details systematically' },
        { title: 'One-tap Share', desc: 'Send the completed report via email or messenger' }
      ],
      steps: {
        basic: 'Basic Info',
        scene: 'Scene Photos',
        myVehicle: 'My Vehicle',
        otherVehicle: 'Other Vehicle',
        witnesses: 'Witnesses',
        review: 'Review & Submit'
      },
      basic: {
        title: 'Accident Basic Info',
        datetime: 'Date & Time',
        location: 'Location',
        getLocation: 'Get Current Location',
        locationHint: 'Auto-fill with GPS or enter manually',
        description: 'What Happened',
        descPlaceholder: 'Briefly describe how the accident occurred. (e.g. While going straight, the adjacent vehicle changed lanes and collided)',
        weather: 'Weather / Road Condition',
        weatherOptions: ['Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Other'],
        injuries: 'Injuries',
        injuriesNone: 'None',
        injuriesMinor: 'Minor',
        injuriesSerious: 'Serious',
        police: 'Police Report No. (optional)',
        policePlaceholder: 'If reported, enter the case number'
      },
      scene: {
        title: 'Accident Scene Photos',
        hint: 'Capture overall scene, road signs, skid marks, surroundings. (at least 1 recommended)',
        addPhoto: 'Add Photo',
        camera: 'Camera',
        gallery: 'Gallery'
      },
      myVehicle: {
        title: 'My Vehicle Info',
        plate: 'License Plate',
        platePlaceholder: 'ABC 1234',
        makeModel: 'Make / Model',
        color: 'Color',
        insurance: 'Insurance Company',
        policy: 'Policy Number (optional)',
        photos: 'Vehicle Damage Photos',
        photosHint: 'Front, rear, sides, and close-ups of damage'
      },
      otherVehicle: {
        title: 'Other Vehicle Info',
        plate: 'License Plate',
        makeModel: 'Make / Model',
        color: 'Color',
        driverName: 'Driver Name',
        driverPhone: 'Phone',
        driverLicense: 'License No. (optional)',
        insurance: 'Insurance Company',
        policy: 'Policy / Insurance Info',
        photos: 'Other Vehicle Photos',
        photosHint: 'Full vehicle, damage, plate, insurance card photos',
        noOther: 'No other vehicle (single vehicle accident)',
        addOther: 'Enter Other Vehicle Info'
      },
      witnesses: {
        title: 'Witness Info',
        hint: 'If there are witnesses, leave their name and contact. (optional)',
        addWitness: 'Add Witness',
        name: 'Name',
        phone: 'Phone',
        statement: 'Statement summary (optional)',
        none: 'No witnesses'
      },
      review: {
        title: 'Review & Submit',
        subtitle: 'Check the details then share or save',
        generatePdf: 'Generate PDF Report',
        share: 'Share',
        download: 'Download PDF',
        email: 'Send via Email',
        copyText: 'Copy Text',
        saveDraft: 'Save Draft',
        clearAll: 'Reset',
        noPhotos: 'No photos',
        photosCount: 'photos',
        confirmClear: 'Delete all data and start over?'
      },
      common: {
        next: 'Next',
        prev: 'Back',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        required: 'Required',
        optional: 'Optional',
        loading: 'Processing...',
        success: 'Done',
        error: 'An error occurred',
        locationSuccess: 'Location retrieved',
        locationError: 'Could not get location. Please enter manually',
        photoAdded: 'Photo added',
        draftSaved: 'Draft saved',
        shareNotSupported: 'Sharing is not supported on this device. Please download the PDF.',
        pdfReady: 'PDF is ready',
        copied: 'Copied to clipboard',
        lang: '언어'
      },
      validation: {
        needDescription: 'Please enter the accident description',
        needScenePhoto: 'Please take at least one scene photo',
        needMyPlate: 'Please enter your vehicle plate number'
      },
      profile: {
        title: 'My Profile (Pre-register)',
        subtitle: 'Register once — auto-filled when reporting an accident',
        name: 'Name (Reporter)',
        phone: 'Phone',
        insurance: 'Insurance Company',
        policy: 'Policy Number',
        plate: 'License Plate',
        makeModel: 'Make / Model',
        color: 'Vehicle Color',
        save: 'Save Profile',
        saved: 'Profile saved',
        manage: 'Manage My Info',
        prefilled: 'Auto-filled from your profile',
        empty: 'No profile registered yet'
      },
      photo: {
        take: 'Take Photo',
        gallery: 'From Gallery',
        add: 'Add Photo'
      }
    }
  };

  // ========== State ==========
  const PROFILE_KEY = 'accident_user_profile';
  const PREMIUM_KEY = 'accident_premium_v1';
  let currentLang = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  let currentStep = 'home';
  let state = getDefaultState();
  let pdfBlob = null;
  let userProfile = loadProfile();
  let reportMode = 'self'; // 'self' | 'third'
  let thirdPartyOverride = null; // { country, insurance } when reportMode === 'third'

  // ========== Premium / Monetization ==========
  // Best practice: emergency & safety stay free. Paid unlocks full claim package.
  // Pricing includes reserved budget for future native crash-detection SDK.
  const PRICING = {
    monthly: { gbp: 2.99, label: { ko: '월간', en: 'Monthly' } },
    yearly: { gbp: 14.99, label: { ko: '연간 (약 58% 할인)', en: 'Yearly (~58% off)' } }
  };

  function isPremium() {
    try {
      const raw = localStorage.getItem(PREMIUM_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.lifetime) return true;
      if (data.expiresAt && Date.now() < data.expiresAt) return true;
      return false;
    } catch (e) { return false; }
  }

  
  function openStripeCheckout(plan) {
    const cfg = (window.CRASHREPORT_CONFIG && window.CRASHREPORT_CONFIG.stripe) || {};
    const link = plan === 'yearly' ? cfg.paymentLinkYearly : cfg.paymentLinkMonthly;
    if (link) {
      if (typeof window.gtag === 'function') {
        const price = plan === 'yearly' ? PRICING.yearly.gbp : PRICING.monthly.gbp;
        gtag('event', 'begin_checkout', {
          currency: 'GBP',
          value: price,
          items: [{ item_name: plan === 'yearly' ? 'CrashReport UK Yearly' : 'CrashReport UK Monthly', price: price, quantity: 1 }]
        });
      }
      window.location.href = link;
      return true;
    }
    activatePremium(plan);
    showToast(currentLang === 'ko' ? '베타: 데모 Premium (Stripe 링크 미설정)' : 'Beta: demo Premium (set Stripe Payment Link)');
    currentStep = 'home'; render(); return false;
  }

  function activatePremium(plan) {
    const days = plan === 'yearly' ? 365 : 30;
    const data = {
      plan: plan || 'monthly',
      activatedAt: Date.now(),
      expiresAt: Date.now() + days * 24 * 60 * 60 * 1000,
      // Real Stripe would set this server-side after payment
      source: 'demo_unlock'
    };
    localStorage.setItem(PREMIUM_KEY, JSON.stringify(data));
  }

  function getEmergencyNumbers() {
    const code = (typeof getActiveCountry === 'function')
      ? getActiveCountry()
      : ((thirdPartyOverride && thirdPartyOverride.country) || (userProfile && userProfile.country) || 'KR');
    const ko = currentLang === 'ko';
    // UI labels follow selected language only; tel numbers stay local
    const map = {
      KR: ko
        ? [{ name: '경찰 112', tel: '112' }, { name: '응급 119', tel: '119' }]
        : [{ name: 'Police 112', tel: '112' }, { name: 'Emergency 119', tel: '119' }],
      US: ko
        ? [{ name: '긴급 911', tel: '911' }]
        : [{ name: 'Emergency 911', tel: '911' }],
      UK: ko
        ? [{ name: '긴급 999', tel: '999' }, { name: '경찰 101', tel: '101' }]
        : [{ name: 'Emergency 999', tel: '999' }, { name: 'Police 101', tel: '101' }],
      AU: ko
        ? [{ name: '긴급 000', tel: '000' }]
        : [{ name: 'Emergency 000', tel: '000' }],
      JP: ko
        ? [{ name: '경찰 110', tel: '110' }, { name: '응급 119', tel: '119' }]
        : [{ name: 'Police 110', tel: '110' }, { name: 'Emergency 119', tel: '119' }]
    };
    return map[code] || map.KR;
  }

  // Country-specific safety tips: secondary crash prevention + hazard lights
  function getSafetyGuide() {
    const code = (typeof getActiveCountry === 'function')
      ? getActiveCountry()
      : ((thirdPartyOverride && thirdPartyOverride.country) || userProfile.country || 'KR');
    const ko = currentLang === 'ko';
    const common = {
      hazardTitle: ko ? '비상등 (Hazard) 사용' : 'Hazard lights',
      hazardBody: ko
        ? '사고·정차 직후 바로 비상등을 켜세요. 뒤차에게 “멈춰 있음”을 알리는 가장 빠른 방법입니다. 이동을 마친 뒤에도 안전 구역에 있을 때는 켜 두는 것이 좋습니다.'
        : 'Turn hazard lights on immediately after a crash or stop. It is the fastest way to warn traffic behind you. Keep them on while you remain in a safe area.',
      secondaryTitle: ko ? '2차 사고 예방' : 'Prevent a secondary crash',
      secondary: ko
        ? [
            '가능하면 갓길·안전 구역으로 이동하세요.',
            '목·허리가 아프면 억지로 움직이지 말고 구조를 요청하세요.',
            '도로 위·터널·커브에서는 특히 뒤차 충돌에 주의하세요.',
            '야간·우천 시 반사판·손전등이 있으면 활용하세요.'
          ]
        : [
            'Move to the shoulder or a safe area if you can.',
            'Do not force movement if you have neck or back pain — call for help.',
            'Watch for traffic behind you, especially on highways, tunnels, and curves.',
            'At night or in rain, use reflectors or a flashlight if available.'
          ]
    };
    const local = {
      KR: {
        tip: ko
          ? '한국: 고속도로·자동차전용도로는 갓길로 대피하고, 가능하면 안전삼각대를 후방에 두세요. 2차 사고 위험이 큽니다.'
          : 'Korea: On expressways, move to the shoulder if you can and place a warning triangle behind the vehicle when safe.'
      },
      US: {
        tip: ko
          ? '미국: 부상이 없고 차가 움직일 수 있으면, 많은 주에서 차로를 비우고 갓길·안전 지대로 이동하는 것이 권장됩니다.'
          : 'US: If no one is hurt and the vehicle can move, many states expect you to clear the lane and pull off the roadway when possible.'
      },
      UK: {
        tip: ko
          ? '영국: 고속도로에서는 가능하면 가드레일 밖 등 더 안전한 곳으로 대피하세요. Hazard lights를 켜고 비상 전화(Emergency 999)를 이용하세요.'
          : 'UK: On motorways, getting behind the barrier is often safer if you can. Keep hazard lights on and use 999 if needed.'
      },
      AU: {
        tip: ko
          ? '호주: Emergency lane·갓길을 이용하고, 외곽·야간에는 다른 차량·동물에 주의하세요. Hazard lights를 켜 두세요.'
          : 'Australia: Use the emergency lane/shoulder when safe. Be extra careful at night or in rural areas. Keep hazard lights on.'
      },
      JP: {
        tip: ko
          ? '일본: 가능하면 갓길로 이동하고 비상등을 켜세요. 정차 표시·반사판이 있으면 후방에 설치해 2차 사고를 줄이세요.'
          : 'Japan: Move to the shoulder if possible and turn on hazard lights. Use a warning triangle/reflector behind the vehicle when safe.'
      }
    };
    return Object.assign({}, common, local[code] || local.KR);
  }

  function getDefaultProfile() {
    return {
      name: '',
      phone: '',
      insurance: '',
      policy: '',
      plate: '',
      makeModel: '',
      color: '',
      country: 'KR' // KR | US | UK | AU | JP
    };
  }


  // Default map centers per country (for preview + fallback when GPS pending)
  const MAP_REGIONS = {
    KR: { lat: 37.5665, lng: 126.9780, zoom: 11, label: { ko: '한국 (서울 기준)', en: 'Korea (Seoul)' }, maps: 'google' },
    US: { lat: 39.8283, lng: -98.5795, zoom: 4, label: { ko: '미국', en: 'United States' }, maps: 'google' },
    UK: { lat: 51.5074, lng: -0.1278, zoom: 10, label: { ko: '영국 (런던)', en: 'United Kingdom (London)' }, maps: 'google' },
    AU: { lat: -25.2744, lng: 133.7751, zoom: 4, label: { ko: '호주', en: 'Australia' }, maps: 'google' },
    JP: { lat: 35.6762, lng: 139.6503, zoom: 10, label: { ko: '일본 (도쿄)', en: 'Japan (Tokyo)' }, maps: 'google' }
  };

  function getMapRegion(code) {
    const c = code || (typeof getActiveCountry === 'function' ? getActiveCountry() : (userProfile && userProfile.country) || 'KR');
    return MAP_REGIONS[c] || MAP_REGIONS.KR;
  }

  function buildMapEmbedUrl(lat, lng, delta) {
    const d = delta || 0.01;
    const minLon = Number(lng) - d * 1.6;
    const minLat = Number(lat) - d;
    const maxLon = Number(lng) + d * 1.6;
    const maxLat = Number(lat) + d;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;
  }

  function buildMapsShareUrl(lat, lng, label) {
    // Primary: OpenStreetMap (free, no API key)
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
  }

  function buildOsmEmbedUrl(lat, lng, delta) {
    return buildMapEmbedUrl(lat, lng, delta);
  }

  function buildGoogleMapsUrl(lat, lng) {
    return `https://www.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=16`;
  }

  function buildAppleMapsUrl(lat, lng) {
    return `https://maps.apple.com/?ll=${lat},${lng}&q=${lat},${lng}`;
  }

  let leafletMap = null;
  let leafletMarker = null;

  async function reverseGeocode(lat, lng) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${currentLang === 'ko' ? 'ko,en' : 'en'}`;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) return null;
      const data = await res.json();
      return (data && data.display_name) ? data.display_name : null;
    } catch (e) {
      console.warn('reverseGeocode', e);
      return null;
    }
  }

  async function setAccidentPin(lat, lng, opts) {
    opts = opts || {};
    state.basic.lat = lat;
    state.basic.lng = lng;
    // Never show raw coords as the main address field
    if (!opts.keepAddress) {
      state.basic.location = currentLang === 'ko' ? '주소를 확인하는 중…' : 'Looking up address…';
    }
    const addr = await reverseGeocode(lat, lng);
    if (addr) {
      state.basic.location = addr;
    } else if (!state.basic.location || state.basic.location.indexOf('…') >= 0 || state.basic.location.indexOf('Looking') >= 0) {
      state.basic.location = currentLang === 'ko'
        ? '주소를 가져오지 못했습니다. 직접 입력해 주세요.'
        : 'Could not fetch address. Please type it manually.';
    }
    const input = document.getElementById('input-location');
    if (input) input.value = state.basic.location;
    const badge = document.getElementById('address-badge');
    if (badge) {
      badge.className = 'address-badge';
      badge.textContent = state.basic.location;
    }
    if (leafletMap && leafletMarker) {
      leafletMarker.setLatLng([lat, lng]);
      leafletMap.setView([lat, lng], Math.max(leafletMap.getZoom(), 16));
    }
    saveDraft();
    showToast(currentLang === 'ko' ? '주소가 반영되었습니다' : 'Address updated');
  }

  function destroyLeafletMap() {
    if (leafletMap) {
      try { leafletMap.remove(); } catch (e) {}
      leafletMap = null;
      leafletMarker = null;
    }
  }

  function initAccidentMap() {
    destroyLeafletMap();
    const el = document.getElementById('accident-map');
    if (!el || typeof L === 'undefined') return;

    const hasGps = state.basic.lat != null && state.basic.lng != null;
    const reg = getMapRegion();
    const lat = hasGps ? Number(state.basic.lat) : reg.lat;
    const lng = hasGps ? Number(state.basic.lng) : reg.lng;
    const zoom = hasGps ? 16 : (reg.zoom || 10);

    leafletMap = L.map('accident-map', { zoomControl: true, attributionControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(leafletMap);
    leafletMap.setView([lat, lng], zoom);

    leafletMarker = L.marker([lat, lng], { draggable: true }).addTo(leafletMap);
    leafletMarker.bindPopup(currentLang === 'ko' ? '핀을 드래그하거나 지도를 탭하세요' : 'Drag pin or tap the map').openPopup();

    leafletMarker.on('dragend', async function () {
      const pos = leafletMarker.getLatLng();
      await setAccidentPin(pos.lat, pos.lng);
    });

    leafletMap.on('click', async function (e) {
      leafletMarker.setLatLng(e.latlng);
      await setAccidentPin(e.latlng.lat, e.latlng.lng);
    });

    // fix size after layout
    setTimeout(function () { leafletMap.invalidateSize(); }, 200);
  }



  // ========== Country / Insurer Report Templates ==========
  // Based on publicly documented required fields (not copyrighted form layouts)
  const COUNTRY_TEMPLATES = {
    KR: {
      name: '대한민국',
      nameEn: 'South Korea',
      reportTitle: '자동차 사고 접수 보고서',
      reportTitleEn: 'Motor Accident Claim Report',
      insurers: ['삼성화재', '현대해상', 'DB손해보험', 'KB손해보험', '메리츠화재', '한화손해보험', '흥국화재', 'AXA손해보험', '기타'],
      sections: {
        reporter: '신고자 / 피보험자',
        basic: '사고 기본 정보',
        scene: '현장 사진',
        myVehicle: '자차 정보',
        otherVehicle: '상대 차량 / 운전자',
        witnesses: '목격자',
        notes: '비고'
      },
      fields: {
        datetime: '사고 일시',
        location: '사고 장소',
        description: '사고 경위 (6하 원칙)',
        weather: '날씨·도로 상태',
        injuries: '인명 피해',
        police: '경찰 접수 번호',
        plate: '차량 번호',
        makeModel: '차종',
        color: '색상',
        insurance: '보험사',
        policy: '증권 번호',
        driverName: '운전자 성명',
        driverPhone: '연락처',
        driverLicense: '면허 번호'
      },
      footer: '본 보고서는 보험사 사고 접수를 위한 참고 자료이며, 최종 청구는 해당 보험사 양식·절차에 따릅니다.'
    },
    US: {
      name: 'United States',
      nameEn: 'United States',
      reportTitle: 'Vehicle Accident Claim Report',
      reportTitleEn: 'Vehicle Accident Claim Report',
      insurers: ['State Farm', 'GEICO', 'Progressive', 'Allstate', 'USAA', 'Farmers', 'Liberty Mutual', 'Nationwide', 'Other'],
      sections: {
        reporter: 'Policyholder / Reporter',
        basic: 'Accident Details',
        scene: 'Scene Photos',
        myVehicle: 'Your Vehicle',
        otherVehicle: 'Other Party Vehicle & Driver',
        witnesses: 'Witnesses',
        notes: 'Additional Notes'
      },
      fields: {
        datetime: 'Date & Time of Accident',
        location: 'Location (Street, City, State)',
        description: 'Description of What Happened',
        weather: 'Weather / Road Conditions',
        injuries: 'Injuries',
        police: 'Police Report / Case Number',
        plate: 'License Plate',
        makeModel: 'Make / Model / Year',
        color: 'Color',
        insurance: 'Insurance Company',
        policy: 'Policy Number',
        driverName: 'Driver Name',
        driverPhone: 'Phone',
        driverLicense: 'Driver License No.'
      },
      footer: 'This report is for claim support only. Final filing must follow your insurer’s process and state requirements.'
    },
    UK: {
      name: 'United Kingdom',
      nameEn: 'United Kingdom',
      reportTitle: 'Motor Accident Report (UK)',
      reportTitleEn: 'Motor Accident Report (UK)',
      insurers: ['Aviva', 'Direct Line', 'Admiral', 'AXA UK', 'LV=', 'Churchill', 'Hastings', 'Other'],
      sections: {
        reporter: 'Policyholder / Driver',
        basic: 'Accident Details',
        scene: 'Scene Photos',
        myVehicle: 'Your Vehicle',
        otherVehicle: 'Other Vehicle & Driver',
        witnesses: 'Witnesses',
        notes: 'Circumstances / Notes'
      },
      fields: {
        datetime: 'Date & Time',
        location: 'Location (Road, Town, Postcode)',
        description: 'Circumstances of the Accident',
        weather: 'Weather / Road Conditions',
        injuries: 'Injuries (even slight)',
        police: 'Police Reference / Station',
        plate: 'Registration Number',
        makeModel: 'Make & Model',
        color: 'Colour',
        insurance: 'Insurer',
        policy: 'Policy Number',
        driverName: 'Driver Full Name',
        driverPhone: 'Contact Number',
        driverLicense: 'Driving Licence Number'
      },
      footer: 'Aligned with common UK motor claim requirements. Use with European Accident Statement principles where applicable. Not an admission of liability.'
    },
    AU: {
      name: 'Australia',
      nameEn: 'Australia',
      reportTitle: 'Motor Claim Report (Australia)',
      reportTitleEn: 'Motor Claim Report (Australia)',
      insurers: ['NRMA', 'Suncorp', 'Allianz Australia', 'RACV', 'AAMI', 'Youi', 'Budget Direct', 'Other'],
      sections: {
        reporter: 'Policyholder Details',
        basic: 'Incident Details',
        scene: 'Photos of Scene & Damage',
        myVehicle: 'Your Vehicle',
        otherVehicle: 'Other Driver & Vehicle',
        witnesses: 'Witnesses',
        notes: 'Additional Information'
      },
      fields: {
        datetime: 'Date & Time of Incident',
        location: 'Location (Street, Suburb, State)',
        description: 'What Happened',
        weather: 'Road / Weather Conditions',
        injuries: 'Was Anyone Injured?',
        police: 'Police Report Number',
        plate: 'Registration',
        makeModel: 'Make / Model',
        color: 'Colour',
        insurance: 'Insurer',
        policy: 'Policy Number',
        driverName: 'Driver Full Name',
        driverPhone: 'Phone / Mobile',
        driverLicense: 'Licence Number'
      },
      footer: 'Prepared for common Australian insurer claim requirements (e.g. NRMA, Suncorp style). Final claim via your insurer app/portal.'
    },
    JP: {
      name: '日本',
      nameEn: 'Japan',
      reportTitle: '自動車事故発生状況報告書',
      reportTitleEn: 'Motor Accident Occurrence Report',
      insurers: ['東京海上日動', '損保ジャパン', '三井住友海上', 'あいおいニッセイ同和', 'ソニー損保', 'アクサ損保', 'その他'],
      sections: {
        reporter: '報告者・被保険者',
        basic: '事故発生状況',
        scene: '現場写真',
        myVehicle: '自車情報',
        otherVehicle: '相手車両・運転者',
        witnesses: '目撃者',
        notes: '補足'
      },
      fields: {
        datetime: '事故日時',
        location: '事故場所',
        description: '事故発生状況の説明',
        weather: '天候・路面状況',
        injuries: '人身被害',
        police: '警察届出番号',
        plate: '車両番号',
        makeModel: '車名',
        color: '車体色',
        insurance: '保険会社',
        policy: '証券番号',
        driverName: '運転者氏名',
        driverPhone: '連絡先',
        driverLicense: '免許証番号'
      },
      footer: '自賠責・任意保険の事故報告参考用です。正式な請求は各保険会社の手続に従ってください。'
    }
  };

  function getActiveCountry() {
    if (reportMode === 'third' && thirdPartyOverride && thirdPartyOverride.country) {
      return thirdPartyOverride.country;
    }
    return (userProfile && userProfile.country) || 'KR';
  }

  function getTemplate() {
    const code = getActiveCountry();
    return COUNTRY_TEMPLATES[code] || COUNTRY_TEMPLATES.KR;
  }

  // Country-specific wizard step ORDER — always starts with safety (panic UX)
  const WIZARD_ORDER = {
    KR: ['safety', 'basic', 'scene', 'myVehicle', 'otherVehicle', 'witnesses', 'review'],
    US: ['safety', 'basic', 'scene', 'myVehicle', 'otherVehicle', 'witnesses', 'review'],
    UK: ['safety', 'basic', 'scene', 'otherVehicle', 'myVehicle', 'witnesses', 'review'],
    AU: ['safety', 'basic', 'scene', 'otherVehicle', 'myVehicle', 'witnesses', 'review'],
    JP: ['safety', 'basic', 'scene', 'myVehicle', 'otherVehicle', 'witnesses', 'review']
  };

  function getWizardSteps() {
    return WIZARD_ORDER[getActiveCountry()] || WIZARD_ORDER.KR;
  }

  function getStepList() {
    return ['home'].concat(getWizardSteps());
  }

  // Field label helper – uses country template
  function fl(key) {
    const f = getTemplate().fields;
    return f[key] || key;
  }
  function sec(key) {
    const s = getTemplate().sections;
    return s[key] || key;
  }

  // Country-specific hints shown under fields
  function getHints() {
    const code = getActiveCountry();
    const hints = {
      KR: {
        description: '언제·어디서·누가·무엇을·어떻게·왜 (6하 원칙)로 간단히 적어주세요.',
        location: '도로명, 교차로, 건물명 등 구체적으로',
        otherDriver: '상대 운전자 이름·연락처·차량번호·보험사를 꼭 확보하세요.',
        scene: '전체 현장, 충격 부위, 번호판, 신호등·표지판을 촬영하세요.',
        police: '경찰에 신고했다면 접수번호를 입력하세요.'
      },
      US: {
        description: 'What happened, in order. Avoid admitting fault.',
        location: 'Street, city, and state (important for jurisdiction)',
        otherDriver: 'Get the other driver’s name, phone, license plate, and insurance.',
        scene: 'Wide shots of the scene, damage close-ups, and license plates.',
        police: 'Police report / case number if one was filed.'
      },
      UK: {
        description: 'Circumstances only — do not admit liability. Facts only.',
        location: 'Road name, town, and postcode if possible',
        otherDriver: 'Exchange names, registration, insurer, and contact numbers.',
        scene: 'Photos of positions, damage, and road layout help claims.',
        police: 'Police reference or station if reported.'
      },
      AU: {
        description: 'Clear description of what happened. Photos help a lot.',
        location: 'Street, suburb, and state (e.g. near cross street)',
        otherDriver: 'Full name, phone, residential address, licence and rego are very important.',
        scene: 'Damage, number plates, and the wider scene from several angles.',
        police: 'Police report number if injuries, theft, or required by law.'
      },
      JP: {
        description: '事故の経緯を時系列で具体的に書いてください。',
        location: '交差点名・道路名・目印など',
        otherDriver: '相手の氏名・連絡先・車両番号・保険会社を確認してください。',
        scene: '現場全体・接触部位・ナンバーを撮影してください。',
        police: '警察への届出番号があれば記入してください。'
      }
    };
    return hints[code] || hints.KR;
  }

  function loadProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) return Object.assign(getDefaultProfile(), JSON.parse(raw));
    } catch (e) {}
    return getDefaultProfile();
  }

  function saveProfile(profile) {
    userProfile = Object.assign(getDefaultProfile(), profile);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Save profile failed', e);
    }
  }

  function applyProfileToState() {
    // Auto-fill myVehicle from pre-registered profile
    if (userProfile.plate) state.myVehicle.plate = userProfile.plate;
    if (userProfile.makeModel) state.myVehicle.makeModel = userProfile.makeModel;
    if (userProfile.color) state.myVehicle.color = userProfile.color;
    if (userProfile.insurance) state.myVehicle.insurance = userProfile.insurance;
    if (userProfile.policy) state.myVehicle.policy = userProfile.policy;
  }

  function getDefaultState() {
    return {
      basic: {
        datetime: new Date().toISOString().slice(0, 16),
        location: '',
        lat: null,
        lng: null,
        description: '',
        weather: '',
        injuries: 'none',
        police: ''
      },
      scenePhotos: [],      // { id, dataUrl, name }
      myVehicle: {
        plate: '',
        makeModel: '',
        color: '',
        insurance: '',
        policy: '',
        photos: []
      },
      otherVehicle: {
        enabled: true,
        plate: '',
        makeModel: '',
        color: '',
        driverName: '',
        driverPhone: '',
        driverLicense: '',
        insurance: '',
        policy: '',
        photos: []
      },
      witnesses: [],       // { id, name, phone, statement }
      safetyStatus: null, // null | 'injured' | 'danger' | 'ok'
      createdAt: new Date().toISOString()
    };
  }

  // ========== Helpers ==========
  function t(key) {
    const keys = key.split('.');
    let val = translations[currentLang];
    for (const k of keys) {
      if (val && val[k] !== undefined) val = val[k];
      else return key;
    }
    return val;
  }

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function showToast(msg, duration = 2200) {
    let el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), duration);
  }

  function setLoading(on) {
    let el = $('.loading-overlay');
    if (!el) {
      el = document.createElement('div');
      el.className = 'loading-overlay';
      el.innerHTML = '<div class="spinner"></div>';
      document.body.appendChild(el);
    }
    el.classList.toggle('show', on);
  }

  function saveDraft() {
    try {
      localStorage.setItem('accident_report_draft', JSON.stringify(state));
      showToast(t('common.draftSaved'));
    } catch (e) {
      console.warn('Save draft failed', e);
    }
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem('accident_report_draft');
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure structure
        state = Object.assign(getDefaultState(), parsed);
        return true;
      }
    } catch (e) {}
    return false;
  }

  function clearDraft() {
    localStorage.removeItem('accident_report_draft');
    state = getDefaultState();
    pdfBlob = null;
  }

  // Compress image to reasonable size for storage & PDF
  function compressImage(file, maxWidth = 1280, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round(h * maxWidth / w);
          w = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl, name: file.name || 'photo.jpg' });
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // ========== Render ==========
  function render() {
    const app = $('#app');
    if (!app) return;

    if (currentStep === 'home') {
      app.innerHTML = renderHome();
    } else if (currentStep === 'profile') {
      app.innerHTML = renderProfile();
    } else if (currentStep === 'pricing') {
      app.innerHTML = renderPricing();
    } else if (currentStep === 'third-setup') {
      app.innerHTML = renderThirdSetup();
    } else {
      app.innerHTML = renderWizard();
    }
    bindEvents();
    if (currentStep === 'basic') {
      setTimeout(initAccidentMap, 100);
    } else {
      destroyLeafletMap();
    }
  }

  function renderPricing() {
    const prem = isPremium();
    const cur = currentLang === 'ko' ? '₩' : '$';
    return `
      <header class="app-header">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <button class="icon-btn" data-action="back-home" style="background:rgba(255,255,255,0.2)">
            <svg width="20" height="20" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div style="font-weight:700;font-size:17px">${currentLang === 'ko' ? 'Premium' : 'Premium'}</div>
          <div style="width:36px"></div>
        </div>
      </header>
      <div class="content fade-in" style="padding-bottom:40px">
        ${prem ? `
          <div style="background:#f0fdf4;border-radius:16px;padding:20px;text-align:center;margin-bottom:20px">
            <div style="font-size:28px;margin-bottom:8px">✓</div>
            <div style="font-weight:700;color:#166534;font-size:18px">${currentLang === 'ko' ? 'Premium 이용 중' : 'Premium Active'}</div>
            <div style="font-size:13px;color:#15803d;margin-top:6px">${currentLang === 'ko' ? '전체 보고서·서식·공유 기능을 사용할 수 있습니다' : 'Full reports, templates & sharing unlocked'}</div>
          </div>
        ` : `
          <h2 style="font-size:20px;font-weight:700;margin:0 0 8px">${currentLang === 'ko' ? 'Premium으로 완성하세요' : 'Unlock with Premium'}</h2>
          <p style="color:#64748b;font-size:14px;line-height:1.5;margin:0 0 20px">
            ${currentLang === 'ko'
              ? '긴급 연락·안전 안내·사진 촬영은 항상 무료입니다. Premium은 국가별 보험 서식 PDF, 무제한 공유, 제3자 대리 접수, 향후 충돌 자동감지(네이티브) 예산을 포함합니다.'
              : 'Emergency calls, safety guidance & photos are always free. Premium unlocks country claim PDFs, unlimited share, third-party reports, and budget for future crash detection.'}
          </p>
          <div class="card" style="margin-bottom:12px;border:2px solid #2563eb">
            <div style="font-weight:700;font-size:16px;margin-bottom:4px">${PRICING.yearly.label[currentLang === 'ko' ? 'ko' : 'en']}</div>
            <div style="font-size:28px;font-weight:800;color:#2563eb;margin:8px 0">
              ${'£' + PRICING.yearly.gbp.toFixed(2)}
              <span style="font-size:14px;font-weight:500;color:#64748b">/ ${currentLang === 'ko' ? '년' : 'yr'}</span>
            </div>
            <button class="btn btn-primary" data-action="buy-yearly" style="margin-top:8px">${currentLang === 'ko' ? '연간 구독 (권장)' : 'Subscribe Yearly'}</button>
          </div>
          <div class="card" style="margin-bottom:16px">
            <div style="font-weight:700;font-size:16px;margin-bottom:4px">${PRICING.monthly.label[currentLang === 'ko' ? 'ko' : 'en']}</div>
            <div style="font-size:24px;font-weight:800;color:#0f172a;margin:8px 0">
              ${'£' + PRICING.monthly.gbp.toFixed(2)}
              <span style="font-size:14px;font-weight:500;color:#64748b">/ ${currentLang === 'ko' ? '월' : 'mo'}</span>
            </div>
            <button class="btn btn-outline" data-action="buy-monthly">${currentLang === 'ko' ? '월간 구독' : 'Subscribe Monthly'}</button>
          </div>
          <div style="font-size:12px;color:#94a3b8;line-height:1.5;text-align:center">
            ${currentLang === 'ko'
              ? '※ 현재 Stripe 테스트 결제입니다. 실제 요금은 청구되지 않습니다. Live 전환 전 테스트용 카드로 흐름을 확인하세요.'
              : '※ Stripe test checkout is active. No real charge is made. Use test card details until Live mode is enabled.'}
          </div>
        `}
        <div style="margin-top:24px">
          <div style="font-weight:600;margin-bottom:10px;font-size:14px">${currentLang === 'ko' ? '포함 기능' : 'Included'}</div>
          <ul style="font-size:14px;color:#334155;line-height:1.8;padding-left:18px;margin:0">
            <li>${currentLang === 'ko' ? '국가·보험사별 서식 자동 적용 PDF' : 'Country/insurer template PDFs'}</li>
            <li>${currentLang === 'ko' ? '이메일·메신저 공유 / 다운로드' : 'Email, share & download'}</li>
            <li>${currentLang === 'ko' ? '제3자 대리 사고 접수' : 'Third-party accident reports'}</li>
            <li>${currentLang === 'ko' ? '무제한 임시저장·이어하기' : 'Unlimited drafts'}</li>
            <li>${currentLang === 'ko' ? '향후 충돌 자동감지 (네이티브 앱)' : 'Future crash detection (native)'}</li>
          </ul>
        </div>
      </div>
    `;
  }

  function renderThirdSetup() {
    const countryOptions = Object.keys(COUNTRY_TEMPLATES).map(code => {
      const c = COUNTRY_TEMPLATES[code];
      return `<option value="${code}">${c.name} (${c.nameEn})</option>`;
    }).join('');
    return `
      <header class="app-header">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <button class="icon-btn" data-action="back-home" style="background:rgba(255,255,255,0.2)">
            <svg width="20" height="20" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div style="font-weight:700;font-size:16px">${currentLang === 'ko' ? '제3자 대리 접수' : 'Report for Someone Else'}</div>
          <div style="width:36px"></div>
        </div>
      </header>
      <div class="content fade-in">
        <p style="color:#64748b;font-size:14px;line-height:1.5;margin:0 0 16px">
          ${currentLang === 'ko'
            ? '다른 사람의 사고를 대신 작성할 때만 국가·보험사를 선택합니다. 내 프로필은 변경되지 않습니다.'
            : 'Select country & insurer only when reporting for someone else. Your profile is not changed.'}
        </p>
        <div class="form-group">
          <label class="form-label">${currentLang === 'ko' ? '상대방 국가 / 서식' : 'Their country / form'}</label>
          <select class="form-input" id="third-country">${countryOptions}</select>
        </div>
        <div class="form-group">
          <label class="form-label">${currentLang === 'ko' ? '상대방 보험사' : 'Their insurer'}</label>
          <input type="text" class="form-input" id="third-insurance" placeholder="${currentLang === 'ko' ? '예: Direct Line, State Farm' : 'e.g. Direct Line, State Farm'}">
        </div>
        <button class="btn btn-primary btn-lg" data-action="start-third" style="margin-top:12px">
          ${currentLang === 'ko' ? '대리 접수 시작' : 'Start Third-Party Report'}
        </button>
      </div>
    `;
  }

  function renderSafety() {
    const nums = getEmergencyNumbers();
    const g = getSafetyGuide();
    const st = state.safetyStatus;
    const ko = currentLang === 'ko';
    const statuses = [
      { id: 'injured', label: ko ? '다친 사람이 있어요' : 'Someone is injured' },
      { id: 'danger', label: ko ? '아직 위험해요 · 이동 어려움' : 'Still in danger · hard to move' },
      { id: 'ok', label: ko ? '괜찮아요 · 계속' : "I'm OK · Continue" }
    ];
    const statusHint = st === 'injured'
      ? (ko ? '지금 응급 번호로 구조를 요청하세요. 통화 후에도 이어서 작성할 수 있습니다.' : 'Call emergency services now. You can continue the report after the call.')
      : st === 'danger'
        ? (ko ? '가능하면 안전 구역으로 이동하세요. 무리한 이동은 하지 마세요.' : 'Move to a safe area if you can. Do not force movement.')
        : st === 'ok'
          ? (ko ? '비상등을 켠 뒤, 아래에서 사진을 이어갈 수 있습니다.' : 'Keep hazards on, then continue to photos below.')
          : '';
    return `
      <h2 style="font-size:22px;font-weight:800;margin:0 0 6px;color:#0f172a">
        ${ko ? '지금 안전한가요?' : 'Are you safe right now?'}
      </h2>
      <p style="color:#64748b;font-size:14px;margin:0 0 14px;line-height:1.5">
        ${ko ? '서류보다 사람 안전이 먼저입니다.' : 'People first. Paperwork later.'}
      </p>

      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
        ${statuses.map(s => `
          <button type="button" data-action="set-safety-status" data-value="${s.id}"
            class="btn ${st === s.id ? 'btn-primary' : 'btn-outline'}"
            style="justify-content:flex-start;padding:14px 16px;font-size:15px;text-align:left">
            ${s.label}
          </button>
        `).join('')}
      </div>
      ${statusHint ? `<p style="font-size:13px;color:#9a3412;margin:0 0 12px;line-height:1.45">${statusHint}</p>` : ''}

      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        ${nums.map(n => `
          <a href="tel:${n.tel}" class="btn btn-danger" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:18px;font-size:17px;text-decoration:none;min-height:56px">
            <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            ${n.name}
          </a>
        `).join('')}
      </div>

      <div class="card" style="background:#fff7ed;border:1px solid #fed7aa;margin-bottom:12px">
        <div style="font-weight:700;color:#9a3412;margin-bottom:6px">${g.hazardTitle}</div>
        <p style="font-size:13px;color:#9a3412;margin:0;line-height:1.5">${g.hazardBody}</p>
      </div>

      <div class="card" style="margin-bottom:12px">
        <div style="font-weight:700;color:#0f172a;margin-bottom:8px">${g.secondaryTitle}</div>
        <ul style="margin:0;padding-left:18px;font-size:13px;color:#334155;line-height:1.65">
          ${g.secondary.map(line => `<li>${line}</li>`).join('')}
        </ul>
      </div>

      <div class="card" style="background:#eff6ff;border:1px solid #bfdbfe;margin-bottom:8px">
        <div style="font-weight:700;color:#1e40af;margin-bottom:4px;font-size:13px">${ko ? '이 지역 안내' : 'Local tip'}</div>
        <p style="font-size:13px;color:#1e3a8a;margin:0;line-height:1.5">${g.tip}</p>
      </div>
    `;
  }

  function renderProfile() {
    const p = userProfile;
    const tpl = getTemplate();
    const countryOptions = Object.keys(COUNTRY_TEMPLATES).map(code => {
      const c = COUNTRY_TEMPLATES[code];
      const selected = (p.country || 'KR') === code ? 'selected' : '';
      return `<option value="${code}" ${selected}>${c.name} (${c.nameEn})</option>`;
    }).join('');
    const insurerList = (COUNTRY_TEMPLATES[p.country || 'KR'] || COUNTRY_TEMPLATES.KR).insurers;
    const mapReg = getMapRegion(p.country || 'KR');
    const mapDelta = (mapReg.zoom || 10) >= 10 ? 0.06 : 3;
    const mapEmbed = buildMapEmbedUrl(mapReg.lat, mapReg.lng, mapDelta);
    const mapLabel = mapReg.label[currentLang === 'ko' ? 'ko' : 'en'];
    const insurerOptions = insurerList.map(ins => {
      const selected = p.insurance === ins ? 'selected' : '';
      return `<option value="${escapeHtml(ins)}" ${selected}>${escapeHtml(ins)}</option>`;
    }).join('');
    return `
      <header class="app-header">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <button class="icon-btn" data-action="back-home" style="background:rgba(255,255,255,0.2)">
            <svg width="20" height="20" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div style="font-weight:700;font-size:17px">${t('profile.title')}</div>
          <div style="width:36px"></div>
        </div>
      </header>
      <div class="content fade-in" style="padding-bottom:100px">
        <p style="color:#64748b;font-size:14px;margin:0 0 20px;line-height:1.5">${t('profile.subtitle')}</p>
                <div class="form-group">
          <label class="form-label">${currentLang === 'ko' ? '국가 · 지도 지역' : 'Country · Map region'}</label>
          <select class="form-input" id="profile-country">${countryOptions}</select>
          <p style="font-size:12px;color:#64748b;margin:8px 0 0;line-height:1.45">
            ${currentLang === 'ko'
              ? '국가를 고르면 아래 기본 지도가 바뀝니다. 사고 신고 시 GPS로 사고 지점을 찍고 공유할 수 있습니다.'
              : 'Changing country updates the default map. During a report you can capture GPS and share the accident location.'}
          </p>
          <div class="map-wrap" style="margin-top:10px">
            <iframe title="country-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapEmbed}"></iframe>
            <div style="padding:8px 10px;font-size:12px;background:#f8fafc;color:#334155;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">
              <span>${mapLabel}</span>
              <a href="https://www.openstreetmap.org/#map=6/${mapReg.lat}/${mapReg.lng}" target="_blank" rel="noopener" style="color:#2563eb">${currentLang === 'ko' ? 'OpenStreetMap 크게' : 'OpenStreetMap'}</a>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.name')}</label>
          <input type="text" class="form-input" id="profile-name" value="${escapeHtml(p.name)}" placeholder="홍길동 / John Doe">
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.phone')}</label>
          <input type="tel" class="form-input" id="profile-phone" value="${escapeHtml(p.phone)}" placeholder="010-1234-5678">
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.insurance')}</label>
          <select class="form-input" id="profile-insurance">
            <option value="">${currentLang === 'ko' ? '선택하세요' : 'Select'}</option>
            ${insurerOptions}
          </select>
          <input type="text" class="form-input" id="profile-insurance-custom" value="${insurerList.includes(p.insurance) ? '' : escapeHtml(p.insurance)}" placeholder="${currentLang === 'ko' ? '직접 입력 (기타)' : 'Or type other'}" style="margin-top:8px">
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.policy')}</label>
          <input type="text" class="form-input" id="profile-policy" value="${escapeHtml(p.policy)}" placeholder="Policy / 증권번호">
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.plate')}</label>
          <input type="text" class="form-input" id="profile-plate" value="${escapeHtml(p.plate)}" placeholder="12가 3456 / ABC 1234">
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.makeModel')}</label>
          <input type="text" class="form-input" id="profile-make" value="${escapeHtml(p.makeModel)}" placeholder="Hyundai Sonata">
        </div>
        <div class="form-group">
          <label class="form-label">${t('profile.color')}</label>
          <input type="text" class="form-input" id="profile-color" value="${escapeHtml(p.color)}" placeholder="White / 흰색">
        </div>
        <div style="background:#f0f9ff;border-radius:12px;padding:12px;font-size:13px;color:#0369a1;margin-top:8px">
          ${currentLang === 'ko' ? '선택한 국가 서식에 맞춰 PDF 보고서 제목·항목명이 자동 변경됩니다.' : 'PDF report labels will match the selected country template.'}
        </div>
      </div>
      <div class="bottom-bar">
        <button class="btn btn-primary btn-lg" data-action="save-profile">${t('profile.save')}</button>
      </div>
    `;
  }

  function renderHome() {
    const hasDraft = !!localStorage.getItem('accident_report_draft');
    const prem = isPremium();
    const nums = getEmergencyNumbers();
    const tpl = getTemplate();
    return `
      <div class="home-hero">
        <div class="icon-wrap">
          <img src="icon-192.png" alt="CrashReport" width="48" height="48" style="border-radius:12px">
        </div>
        <h1>Crash<span class="accent">Report</span></h1>
        <p>${t('tagline')}</p>
        <div style="display:inline-block;background:rgba(245,158,11,0.25);color:#fef3c7;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;margin-top:8px">${t('betaBanner')}</div>
        ${prem ? `<div style="display:inline-block;background:rgba(251,191,36,0.25);color:#fef3c7;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;margin-top:8px;margin-left:6px">PREMIUM</div>` : ''}
      </div>
      <div style="margin:0 16px 12px;padding:12px 14px;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;font-size:12px;line-height:1.5;color:#9a3412">
        ${t('disclaimer')}
      </div>
      <div style="padding:0 16px 8px;display:flex;gap:8px;flex-wrap:wrap">
        ${nums.map(n => `
          <a href="tel:${n.tel}" class="btn btn-danger" style="flex:1;min-width:120px;padding:14px;font-size:15px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px">
            ${n.name}
          </a>
        `).join('')}
      </div>
      <div style="padding: 12px 20px 40px">
        ${hasDraft ? `
          <button class="btn btn-primary btn-lg" data-action="continue-draft" style="margin-bottom:10px">
            ${t('continueDraft')}
          </button>
          <button class="btn btn-outline" data-action="new-report" style="margin-bottom:10px">
            ${t('newReport')}
          </button>
        ` : `
          <button class="btn btn-primary btn-lg" data-action="start" style="margin-bottom:10px">
            ${t('startReport')}
          </button>
        `}
        <div style="font-size:12px;color:#64748b;text-align:center;margin-bottom:14px">
          ${currentLang === 'ko' ? '내 프로필 서식이 자동 적용됩니다 (선택 없음)' : 'Your profile template applies automatically'}
        </div>
        ${userProfile.plate || userProfile.name ? `
          <div style="padding:10px 14px;background:#f0fdf4;border-radius:12px;font-size:13px;color:#166534;text-align:center;margin-bottom:12px">
            ✓ ${escapeHtml(userProfile.name || userProfile.plate)} · ${escapeHtml(userProfile.insurance || '')}
            <div style="margin-top:4px;font-size:12px;color:#15803d">${tpl.name} · ${escapeHtml(userProfile.plate || '')}</div>
          </div>
        ` : `
          <div style="padding:10px 14px;background:#fef3c7;border-radius:12px;font-size:13px;color:#92400e;text-align:center;margin-bottom:12px">
            ${currentLang === 'ko' ? '먼저 내 정보를 등록하면 사고 시 자동 입력됩니다' : 'Register your info first for auto-fill'}
          </div>
        `}
        <button class="btn btn-outline" data-action="open-profile" style="margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:8px">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ${t('profile.manage')}
        </button>
        <button class="btn btn-outline" data-action="open-pricing" style="margin-bottom:10px">
          ${prem ? (currentLang === 'ko' ? 'Premium 상태' : 'Premium Status') : (currentLang === 'ko' ? 'Premium 구독' : 'Get Premium')}
        </button>
        <button class="btn btn-secondary" data-action="open-third" style="font-size:13px;margin-bottom:16px">
          ${currentLang === 'ko' ? '다른 사람 대신 신고하기' : 'Report for someone else'}
        </button>
        <div style="text-align:center">
          <button class="lang-btn" data-action="toggle-lang" style="background:#e2e8f0;color:#334155">
            ${currentLang === 'ko' ? 'English' : '한국어'}
          </button>
        </div>
      </div>
    `;
  }

  function renderWizard() {
    const steps = getStepList(); // home + country-ordered steps
    const wizardSteps = getWizardSteps();
    const stepIndex = steps.indexOf(currentStep);
    const progress = stepIndex <= 0 ? 0 : ((stepIndex) / wizardSteps.length) * 100;
    const tpl = getTemplate();
    const firstStep = wizardSteps[0];

    return `
      <header class="app-header">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:700;font-size:15px;line-height:1.2">
            ${t('appName')}
            <div style="font-size:11px;font-weight:500;opacity:0.9">${tpl.name} · ${escapeHtml(userProfile.insurance || '')}</div>
          </div>
          <button class="lang-btn" data-action="toggle-lang">${currentLang === 'ko' ? 'EN' : '한'}</button>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, progress)}%"></div></div>
        <div class="step-dots">
          ${wizardSteps.map((s, i) => {
            const curIdx = wizardSteps.indexOf(currentStep);
            const cls = i < curIdx ? 'done' : (i === curIdx ? 'active' : '');
            return `<div class="step-dot ${cls}" title="${s}"></div>`;
          }).join('')}
        </div>
      </header>
      <div class="content fade-in" id="step-content">
        ${renderStepContent()}
      </div>
      <div class="bottom-bar">
        ${currentStep !== firstStep ? `<button class="btn btn-secondary" data-action="prev" style="flex:0 0 100px">${t('common.prev')}</button>` : ''}
        ${currentStep !== 'review'
          ? `<button class="btn btn-primary" data-action="next" style="flex:1">${t('common.next')}</button>`
          : `<div style="flex:1"></div>`}
      </div>
    `;
  }

  function renderStepContent() {
    switch (currentStep) {
      case 'safety': return renderSafety();
      case 'basic': return renderBasic();
      case 'scene': return renderScene();
      case 'myVehicle': return renderMyVehicle();
      case 'otherVehicle': return renderOtherVehicle();
      case 'witnesses': return renderWitnesses();
      case 'review': return renderReview();
      default: return '';
    }
  }

  function renderBasic() {
    const b = state.basic;
    const weatherOpts = t('basic.weatherOptions');
    return `
      <h2 style="font-size:20px;font-weight:700;margin:0 0 16px;color:#0f172a">${t('basic.title')}</h2>
      <div class="form-group">
        <label class="form-label">${t('basic.datetime')}</label>
        <input type="datetime-local" class="form-input" id="input-datetime" value="${b.datetime}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('basic.location')}</label>
        <input type="text" class="form-input" id="input-location" value="${escapeHtml(b.location)}" placeholder="${currentLang === 'ko' ? '지도에서 핀을 옮기면 주소가 자동 입력됩니다' : 'Move the pin on the map to fill the address'}">
        <div style="display:flex;gap:8px;margin:10px 0;flex-wrap:wrap">
          <button type="button" class="btn btn-primary" data-action="get-location" style="flex:1;min-width:140px;font-size:14px;padding:12px">
            ${currentLang === 'ko' ? '📍 내 위치로 핀 이동' : '📍 Move pin to me'}
          </button>
          <button type="button" class="btn btn-secondary" data-action="share-location" style="flex:1;min-width:140px;font-size:14px;padding:12px">
            ${currentLang === 'ko' ? '주소 링크 공유' : 'Share address link'}
          </button>
        </div>
        <p style="font-size:12px;color:#64748b;margin:0 0 8px;line-height:1.45">
          ${currentLang === 'ko'
            ? '지도를 탭하거나 핀을 드래그하면 OpenStreetMap에서 주소를 가져옵니다. 좌표 숫자는 표시하지 않습니다.'
            : 'Tap the map or drag the pin to fetch the address from OpenStreetMap. Coordinates are not shown.'}
        </p>
        <div class="map-wrap">
          <div id="accident-map"></div>
        </div>
        <div id="address-badge" class="address-badge ${b.location ? '' : 'pending'}">
          ${b.location
            ? escapeHtml(b.location)
            : (currentLang === 'ko' ? '아직 주소 없음 · 핀을 옮기거나 「내 위치로 핀 이동」을 누르세요' : 'No address yet · drag the pin or use Move pin to me')}
        </div>
        ${b.lat != null ? `
          <div style="margin-top:8px">
            <a href="${buildMapsShareUrl(b.lat, b.lng)}" target="_blank" rel="noopener" style="font-size:12px;color:#2563eb">
              ${currentLang === 'ko' ? 'OpenStreetMap에서 열기' : 'Open in OpenStreetMap'}
            </a>
          </div>
        ` : ''}
      </div>
      <div class="form-group">
        <label class="form-label">${t('basic.description')} <span style="color:#dc2626">*</span></label>
        <textarea class="form-textarea" id="input-description" placeholder="${t('basic.descPlaceholder')}">${escapeHtml(b.description)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">${t('basic.weather')}</label>
        <select class="form-select" id="input-weather">
          <option value="">—</option>
          ${weatherOpts.map((o, i) => `<option value="${o}" ${b.weather === o ? 'selected' : ''}>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">${t('basic.injuries')}</label>
        <div style="display:flex;gap:8px">
          ${['none', 'minor', 'serious'].map(v => {
            const labels = { none: t('basic.injuriesNone'), minor: t('basic.injuriesMinor'), serious: t('basic.injuriesSerious') };
            const active = b.injuries === v;
            return `<button type="button" class="btn ${active ? 'btn-primary' : 'btn-secondary'}" data-action="set-injury" data-value="${v}" style="flex:1;padding:10px;font-size:14px">${labels[v]}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">${t('basic.police')}</label>
        <input type="text" class="form-input" id="input-police" value="${escapeHtml(b.police)}" placeholder="${t('basic.policePlaceholder')}">
      </div>
    `;
  }

  function renderPhotoGrid(photos, category) {
    const countLabel = currentLang === 'ko'
      ? (photos.length ? `촬영된 사진 ${photos.length}장 · 탭하면 크게 볼 수 있습니다` : '아직 사진 없음')
      : (photos.length ? `${photos.length} photo(s) · tap to preview` : 'No photos yet');
    return `
      <div class="photo-action-row">
        <button type="button" class="btn btn-primary photo-btn" data-action="take-photo" data-category="${category}">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          ${t('photo.take')}
        </button>
        <button type="button" class="btn btn-outline photo-btn" data-action="pick-photo" data-category="${category}">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          ${t('photo.gallery')}
        </button>
      </div>
      <div class="photo-count">${countLabel}</div>
      <div class="photo-grid">
        ${photos.map(p => `
          <div class="photo-item">
            <img src="${p.dataUrl}" alt="photo" data-action="preview-photo" data-category="${category}" data-id="${p.id}">
            <button type="button" class="remove-btn" data-action="remove-photo" data-category="${category}" data-id="${p.id}" aria-label="Remove">×</button>
          </div>
        `).join('')}
      </div>
      <input type="file" class="hidden-input" id="file-camera-${category}" accept="image/*" capture="environment" multiple>
      <input type="file" class="hidden-input" id="file-gallery-${category}" accept="image/*" multiple>
    `;
  }

  function renderScene() {
    return `
      <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;color:#0f172a">${t('scene.title')}</h2>
      <p style="color:#64748b;font-size:14px;margin:0 0 16px;line-height:1.5">${t('scene.hint')}</p>
      ${renderPhotoGrid(state.scenePhotos, 'scene')}
    `;
  }

  function renderMyVehicle() {
    const v = state.myVehicle;
    const fromProfile = !!(userProfile.plate || userProfile.insurance);
    return `
      <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;color:#0f172a">${t('myVehicle.title')}</h2>
      ${fromProfile ? `<div style="background:#eff6ff;color:#1d4ed8;padding:8px 12px;border-radius:10px;font-size:13px;margin-bottom:14px">✓ ${t('profile.prefilled')}</div>` : ''}
      <div class="form-group">
        <label class="form-label">${t('myVehicle.plate')} <span style="color:#dc2626">*</span></label>
        <input type="text" class="form-input" id="input-my-plate" value="${escapeHtml(v.plate)}" placeholder="${t('myVehicle.platePlaceholder')}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('myVehicle.makeModel')}</label>
        <input type="text" class="form-input" id="input-my-make" value="${escapeHtml(v.makeModel)}" placeholder="Hyundai Sonata">
      </div>
      <div class="form-group">
        <label class="form-label">${t('myVehicle.color')}</label>
        <input type="text" class="form-input" id="input-my-color" value="${escapeHtml(v.color)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('myVehicle.insurance')}</label>
        <input type="text" class="form-input" id="input-my-insurance" value="${escapeHtml(v.insurance)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('myVehicle.policy')}</label>
        <input type="text" class="form-input" id="input-my-policy" value="${escapeHtml(v.policy)}">
      </div>
      <div class="card" style="margin-top:8px">
        <div class="card-title">${t('myVehicle.photos')}</div>
        <p style="font-size:13px;color:#64748b;margin:0 0 10px">${t('myVehicle.photosHint')}</p>
        ${renderPhotoGrid(v.photos, 'my')}
      </div>
    `;
  }

  function renderOtherVehicle() {
    const v = state.otherVehicle;
    if (!v.enabled) {
      return `
        <h2 style="font-size:20px;font-weight:700;margin:0 0 16px;color:#0f172a">${t('otherVehicle.title')}</h2>
        <div class="empty-state">
          <p>${t('otherVehicle.noOther')}</p>
          <button class="btn btn-outline" data-action="enable-other" style="margin-top:16px;max-width:240px">${t('otherVehicle.addOther')}</button>
        </div>
      `;
    }
    return `
      <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;color:#0f172a">${t('otherVehicle.title')}</h2>
      <div style="margin-bottom:12px">
        <button class="btn btn-danger" data-action="disable-other" style="width:auto;padding:8px 14px;font-size:13px">${t('otherVehicle.noOther')}</button>
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.plate')}</label>
        <input type="text" class="form-input" id="input-other-plate" value="${escapeHtml(v.plate)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.makeModel')}</label>
        <input type="text" class="form-input" id="input-other-make" value="${escapeHtml(v.makeModel)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.color')}</label>
        <input type="text" class="form-input" id="input-other-color" value="${escapeHtml(v.color)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.driverName')}</label>
        <input type="text" class="form-input" id="input-other-driver" value="${escapeHtml(v.driverName)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.driverPhone')}</label>
        <input type="tel" class="form-input" id="input-other-phone" value="${escapeHtml(v.driverPhone)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.driverLicense')}</label>
        <input type="text" class="form-input" id="input-other-license" value="${escapeHtml(v.driverLicense)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.insurance')}</label>
        <input type="text" class="form-input" id="input-other-insurance" value="${escapeHtml(v.insurance)}">
      </div>
      <div class="form-group">
        <label class="form-label">${t('otherVehicle.policy')}</label>
        <input type="text" class="form-input" id="input-other-policy" value="${escapeHtml(v.policy)}">
      </div>
      <div class="card" style="margin-top:8px">
        <div class="card-title">${t('otherVehicle.photos')}</div>
        <p style="font-size:13px;color:#64748b;margin:0 0 10px">${t('otherVehicle.photosHint')}</p>
        ${renderPhotoGrid(v.photos, 'other')}
      </div>
    `;
  }

  function renderWitnesses() {
    return `
      <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;color:#0f172a">${t('witnesses.title')}</h2>
      <p style="color:#64748b;font-size:14px;margin:0 0 16px">${t('witnesses.hint')}</p>
      <div id="witness-list">
        ${state.witnesses.length === 0 ? `<div class="empty-state"><p>${t('witnesses.none')}</p></div>` : ''}
        ${state.witnesses.map((w, idx) => `
          <div class="person-card">
            <button class="remove-person" data-action="remove-witness" data-id="${w.id}">×</button>
            <div class="form-group" style="margin-bottom:10px">
              <label class="form-label">${t('witnesses.name')}</label>
              <input type="text" class="form-input witness-name" data-id="${w.id}" value="${escapeHtml(w.name)}">
            </div>
            <div class="form-group" style="margin-bottom:10px">
              <label class="form-label">${t('witnesses.phone')}</label>
              <input type="tel" class="form-input witness-phone" data-id="${w.id}" value="${escapeHtml(w.phone)}">
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label class="form-label">${t('witnesses.statement')}</label>
              <textarea class="form-textarea witness-statement" data-id="${w.id}" rows="2">${escapeHtml(w.statement || '')}</textarea>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-outline" data-action="add-witness" style="margin-top:8px">
        + ${t('witnesses.addWitness')}
      </button>
    `;
  }

  function renderReview() {
    const b = state.basic;
    const my = state.myVehicle;
    const other = state.otherVehicle;
    return `
      <h2 style="font-size:20px;font-weight:700;margin:0 0 4px;color:#0f172a">${t('review.title')}</h2>
      <p style="color:#64748b;font-size:14px;margin:0 0 20px">${t('review.subtitle')}</p>

      <div class="card review-section">
        <h3>${t('steps.basic')}</h3>
        <div class="review-row"><span class="label">${t('basic.datetime')}</span><span class="value">${formatDateTime(b.datetime)}</span></div>
        <div class="review-row"><span class="label">${t('basic.location')}</span><span class="value">${escapeHtml(b.location) || '—'}</span></div>
        <div class="review-row"><span class="label">${t('basic.description')}</span><span class="value">${escapeHtml(b.description) || '—'}</span></div>
        <div class="review-row"><span class="label">${t('basic.weather')}</span><span class="value">${escapeHtml(b.weather) || '—'}</span></div>
        <div class="review-row"><span class="label">${t('basic.injuries')}</span><span class="value">${b.injuries === 'none' ? t('basic.injuriesNone') : b.injuries === 'minor' ? t('basic.injuriesMinor') : t('basic.injuriesSerious')}</span></div>
        ${b.police ? `<div class="review-row"><span class="label">${t('basic.police')}</span><span class="value">${escapeHtml(b.police)}</span></div>` : ''}
      </div>

      <div class="card review-section">
        <h3>${t('steps.scene')}</h3>
        <div class="review-row"><span class="label">${currentLang === 'ko' ? '사진' : 'Photos'}</span><span class="value">${state.scenePhotos.length} ${t('review.photosCount')}</span></div>
        ${state.scenePhotos.length ? `<div class="photo-grid" style="margin-top:10px">${state.scenePhotos.map(p => `<div class="photo-item"><img src="${p.dataUrl}"></div>`).join('')}</div>` : ''}
      </div>

      <div class="card review-section">
        <h3>${t('steps.myVehicle')}</h3>
        <div class="review-row"><span class="label">${t('myVehicle.plate')}</span><span class="value">${escapeHtml(my.plate) || '—'}</span></div>
        <div class="review-row"><span class="label">${t('myVehicle.makeModel')}</span><span class="value">${escapeHtml(my.makeModel) || '—'}</span></div>
        <div class="review-row"><span class="label">${t('myVehicle.insurance')}</span><span class="value">${escapeHtml(my.insurance) || '—'}</span></div>
        <div class="review-row"><span class="label">${currentLang === 'ko' ? '사진' : 'Photos'}</span><span class="value">${my.photos.length} ${t('review.photosCount')}</span></div>
        ${my.photos.length ? `<div class="photo-grid" style="margin-top:10px">${my.photos.map(p => `<div class="photo-item"><img src="${p.dataUrl}"></div>`).join('')}</div>` : ''}
      </div>

      <div class="card review-section">
        <h3>${t('steps.otherVehicle')}</h3>
        ${!other.enabled ? `<p style="color:#94a3b8">${t('otherVehicle.noOther')}</p>` : `
          <div class="review-row"><span class="label">${t('otherVehicle.plate')}</span><span class="value">${escapeHtml(other.plate) || '—'}</span></div>
          <div class="review-row"><span class="label">${t('otherVehicle.driverName')}</span><span class="value">${escapeHtml(other.driverName) || '—'}</span></div>
          <div class="review-row"><span class="label">${t('otherVehicle.driverPhone')}</span><span class="value">${escapeHtml(other.driverPhone) || '—'}</span></div>
          <div class="review-row"><span class="label">${t('otherVehicle.insurance')}</span><span class="value">${escapeHtml(other.insurance) || '—'}</span></div>
          <div class="review-row"><span class="label">${currentLang === 'ko' ? '사진' : 'Photos'}</span><span class="value">${other.photos.length} ${t('review.photosCount')}</span></div>
          ${other.photos.length ? `<div class="photo-grid" style="margin-top:10px">${other.photos.map(p => `<div class="photo-item"><img src="${p.dataUrl}"></div>`).join('')}</div>` : ''}
        `}
      </div>

      <div class="card review-section">
        <h3>${t('steps.witnesses')}</h3>
        ${state.witnesses.length === 0 ? `<p style="color:#94a3b8">${t('witnesses.none')}</p>` :
          state.witnesses.map(w => `
            <div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #f1f5f9">
              <div class="review-row"><span class="label">${t('witnesses.name')}</span><span class="value">${escapeHtml(w.name)}</span></div>
              <div class="review-row"><span class="label">${t('witnesses.phone')}</span><span class="value">${escapeHtml(w.phone)}</span></div>
            </div>
          `).join('')}
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;margin-top:8px">
        <button class="btn btn-success btn-lg" data-action="generate-pdf">${t('review.generatePdf')}</button>
        <button class="btn btn-primary" data-action="share" id="btn-share" style="display:none">${t('review.share')}</button>
        <button class="btn btn-outline" data-action="download-pdf" id="btn-download" style="display:none">${t('review.download')}</button>
        <button class="btn btn-secondary" data-action="email">${t('review.email')}</button>
        <button class="btn btn-secondary" data-action="copy-text">${t('review.copyText')}</button>
        <button class="btn btn-secondary" data-action="save-draft">${t('review.saveDraft')}</button>
        <button class="btn btn-danger" data-action="clear-all" style="margin-top:8px">${t('review.clearAll')}</button>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatDateTime(iso) {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) { return iso; }
  }

  // ========== Events ==========
  function bindEvents() {
    // Action buttons
    $$('[data-action]').forEach(el => {
      el.addEventListener('click', handleAction);
    });

    // Auto-save form inputs on change
    const content = $('#step-content');
    if (content) {
      content.addEventListener('change', handleInputChange);
      content.addEventListener('input', debounce(handleInputChange, 400));
    }

    // File inputs (camera + gallery)
    ['scene', 'my', 'other'].forEach(cat => {
      const cam = $(`#file-camera-${cat}`);
      const gal = $(`#file-gallery-${cat}`);
      if (cam) cam.addEventListener('change', (e) => handleFiles(e, cat));
      if (gal) gal.addEventListener('change', (e) => handleFiles(e, cat));
    });

    // Profile: country change refreshes insurer list
    const countrySel = $('#profile-country');
    if (countrySel) {
      countrySel.addEventListener('change', () => {
        userProfile.country = countrySel.value;
        // keep other fields, just re-render to update insurer dropdown
        const name = $('#profile-name')?.value;
        const phone = $('#profile-phone')?.value;
        const policy = $('#profile-policy')?.value;
        const plate = $('#profile-plate')?.value;
        const make = $('#profile-make')?.value;
        const color = $('#profile-color')?.value;
        render();
        if ($('#profile-name')) $('#profile-name').value = name || '';
        if ($('#profile-phone')) $('#profile-phone').value = phone || '';
        if ($('#profile-policy')) $('#profile-policy').value = policy || '';
        if ($('#profile-plate')) $('#profile-plate').value = plate || '';
        if ($('#profile-make')) $('#profile-make').value = make || '';
        if ($('#profile-color')) $('#profile-color').value = color || '';
      });
    }
  }

  function handleAction(e) {
    const action = e.currentTarget.dataset.action;
    const value = e.currentTarget.dataset.value;
    const id = e.currentTarget.dataset.id;
    const category = e.currentTarget.dataset.category;

    switch (action) {
      case 'start':
      case 'new-report':
        clearDraft();
        reportMode = 'self';
        thirdPartyOverride = null;
        applyProfileToState(); // auto-fill — no country/insurer picker
        currentStep = getWizardSteps()[0] || 'safety';
        render();
        break;
      case 'continue-draft':
        loadDraft();
        reportMode = 'self';
        thirdPartyOverride = null;
        currentStep = getWizardSteps()[0] || 'safety';
        render();
        break;
      case 'open-profile':
        currentStep = 'profile';
        render();
        break;
      case 'open-pricing':
        currentStep = 'pricing';
        render();
        break;
      case 'open-third':
        if (!isPremium()) {
          showToast(currentLang === 'ko' ? '제3자 접수는 Premium 기능입니다' : 'Third-party reports require Premium');
          currentStep = 'pricing';
          render();
          break;
        }
        currentStep = 'third-setup';
        render();
        break;
      case 'start-third':
        {
          const c = $('#third-country')?.value || 'UK';
          const ins = $('#third-insurance')?.value?.trim() || '';
          reportMode = 'third';
          thirdPartyOverride = { country: c, insurance: ins };
          clearDraft();
          // do not overwrite profile vehicle — leave empty for third party
          state = getDefaultState();
          if (ins) state.myVehicle.insurance = ins;
          currentStep = getWizardSteps()[0] || 'safety';
          render();
        }
        break;
      case 'buy-monthly':
        activatePremium('monthly');
        showToast(currentLang === 'ko' ? 'Premium(월간) 활성화됨' : 'Premium monthly activated');
        currentStep = 'pricing';
        render();
        break;
      case 'buy-yearly':
        activatePremium('yearly');
        showToast(currentLang === 'ko' ? 'Premium(연간) 활성화됨' : 'Premium yearly activated');
        currentStep = 'pricing';
        render();
        break;
      case 'back-home':
        currentStep = 'home';
        render();
        break;
      case 'save-profile':
        {
          const selIns = $('#profile-insurance')?.value?.trim() || '';
          const customIns = $('#profile-insurance-custom')?.value?.trim() || '';
          saveProfile({
            name: $('#profile-name')?.value?.trim() || '',
            phone: $('#profile-phone')?.value?.trim() || '',
            insurance: customIns || selIns || '',
            policy: $('#profile-policy')?.value?.trim() || '',
            plate: $('#profile-plate')?.value?.trim() || '',
            makeModel: $('#profile-make')?.value?.trim() || '',
            color: $('#profile-color')?.value?.trim() || '',
            country: $('#profile-country')?.value || 'KR'
          });
          showToast(t('profile.saved'));
          currentStep = 'home';
          render();
        }
        break;
      case 'toggle-lang':
        currentLang = currentLang === 'ko' ? 'en' : 'ko';
        render();
        break;
      case 'next':
        collectCurrentStep();
        if (validateStep()) {
          const steps = getStepList();
          const idx = steps.indexOf(currentStep);
          if (idx < steps.length - 1) {
            currentStep = steps[idx + 1];
            saveDraft();
            render();
            window.scrollTo(0, 0);
          }
        }
        break;
      case 'prev':
        collectCurrentStep();
        {
          const steps = getStepList();
          const pidx = steps.indexOf(currentStep);
          if (pidx > 1) {
            currentStep = steps[pidx - 1];
            render();
            window.scrollTo(0, 0);
          }
        }
        break;
      case 'get-location':
        getLocation();
        break;
      case 'share-location': {
        collectCurrentStep();
        const hasGps = state.basic.lat != null && state.basic.lng != null;
        const reg = getMapRegion();
        const lat = hasGps ? state.basic.lat : reg.lat;
        const lng = hasGps ? state.basic.lng : reg.lng;
        const url = buildMapsShareUrl(lat, lng, state.basic.location || '');
        const textMsg = (currentLang === 'ko' ? '사고 위치: ' : 'Accident location: ') + (state.basic.location || `${lat}, ${lng}`) + '\n' + url;
        if (navigator.share) {
          navigator.share({ title: 'CrashReport', text: textMsg, url }).catch(() => {});
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textMsg).then(() => showToast(currentLang === 'ko' ? 'OpenStreetMap 위치 링크가 복사되었습니다' : 'OpenStreetMap link copied')).catch(() => {
            showToast(url);
          });
        } else {
          showToast(url);
        }
        break;
      }
      case 'set-injury':
        state.basic.injuries = value;
        render();
        break;
      case 'set-safety-status':
        state.safetyStatus = value || null;
        if (value === 'injured' && state.basic) state.basic.injuries = 'yes';
        if (value === 'ok' && state.basic && state.basic.injuries === 'yes') { /* leave as is */ }
        saveDraft();
        render();
        break;
      case 'take-photo':
        $(`#file-camera-${category}`)?.click();
        break;
      case 'pick-photo':
        $(`#file-gallery-${category}`)?.click();
        break;
      case 'add-photo':
        // fallback
        $(`#file-camera-${category}`)?.click();
        break;
      case 'remove-photo':
        e.preventDefault();
        e.stopPropagation();
        removePhoto(category, id);
        break;
      case 'preview-photo': {
        e.preventDefault();
        let src = e.currentTarget.getAttribute('src');
        if (!src && category && id) {
          let list = [];
          if (category === 'scene') list = state.scenePhotos;
          else if (category === 'my') list = state.myVehicle.photos;
          else if (category === 'other') list = state.otherVehicle.photos;
          const found = list.find(x => x.id === id);
          if (found) src = found.dataUrl;
        }
        openLightbox(src);
        break;
      }
      case 'close-lightbox':
        closeLightbox();
        break;
      case 'enable-other':
        state.otherVehicle.enabled = true;
        render();
        break;
      case 'disable-other':
        state.otherVehicle.enabled = false;
        render();
        break;
      case 'add-witness':
        state.witnesses.push({ id: uid(), name: '', phone: '', statement: '' });
        render();
        break;
      case 'remove-witness':
        state.witnesses = state.witnesses.filter(w => w.id !== id);
        render();
        break;
      case 'generate-pdf':
        if (!isPremium()) {
          showToast(currentLang === 'ko' ? 'PDF·공유는 Premium 기능입니다' : 'PDF & share require Premium');
          currentStep = 'pricing';
          render();
          break;
        }
        generatePDF();
        break;
      case 'share':
        shareReport();
        break;
      case 'download-pdf':
        downloadPDF();
        break;
      case 'email':
        emailReport();
        break;
      case 'copy-text':
        copyTextReport();
        break;
      case 'save-draft':
        collectCurrentStep();
        saveDraft();
        break;
      case 'clear-all':
        if (confirm(t('review.confirmClear'))) {
          clearDraft();
          currentStep = 'home';
          render();
        }
        break;
    }
  }

  function handleInputChange(e) {
    const target = e.target;
    if (target.classList.contains('witness-name') || target.classList.contains('witness-phone') || target.classList.contains('witness-statement')) {
      const id = target.dataset.id;
      const w = state.witnesses.find(x => x.id === id);
      if (w) {
        if (target.classList.contains('witness-name')) w.name = target.value;
        if (target.classList.contains('witness-phone')) w.phone = target.value;
        if (target.classList.contains('witness-statement')) w.statement = target.value;
      }
      return;
    }
    // Other inputs are collected on next/prev
  }

  function collectCurrentStep() {
    if (currentStep === 'basic') {
      state.basic.datetime = $('#input-datetime')?.value || state.basic.datetime;
      state.basic.location = $('#input-location')?.value || '';
      state.basic.description = $('#input-description')?.value || '';
      state.basic.weather = $('#input-weather')?.value || '';
      state.basic.police = $('#input-police')?.value || '';
    } else if (currentStep === 'myVehicle') {
      state.myVehicle.plate = $('#input-my-plate')?.value || '';
      state.myVehicle.makeModel = $('#input-my-make')?.value || '';
      state.myVehicle.color = $('#input-my-color')?.value || '';
      state.myVehicle.insurance = $('#input-my-insurance')?.value || '';
      state.myVehicle.policy = $('#input-my-policy')?.value || '';
    } else if (currentStep === 'otherVehicle' && state.otherVehicle.enabled) {
      state.otherVehicle.plate = $('#input-other-plate')?.value || '';
      state.otherVehicle.makeModel = $('#input-other-make')?.value || '';
      state.otherVehicle.color = $('#input-other-color')?.value || '';
      state.otherVehicle.driverName = $('#input-other-driver')?.value || '';
      state.otherVehicle.driverPhone = $('#input-other-phone')?.value || '';
      state.otherVehicle.driverLicense = $('#input-other-license')?.value || '';
      state.otherVehicle.insurance = $('#input-other-insurance')?.value || '';
      state.otherVehicle.policy = $('#input-other-policy')?.value || '';
    }
  }

  function validateStep() {
    if (currentStep === 'basic') {
      if (!state.basic.description.trim()) {
        showToast(t('validation.needDescription'));
        return false;
      }
    }
    if (currentStep === 'scene') {
      // Soft validation - just warn
      if (state.scenePhotos.length === 0) {
        // allow but toast
        showToast(t('validation.needScenePhoto'));
        // still allow proceed for convenience
      }
    }
    if (currentStep === 'myVehicle') {
      if (!state.myVehicle.plate.trim()) {
        showToast(t('validation.needMyPlate'));
        return false;
      }
    }
    return true;
  }

  async function handleFiles(e, category) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setLoading(true);
    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        const compressed = await compressImage(file);
        const photo = { id: uid(), dataUrl: compressed.dataUrl, name: compressed.name };
        if (category === 'scene') state.scenePhotos.push(photo);
        else if (category === 'my') state.myVehicle.photos.push(photo);
        else if (category === 'other') state.otherVehicle.photos.push(photo);
      }
      showToast(t('common.photoAdded'));
      render();
    } catch (err) {
      console.error(err);
      showToast(t('common.error'));
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  }

  function removePhoto(category, id) {
    if (category === 'scene') state.scenePhotos = state.scenePhotos.filter(p => p.id !== id);
    else if (category === 'my') state.myVehicle.photos = state.myVehicle.photos.filter(p => p.id !== id);
    else if (category === 'other') state.otherVehicle.photos = state.otherVehicle.photos.filter(p => p.id !== id);
    render();
  }

  function getLocation() {
    if (!navigator.geolocation) {
      showToast(t('common.locationError'));
      return;
    }
    collectCurrentStep();
    setLoading(true);
    showToast(currentLang === 'ko' ? '위치를 가져오는 중…' : 'Getting location…');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLoading(false);
        await setAccidentPin(lat, lng);
        if (leafletMap) {
          leafletMap.setView([lat, lng], 17);
          if (leafletMarker) leafletMarker.setLatLng([lat, lng]);
        } else {
          render();
          setTimeout(initAccidentMap, 50);
        }
      },
      (err) => {
        console.warn(err);
        const msg = err && err.code === 1
          ? (currentLang === 'ko' ? '위치 권한이 거부되었습니다. 지도에서 핀을 직접 옮기세요.' : 'Location denied. Move the pin on the map instead.')
          : t('common.locationError');
        showToast(msg);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  function openLightbox(src) {
    if (!src) return;
    let box = document.getElementById('photo-lightbox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'photo-lightbox';
      box.className = 'lightbox';
      box.innerHTML = `
        <button type="button" class="lightbox-close" data-action="close-lightbox" aria-label="Close">×</button>
        <img id="lightbox-img" src="" alt="preview">
        <div class="lightbox-caption">${currentLang === 'ko' ? '탭하거나 × 로 닫기' : 'Tap outside or × to close'}</div>
      `;
      box.addEventListener('click', (e) => {
        if (e.target === box || e.target.classList.contains('lightbox-close') || e.target.id === 'lightbox-img') {
          // close on backdrop; keep img clickable to close too for ease
          if (e.target === box || e.target.classList.contains('lightbox-close')) {
            box.remove();
          }
        }
      });
      document.body.appendChild(box);
    }
    const img = box.querySelector('#lightbox-img');
    if (img) img.src = src;
    box.style.display = 'flex';
  }

  function closeLightbox() {
    const box = document.getElementById('photo-lightbox');
    if (box) box.remove();
  }

  // ========== PDF Generation ==========
  async function generatePDF() {
    collectCurrentStep();
    setLoading(true);
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 14;
      let y = 16;
      const lineH = 6;
      const maxW = pageW - margin * 2;

      function checkPage(need = 20) {
        if (y + need > 280) {
          doc.addPage();
          y = 16;
        }
      }

      function addTitle(text) {
        checkPage(12);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 64, 175);
        doc.text(text, margin, y);
        y += 8;
        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(0.5);
        doc.line(margin, y - 3, pageW - margin, y - 3);
      }

      function addRow(label, value) {
        if (!value) return;
        checkPage(8);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(80, 80, 80);
        doc.text(label + ':', margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(20, 20, 20);
        const lines = doc.splitTextToSize(String(value), maxW - 45);
        doc.text(lines, margin + 45, y);
        y += Math.max(lineH, lines.length * 5);
      }

      function addPhotos(photos, title) {
        if (!photos || !photos.length) return;
        checkPage(30);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 30, 30);
        doc.text(title + ` (${photos.length})`, margin, y);
        y += 6;
        const imgW = 55;
        const imgH = 40;
        let x = margin;
        for (let i = 0; i < photos.length; i++) {
          checkPage(imgH + 8);
          if (x + imgW > pageW - margin) {
            x = margin;
            y += imgH + 6;
            checkPage(imgH + 8);
          }
          try {
            doc.addImage(photos[i].dataUrl, 'JPEG', x, y, imgW, imgH);
          } catch (e) {
            console.warn('Image add failed', e);
          }
          x += imgW + 6;
        }
        y += imgH + 10;
      }

      const tpl = getTemplate();
      const F = tpl.fields;
      const S = tpl.sections;
      const useKo = (userProfile.country === 'KR' || userProfile.country === 'JP') && currentLang === 'ko';

      // Header
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, pageW, 22, 'F');
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      const title = (userProfile.country === 'KR' || userProfile.country === 'JP')
        ? tpl.reportTitle
        : tpl.reportTitleEn;
      doc.text(title, margin, 12);
      doc.setFontSize(9);
      doc.text(`${tpl.name} · ${state.myVehicle.insurance || userProfile.insurance || ''}`, margin, 18);
      y = 30;

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleString()} | Template: ${tpl.nameEn}`, margin, y);
      y += 10;

      // Reporter
      addTitle('1. ' + S.reporter);
      if (userProfile.name) addRow(useKo ? '성명' : 'Name', userProfile.name);
      if (userProfile.phone) addRow(useKo ? '연락처' : 'Phone', userProfile.phone);
      addRow(F.insurance, state.myVehicle.insurance || userProfile.insurance);
      addRow(F.policy, state.myVehicle.policy || userProfile.policy);

      // Basic
      addTitle('2. ' + S.basic);
      addRow(F.datetime, formatDateTime(state.basic.datetime));
      addRow(F.location, state.basic.location);
      if (state.basic.lat) addRow('GPS', `${state.basic.lat.toFixed(6)}, ${state.basic.lng.toFixed(6)}`);
      addRow(F.description, state.basic.description);
      addRow(F.weather, state.basic.weather);
      const injuryLabel = state.basic.injuries === 'none' ? (useKo ? '없음' : 'None') :
        state.basic.injuries === 'minor' ? (useKo ? '경상' : 'Minor') : (useKo ? '중상' : 'Serious');
      addRow(F.injuries, injuryLabel);
      if (state.basic.police) addRow(F.police, state.basic.police);
      y += 4;

      // Scene photos
      addTitle('3. ' + S.scene);
      addPhotos(state.scenePhotos, S.scene);

      // My vehicle
      addTitle('4. ' + S.myVehicle);
      addRow(F.plate, state.myVehicle.plate);
      addRow(F.makeModel, state.myVehicle.makeModel);
      addRow(F.color, state.myVehicle.color);
      addRow(F.insurance, state.myVehicle.insurance);
      addRow(F.policy, state.myVehicle.policy);
      addPhotos(state.myVehicle.photos, S.myVehicle);

      // Other
      addTitle('5. ' + S.otherVehicle);
      if (!state.otherVehicle.enabled) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(useKo ? '단독 사고 (상대 차량 없음)' : 'Single vehicle / no other party', margin, y);
        y += 8;
      } else {
        addRow(F.plate, state.otherVehicle.plate);
        addRow(F.makeModel, state.otherVehicle.makeModel);
        addRow(F.color, state.otherVehicle.color);
        addRow(F.driverName, state.otherVehicle.driverName);
        addRow(F.driverPhone, state.otherVehicle.driverPhone);
        addRow(F.driverLicense, state.otherVehicle.driverLicense);
        addRow(F.insurance, state.otherVehicle.insurance);
        addRow(F.policy, state.otherVehicle.policy);
        addPhotos(state.otherVehicle.photos, S.otherVehicle);
      }

      // Witnesses
      addTitle('6. ' + S.witnesses);
      if (state.witnesses.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(useKo ? '증인 없음' : 'No witnesses', margin, y);
        y += 8;
      } else {
        state.witnesses.forEach((w, i) => {
          addRow(`${useKo ? '증인' : 'Witness'} ${i + 1}`, `${w.name} / ${w.phone}`);
          if (w.statement) addRow(useKo ? '진술' : 'Statement', w.statement);
        });
      }

      // Disclaimer
      y += 6;
      checkPage(20);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      const footerLines = doc.splitTextToSize(tpl.footer, maxW);
      doc.text(footerLines, margin, y);

      // Page footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Accident Report · ${tpl.nameEn} · Page ${i}/${pageCount}`, margin, 290);
      }

      pdfBlob = doc.output('blob');
      showToast(t('common.pdfReady'));

      // Show share/download buttons
      const shareBtn = $('#btn-share');
      const dlBtn = $('#btn-download');
      if (shareBtn) shareBtn.style.display = 'flex';
      if (dlBtn) dlBtn.style.display = 'flex';

      // Auto download for convenience on desktop
      if (!navigator.share) {
        downloadPDF();
      }
    } catch (err) {
      console.error(err);
      showToast(t('common.error'));
    } finally {
      setLoading(false);
    }
  }

  function downloadPDF() {
    if (!pdfBlob) {
      generatePDF().then(() => downloadPDF());
      return;
    }
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Accident_Report_${new Date().toISOString().slice(0, 10)}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function shareReport() {
    if (!pdfBlob) {
      await generatePDF();
    }
    if (!pdfBlob) return;

    const file = new File([pdfBlob], `Accident_Report_${new Date().toISOString().slice(0, 10)}.pdf`, {
      type: 'application/pdf'
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: currentLang === 'ko' ? 'CrashReport 사고 보고서' : 'CrashReport Accident Report',
          text: state.basic.description?.slice(0, 100) || '',
          files: [file]
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          showToast(t('common.shareNotSupported'));
          downloadPDF();
        }
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: currentLang === 'ko' ? 'CrashReport 사고 보고서' : 'CrashReport Accident Report',
          text: buildTextReport()
        });
      } catch (err) {
        if (err.name !== 'AbortError') downloadPDF();
      }
    } else {
      showToast(t('common.shareNotSupported'));
      downloadPDF();
    }
  }

  function buildTextReport() {
    const b = state.basic;
    const my = state.myVehicle;
    const o = state.otherVehicle;
    let text = currentLang === 'ko' ? '【차량 사고 보고서】\n\n' : '【Vehicle Accident Report】\n\n';
    if (userProfile.name) text += `${currentLang === 'ko' ? '신고자' : 'Reporter'}: ${userProfile.name}${userProfile.phone ? ' / ' + userProfile.phone : ''}\n`;
    text += `${currentLang === 'ko' ? '일시' : 'Date'}: ${formatDateTime(b.datetime)}\n`;
    text += `${currentLang === 'ko' ? '장소' : 'Location'}: ${b.location || '—'}\n`;
    text += `${currentLang === 'ko' ? '경위' : 'Description'}: ${b.description || '—'}\n\n`;
    text += `${currentLang === 'ko' ? '내 차량' : 'My Vehicle'}: ${my.plate} / ${my.makeModel} / ${my.insurance}\n`;
    if (o.enabled) {
      text += `${currentLang === 'ko' ? '상대 차량' : 'Other Vehicle'}: ${o.plate} / ${o.driverName} / ${o.driverPhone} / ${o.insurance}\n`;
    }
    if (state.witnesses.length) {
      text += `\n${currentLang === 'ko' ? '증인' : 'Witnesses'}:\n`;
      state.witnesses.forEach(w => {
        text += `- ${w.name} ${w.phone}\n`;
      });
    }
    text += `\n${currentLang === 'ko' ? '사진 수' : 'Photos'}: Scene ${state.scenePhotos.length}, My ${my.photos.length}, Other ${o.photos.length}`;
    return text;
  }

  function emailReport() {
    const subject = encodeURIComponent(currentLang === 'ko' ? '차량 사고 보고서' : 'Vehicle Accident Report');
    const body = encodeURIComponent(buildTextReport() + '\n\n' + (currentLang === 'ko' ? '(PDF 첨부 권장 - 앱에서 다운로드 후 첨부하세요)' : '(Please attach the PDF downloaded from the app)'));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function copyTextReport() {
    const text = buildTextReport();
    navigator.clipboard.writeText(text).then(() => {
      showToast(t('common.copied'));
    }).catch(() => {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(t('common.copied'));
    });
  }

  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ========== Init ==========
  function init() {
    // Register service worker for offline / PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
    render();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
