# 밴드를 위한 자캐 커뮤니티 편파 탐색기

Original Character Community Troll Finder for Band (OCTrollFinder4Band)

## 실행 화면

아래 환경에서 [실행 방법](#실행-방법) 문단의 설명에 따라 실행한 화면입니다.

-   운영 환경: (없음)
-   테스트 환경: 개인 PC

[![실행 화면](http://img.youtube.com/vi/YI3J6hzET9w/0.jpg)](https://youtu.be/YI3J6hzET9w)

### 실행 방법

#### Chrome Web Store에서 설치

(게시 준비중)

<!-- [Chrome Web Store]()에 접속한 뒤, `Chrome에 추가` 버튼을 클릭하여 설치를 진행합니다. -->

#### Releases에서 설치

**경고: Releases에는 정식 버전뿐 아니라 테스트 버전도 함께 배포됩니다. 테스트 버전은 정식 버전에 비해 불안정하거나 치명적인 버그가 있을 수 있습니다. 이 프로젝트에서는 이 버전을 설치하여 발생하는 문제에 책임지지 않습니다.**

1. [Releases](https://github.com/Quirax/OCTrollFinder4Band/releases)에 게시된 최신 버전의 zip 파일을 다운로드합니다.
2. Chrome에서 `chrome://extensions`로 들어갑니다.
3. 우측 상단 `개발자 모드`를 활성화합니다.
4. 다운로드한 zip 파일을 화면에 드래그하여 설치합니다.

## 배경

### 자캐 커뮤니티(커뮤)란?

사람의 창작 본능은 때로는 자신이 상상하는 특성을 가지는 캐릭터를 만드는 형태로 나타납니다. 이렇게 만든 캐릭터를 '자작 캐릭터', 줄여서 '자캐'라고 합니다.이 자캐를 만든 사람을 '오너'라고 부릅니다.

각 오너들이 자신이 만든 자캐를 가지고 일종의 커뮤니티 활동을 하는 것을 '자캐 커뮤니티'라고 합니다. 일반적으로 '커뮤'라고 줄여 부릅니다. 커뮤에서 활동하는 것을 '러닝'이라고 하고, 활동하는 오너들을 '러너'라고 합니다. 또 이 커뮤를 운영하는 사람들을 '총괄진', 줄여서 '괄진'이라고 합니다. 커뮤는 일반적으로 기간제로 운영되며, 개장일 이전 '가개장'을 시작으로 개장 이후 종료하는 '엔딩'까지 이어지며, 이후 오너들끼리 뒷풀이 즉 '애프터'를 합니다.

커뮤니티가 형성되려면 이용자들이 모일 플랫폼이 필요합니다. 그 중 자캐 커뮤니티에 사용하는 플랫폼으로 '밴드'가 많이 사용됩니다. 밴드는 네이버 사에서 개발 및 운영하는 SNS로, 모임을 구성하고 운영하기 위해 각계각층에서 사용하는 온라인 플랫폼입니다. 이 외에도 X(구 트위터)나 마스토돈, 디스코드나 카카오톡과 같은 다른 SNS에서도 커뮤가 운영됩니다.

### 편파 단속의 필요성

한편, 커뮤 내 오너들의 취향 기타 편향성으로 인하여 특정 자캐들만 우대받거나 반대로 홀대받는 경우도 존재합니다. 이러한 불평등한 대우를 '편파'라고 합니다. 편파로 인하여 특정한 자캐들만 주목받게 되므로 그에 비해 홀대받는 자캐들의 오너들이 이탈하거나 활동이 저조해지는 문제가 발생할 수 있습니다. 이에 일반적으로 커뮤에서는 편파를 금지하고 단속합니다. 경우에 따라서 커뮤가 조기에 엔딩을 맞이하는 경우도 발생합니다.

일반적으로 게시물별 조회수나 댓글 수, 표정 수를 비롯한 반응 수를 기준으로 하여, 특정 자캐들의 글에만 반응이 많거나 반대로 적은 경우에 편파가 있다고 판단합니다. 그러나 모든 게시물을 사람이 일일이 읽고 판단하여 결정해야 합니다. 이는 단속하는 사람의 경험에 의존해야 하므로, 정말로 편파가 있는지에 관한 논란을 야기할 우려가 있습니다. 또한 단속하는 사람의 피로감을 유발하여 커뮤 운영에 지장을 줄 우려가 있습니다.

이러한 이유로, 밴커에서의 편파 탐지를 위한 보다 전문화된 도구가 필요하게 되었습니다.

### "밴드를 위한 자캐 커뮤니티 편파 탐색기"

"밴드를 위한 자캐 커뮤니티 편파 탐색기"는 이러한 요구에 충족하기 위하여, 커뮤에 게시된 모든 게시물과 댓글을 분석하고 통계하여 표시함으로써, 현재 편파가 발생하고 있는지, 또 어느 자캐에 대하여 얼마나 발생하고 있는지 확인할 수 있도록 합니다.

이로써 편파를 객관적인 데이터로 효율적으로 확인할 수 있습니다. 이는 편파를 탐지하는 일반적인 능률을 향상시키고, 편파 탐지의 방식을 표준화하며, 총괄진의 운영 난이도를 낮춤으로써, 안정적인 커뮤 운영에 이바지할 것으로 기대합니다.

## 동작 원리

### Extension으로 개발하는 이유

애플리케이션의 경우 웹 사이트나 설치형 프로그램 형태로 개발하는 것이 일반적입니다. 그러나 2024년 11월 20일 기준, 밴드 측에서 제공하는 [Open API](https://developers.band.us/develop/guide/api)가 분석을 수행하는 데에 다음과 같은 한계가 존재합니다.

-   게시물의 조회수를 비롯한 주요 지표를 확인하려면 각각의 게시물을 일일이 조회해야 합니다. 따라서, 만약 분석 대상이 되는 밴드에 게시물이 200개가 있고, 게시물당 평균 10개의 댓글이 있다면, 총 408회의 API 호출이 필요합니다.
    -   전체 게시물 목록을 조회하기 위하여 8회의 API 호출이 필요합니다. 1회당 25개의 게시물이 조회됩니다.
    -   각 게시물의 상세 조회를 위하여 200회의 API 호출이 필요합니다.
    -   각 게시물의 댓글 목록 조회를 위하여 200회의 API 호출이 필요합니다.
-   Open API 사용 시 사용량 제한이 존재합니다. 이는 사용자 단위뿐 아니라 애플리케이션 단위로도 존재합니다. 이로 인해 사용량이 너무 많아 제한에 걸리는 경우, 일정 시간 동안 애플리케이션을 이용할 수 없게 됩니다.
    -   사용량 제한의 정확한 기준은 공개되어 있지 않습니다. 다만, 사용자가 10명만 되어도 4천 회 이상의 API 호출이 발생합니다. 따라서 애플리케이션 단위 사용량 제한에 걸릴 가능성이 존재합니다.
    -   사용량 제한에 도달하는 경우 24시간 동안 API 호출이 거부됩니다. 즉, 다른 사용자들은 24시간 동안 애플리케이션을 이용할 수 없게 됩니다.

한편 Extension으로 개발하는 경우, 아래에 서술한 바와 같이 밴드 페이지 내에서 별도의 스크립트를 실행할 수 있습니다. 이러면, 밴드에 로그인한 사용자의 권한으로 밴드에서 사용하는 내부 API를 호출할 수 있습니다. 그러면 다음과 같은 장점이 있습니다.

-   내부 API에서는 전체 게시물 목록을 조회할 때 주요 지표를 함께 제공합니다. 따라서, 각 게시물을 상세 조회하지 않아도 됩니다. 위 예시에 따르면, 200회의 API 호출이 절약됩니다.
-   내부 API에도 사용량 제한은 존재하지만, 애플리케이션 단위로 적용되지는 않습니다. 따라서, 사용자가 여러명이더라도 각자의 사용량 제한만 적용됩니다. 예를 들어, 어떤 사용자가 이 Extension을 너무 많이 사용하여 24시간 동안 사용 제한이 걸리더라도, 다른 사용자들은 여전히 이 Extension을 사용할 수 있습니다.

### 스크립트 삽입

Extension에서는 [스크립트 삽입이 가능](https://stackoverflow.com/a/20513730)합니다. 이를 통해 [밴드 페이지 내에서 스크립트를 실행](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Content/index.js#L8-L25)하여, [밴드 API를 호출하기 위한 준비 과정을 진행](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Inject/index.js#L8-L33)합니다.

### 밴드 페이지와 통신

원칙적으로 Extension의 팝업 등 다른 페이지와 밴드 페이지는 직접 통신할 수 없습니다. Extension 내에서는 [`chrome.runtime.sendMessage` API](https://developer.chrome.com/docs/extensions/develop/concepts/messaging)를 이용하여 통신합니다. Extension과 밴드 페이지 간에는 [`window.postMessage` API](https://developer.mozilla.org/ko/docs/Web/API/Window/postMessage)를 이용하여 통신합니다.

이러한 통신 구조는 [modules/messenger.js](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/modules/messenger.js)에 구현되어 있으며, Extension과 밴드 페이지 간의 통신은 [content script](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Content/index.js#L27-L38)에 구현되어 있습니다.

### 전체 실행 과정

사용자가 밴드 페이지에 있지 않은 경우, [팝업](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/Popup.jsx)에서 [관련된 안내 메시지를 표시](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/state/Non_Band.jsx)합니다.

밴드 페이지에서 팝업을 표시하는 경우, [준비 상태의 화면](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/state/Prepare.jsx)을 표시합니다. 여기서 `현재 밴드 분석하기` 버튼을 클릭하면, [밴드 내 모든 게시물과 댓글을 수집](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/state/Processing.jsx)합니다. 이 때 밴드 페이지와 통신하여 API를 호출합니다. 수집이 완료되면 [local extension storage](https://developer.chrome.com/docs/extensions/reference/api/storage)에 저장한 뒤, Stat 페이지로 넘겨줍니다.

Stat 페이지에서는 [전달받은 데이터를 local extension storage로부터 가져온 뒤](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Stat/Stat.jsx), [사용자가 선택한 통계 종류에 따라 그래프로 표시](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Stat/StatView/index.jsx)합니다.

### 사용 라이브러리

-   ...

### 참고자료

-   ...

## 목표 및 현황

(목표 및 현황)

## 한계

(한계)

## 하고 싶은 말

(하고 싶은 말)
