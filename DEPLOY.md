# CrashReport — GitHub + Cloudflare + Stripe

브랜드: **CrashReport** · 도메인: **crashreport.uk**

## 1. GitHub

1. github.com → New repository → 이름 `crashreport`
2. 로컬:

```bash
cd crashreport
git init
git add .
git commit -m "Initial CrashReport beta"
git branch -M main
git remote add origin https://github.com/YOUR_USER/crashreport.git
git push -u origin main
```

## 2. Cloudflare Pages

1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. GitHub 계정 연결 → `crashreport` 저장소 선택
3. 빌드 설정:
   - Framework preset: **None**
   - Build command: (비움)
   - Build output directory: **/** 또는 **.**
4. **Save and Deploy**
5. **Custom domains** → `crashreport.uk` 추가
6. 도메인 DNS를 Cloudflare로 연결 (네임서버 또는 CNAME)

HTTPS는 자동 발급됩니다. 위치·카메라에 HTTPS가 필요합니다.

## 3. Stripe (베타: Payment Link)

1. https://dashboard.stripe.com (테스트 모드로 시작 가능)
2. **Products** → `CrashReport Premium`
   - Monthly price / Yearly price 생성
3. 각 가격 → **Payment link** 생성 → URL 복사
4. 이 저장소 `config.js` 수정:

```js
paymentLinkMonthly: 'https://buy.stripe.com/....',
paymentLinkYearly: 'https://buy.stripe.com/....'
```

5. `git commit -am "Stripe payment links"` && `git push`
6. Cloudflare Pages가 자동 재배포
7. 앱에서 **Get Premium** → Stripe 결제 페이지

### 주의

- `sk_...` Secret Key는 **GitHub에 올리지 마세요**
- `config.js`에는 Payment Link URL만
- 결제 완료 후 앱 Premium 자동 연동은 다음 단계(Webhook + Worker)

## 4. 진행 순서

1. GitHub push  
2. Cloudflare Pages ← Git  
3. crashreport.uk DNS  
4. Stripe Payment Links  
5. config.js 업데이트 후 push  
6. 실기기 https://crashreport.uk 테스트  
