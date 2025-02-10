# 동작 원리

상위 위치: [README.md 내 동작 원리 문단](../README.md#동작-원리)

## 확장 프로그램으로 개발하는 이유

애플리케이션의 경우 웹 사이트나 설치형 프로그램 형태로 개발하는 것이 일반적입니다. 그러나 2024년 11월 20일 기준, 밴드 측에서 제공하는 [Open API](https://developers.band.us/develop/guide/api)가 분석을 수행하는 데에 다음과 같은 한계가 존재합니다.

-   게시물의 조회수를 비롯한 주요 지표를 확인하려면 각각의 게시물을 일일이 조회해야 합니다. 따라서, 만약 분석 대상이 되는 밴드에 게시물이 200개가 있고, 게시물당 평균 10개의 댓글이 있다면, 총 408회의 API 호출이 필요합니다.
    -   전체 게시물 목록을 조회하기 위하여 8회의 API 호출이 필요합니다. 1회당 25개의 게시물이 조회됩니다.
    -   각 게시물의 상세 조회를 위하여 200회의 API 호출이 필요합니다.
    -   각 게시물의 댓글 목록 조회를 위하여 200회의 API 호출이 필요합니다.
-   Open API 사용 시 사용량 제한이 존재합니다. 이는 사용자 단위뿐 아니라 애플리케이션 단위로도 존재합니다. 이로 인해 사용량이 너무 많아 제한에 걸리는 경우, 일정 시간 동안 애플리케이션을 이용할 수 없게 됩니다.
    -   사용량 제한의 정확한 기준은 공개되어 있지 않습니다. 다만, 사용자가 10명만 되어도 4천 회 이상의 API 호출이 발생합니다. 따라서 애플리케이션 단위 사용량 제한에 걸릴 가능성이 존재합니다.
    -   사용량 제한에 도달하는 경우 24시간 동안 API 호출이 거부됩니다. 즉, 다른 사용자들은 24시간 동안 애플리케이션을 이용할 수 없게 됩니다.

한편 확장 프로그램으로 개발하는 경우, 아래에 서술한 바와 같이 밴드 페이지 내에서 별도의 스크립트를 실행할 수 있습니다. 이러면, 밴드에 로그인한 사용자의 권한으로 밴드에서 사용하는 내부 API를 호출할 수 있습니다. 그러면 다음과 같은 장점이 있습니다.

-   내부 API에서는 전체 게시물 목록을 조회할 때 주요 지표를 함께 제공합니다. 따라서, 각 게시물을 상세 조회하지 않아도 됩니다. 위 예시에 따르면, 200회의 API 호출이 절약됩니다.
-   내부 API에도 사용량 제한은 존재하지만, 애플리케이션 단위로 적용되지는 않습니다. 따라서, 사용자가 여러명이더라도 각자의 사용량 제한만 적용됩니다. 예를 들어, 어떤 사용자가 이 확장 프로그램을 너무 많이 사용하여 24시간 동안 사용 제한이 걸리더라도, 다른 사용자들은 여전히 이 확장 프로그램을 사용할 수 있습니다.

## 스크립트 삽입

확장 프로그램에서는 [스크립트 삽입이 가능](https://stackoverflow.com/a/20513730)합니다. 이를 통해 [밴드 페이지 내에서 스크립트를 실행](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Content/index.js#L8-L25)하여, [밴드 API를 호출하기 위한 준비 과정을 진행](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Inject/index.js#L8-L33)합니다.

## 밴드 페이지와 통신

원칙적으로 확장 프로그램의 팝업 등 다른 페이지와 밴드 페이지는 직접 통신할 수 없습니다. 확장 프로그램 내에서는 [`chrome.runtime.sendMessage` API](https://developer.chrome.com/docs/확장 프로그램s/develop/concepts/messaging)를 이용하여 통신합니다. 확장 프로그램과 밴드 페이지 간에는 [`window.postMessage` API](https://developer.mozilla.org/ko/docs/Web/API/Window/postMessage)를 이용하여 통신합니다.

이러한 통신 구조는 [modules/messenger.js](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/modules/messenger.js)에 구현되어 있으며, 확장 프로그램과 밴드 페이지 간의 통신은 [content script](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Content/index.js#L27-L38)에 구현되어 있습니다.

## 전체 실행 과정

사용자가 밴드 페이지에 있지 않은 경우, [팝업](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/Popup.jsx)에서 [관련된 안내 메시지를 표시](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/state/Error.jsx)합니다.

밴드 페이지에서 팝업을 표시하는 경우, [준비 상태의 화면](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/state/Prepare.jsx)을 표시합니다. 여기서 `현재 밴드 분석하기` 버튼을 클릭하면, [밴드 내 모든 게시물과 댓글을 수집](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Popup/state/Processing.jsx)합니다. 이 때 밴드 페이지와 통신하여 API를 호출합니다. 수집이 완료되면 [local 확장 프로그램 storage](https://developer.chrome.com/docs/확장 프로그램s/reference/api/storage)에 저장한 뒤, Stat 페이지로 넘겨줍니다.

Stat 페이지에서는 [전달받은 데이터를 local 확장 프로그램 storage로부터 가져온 뒤](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Stat/Stat.jsx), [사용자가 선택한 통계 종류에 따라 그래프로 표시](https://github.com/Quirax/OCTrollFinder4Band/blob/main/src/pages/Stat/StatView/index.jsx)합니다.

## 사용 라이브러리

-   Base Framework: [Quirax/chrome-확장 프로그램-boilerplate-react](https://github.com/Quirax/chrome-확장 프로그램-boilerplate-react) forked from [lxieyang/chrome-확장 프로그램-boilerplate-react](https://github.com/lxieyang/chrome-확장 프로그램-boilerplate-react)
    -   [node-sass](https://www.npmjs.com/package/node-sass) (v8.0.0): https://github.com/Quirax/chrome-확장 프로그램-boilerplate-react/issues/1 적용
    -   [cross-env](https://www.npmjs.com/package/cross-env) (v7.0.3): [Production build를 위해 적용](https://github.com/Quirax/OCTrollFinder4Band/commit/52494ea92aa1ab4b3fb1f24b0f2389d137f1ea8e)
-   아이콘 폰트: [@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) (v6.6.0), [@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) (v6.6.0), [@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) (v0.2.2)
-   밴드 API 사용을 위한 dependencies: [jquery](https://www.npmjs.com/package/jquery) (v3.7.1), [moment](https://www.npmjs.com/package/moment) (v2.30.1), [moment-timezone](https://www.npmjs.com/package/moment-timezone) (v0.5.45), [underscore](https://www.npmjs.com/package/underscore) (v1.13.6)
-   차트 표시: [recharts](https://www.npmjs.com/package/recharts) (v2.13.3)
-   요소 스타일링: [styled-components](https://www.npmjs.com/package/styled-components) (v6.1.12)
-   사용자 선택을 위한 typeahead(자동 완성) 모듈: [react-typeahead](https://www.npmjs.com/package/react-typeahead) (v2.0.0-alpha.8)

## 참고자료

-   확장 프로그램 관련
    -   통신
        -   [크롬 익스텐션 컴포넌트끼리 통신하는 방법 - 개발기](https://velog.io/@broccolism/%ED%81%AC%EB%A1%AC-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%81%BC%EB%A6%AC-%ED%86%B5%EC%8B%A0%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95) by [Broccolism](https://velog.io/@broccolism/posts)
        -   [구글 확장프로그램 개발 (2)-스크립트간 통신](https://velog.io/@goban/구글-확장프로그램-개발-2-스크립트간-통신) by [이명환](https://velog.io/@goban/posts)
    -   [chrome.storage](https://developer.chrome.com/docs/확장 프로그램s/reference/api/storage) by Google
    -   [chrome.alarms](https://developer.chrome.com/docs/확장 프로그램s/reference/api/alarms) by Google
    -   [chrome.tabs](https://developer.chrome.com/docs/확장 프로그램s/reference/api/tabs) by Google
    -   [Localization message formats](https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats) by Google
    -   [Access window variable from Content Script](https://stackoverflow.com/questions/20499994)
    -   [Using `window` globals in ManifestV3 service worker background script](https://stackoverflow.com/questions/73778202)
    -   [[해결된 문제] Chrome 확장 프로그램 service worker inactive](https://my-chair.tistory.com/6) by [개발자의 의자](https://my-chair.tistory.com/)
-   [styled-components attrs()에 대하여](https://velog.io/@ayaan92/styled-components-.attrs%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC) by [Ayaan](https://velog.io/@ayaan92/posts)
-   Javascript
    -   날짜
        -   [[Javascript] YYYY-MM-DD 형태의 날짜 정보를 만들어보자!](https://velog.io/@rkio/Javascript-YYYY-MM-DD-%ED%98%95%ED%83%9C%EC%9D%98-%EB%82%A0%EC%A7%9C-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90) by [박기영](https://velog.io/@rkio/posts)
        -   [[JavaScript] 날짜 관련 유용 함수 총 정리(feat.String to Date)](https://java119.tistory.com/76) by [.java의 개발일기](https://java119.tistory.com/)
    -   URL 처리
        -   [Javascript / URL Query String 가져오기](https://velog.io/@nnakki/Javascript-URL-Query-String-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0) by [Wintering](https://velog.io/@nnakki/posts)
        -   [Event when window.location.href changes](https://stackoverflow.com/a/46428962)
    -   [Generate random string/characters in JavaScript](https://stackoverflow.com/a/1349426)
-   https://github.com/recharts/recharts/issues/397
