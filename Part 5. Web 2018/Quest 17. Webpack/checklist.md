# Quest 17. Webpack

## Topics

-   Webpack
-   Bundling
-   Image Sprite
    -   Data URL
-   Transpiling
    -   Source Map
-   Hot Module Replacement

## Checklist

-   여러 개로 나뉘어진 자바스크립트나 이미지, 컴포넌트 파일 등을 하나로 합치는 작업을 하는 것은 성능상에서 어떤 이점이 있을까요?
    -   이미지를 Data URL로 바꾸어 번들링하는 것은 어떤 장점과 단점이 있을까요?
-   Source Map이란 무엇인가요? Source Map을 생성하는 것은 어떤 장점이 있을까요?
-   Webpack의 플러그인과 모듈은 어떤 역할들을 하나요?
    -   Webpack을 이용하여 HMR(Hot Module Replacement) 기능을 설정하려면 어떻게 해야 하나요?

## Webpack

웹팩의 핵심은 모던 자바스크립트 어플리케이션에서 모듈 번들러로서 작동한다는 것이다. 우선 모듈이라는 것은 무엇이며 왜 사용하게 되었을까.

모듈이라는 것은 큰 체계의 구성 요소라고 볼 수 있는데, 프로그래밍에서 클래스나 라이브러리가 향상됨에 따라서 점점 그 중요성이 대두되었다. 초기에는 분리된 독립성의 모듈로 도입되었지만 점차 객체화, 캡슐화, 모듈화 프로그래밍 기법 등이 도입되었다.

각각의 모듈은 전체의 프로그램보다 작은 단위로, 각각 다른 verification, debugging, testing을 갖고 있다. 잘 만들어진 모듈일수록 추상화, 캡슐화가 잘 되어 있어 각각의 모듈이 전체 어플리케이션에 대해서 논리적인 디자인을 갖고, 분명한 목적을 갖고 있다.

모듈의 추상화, 캡슐화와 같은 특징을 활용하면 모듈 간의 독립성을 높일 수 있고, 충돌을 방지할 수도 있으며 재사용성도 높아질 수 있다.

Node.js에서는 모듈 프로그래밍을 지원했었지만 웹에서의 모듈 도입은 굉장히 더뎠다. 많은 도구들이 웹에서 자바스크립트 모듈러를 지원했고, 그 장점과 단점을 참고하여 탄생한 것이 웹팩이다.

Node.js는 모듈의 의존성이 정해져 있는 반면, 웹팩은 다양한 방식으로 정할 수 있다.

또한 웹팩은 "Loaders"를 통해 다양한 언어와 전처리기를 번들링할 수 있도록 한다. 예를 들어 다음의 것들: `CoffeeScript`, `TypeScript`, `ESNext(Babel)`, `Sass`, `Less`, `Stylus`, `Elm`

웹팩을 시작하기에 앞서 가장 기본적인 것들의 개념을 짚어보고자 한다.

-   #### Entry

    웹팩이 어플리케이션에서 작동하기 시작할 때, 엔트리 포인트(cli, 혹은 config 파일에서 지정)에서부터 시작해서 어플리케이션에 필요한 모든 모듈을 재귀 방식으로 의존성 그래프를 만들고 그 모듈들을 하나의(혹은 몇개) 번들로 만들어 브라우저에 로드될 수 있도록 한다.

    따라서 Entry Point는 Dependency Graph의 시작점이라고 볼 수 있다. Default로 `./src/index.js`로 지정되어 있지만 `추가적으로 설정이 가능하다.

    ```js
    module.exports = {
        entry: './path/to/entry/file.js',
    };
    ```

    위의 코드는 사실 다른 코드의 줄임으로 `entry`는 기본적으로 객체 형식으로 표현이 가능하다.

    ```js
    module.exports = {
        entry: {
            app: './src/app.js',
            addminApp: './src/adminApp.js',
        },
    };
    ```

    권장하기로는 하나의 HTML 파일에 하나의 entry 포인트를 갖는 것을 권장한다. 만약 SPA라면 index.html에 대한 하나의 entry point가 존재할 것이다.

-   #### Output

    output은 웹팩의 번들 파일을 어떠한 경로에 만들 것인가에 대한 설정이다. default로 `./dist/main.js`이며 dist 폴더에 다른 파일들도 생성된다.

    ```js
    const path = require('path');

    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-webpack.bundle.js',
        },
    };
    ```

-   #### Loaders

    사실 웹팩은 Javascript와 JSON 파일만 해석할 수 있다. 하지만 Loaders를 통해 다른 타입의 파일들을 유효한 모듈로 변화시켜 dependency graph에 추가한다.

    Loaders는 모듈의 소스 코드를 `import`하거나 LOAD 할 때 작동한다. 그래서 TypeScript를 Javascript로, 혹은 인라인 이미지를 data URLs로 변환시켜준다.

    `loaders`는 `configuration`에서 두 개의 프로퍼티를 갖고 있다.

        1. test: 어떠한 파일을 transform 할 것인가
        2. use: transforming할 때 어떠한 loader를 가리킬 것인가

    ```js
    const path = require('path');

    module.exports = {
        output: {
            filename: 'my-webpack.bundle.js',
        },
        module: {
            rules: [{ test: /\.txt$/, use: 'raw-loader' }],
        },
    };
    ```

    위의 코드를 통해 webpack compiler로 하여금 `.txt`를 가진 파일을 만나면 `raw-loader`를 사용하여 번들에 추가 시키도록 할 수 있다.

    주로 사용하는 loader로는 `css-loader`, `style-loader`, `file-loader`, `url-loader`가 있다.

    웹팩 안에선 모든 것이 모듈이기 때문에 css도 자바스크립트 안에서 불러올 수 있는데, `css-loader`를 통해 자바스크립트에서 활용할 수 있다. 또 모듈로 변경된 자바스크립트로된 css
    를 브라우저의 DOM에 추가해야 하기 때문에 `style-loader`를 사용하여 DOM에 추가한다.

    만약 사용하는 이미지의 갯수가 많다면 그만큼 네트워크 리소스를 소모해야 한다. 결국 이미지도 http 통신을 사용해서 전송되기 때문에 사용하는 네트워크 리소스가 적다곤 할 수 없다.

    그래서 만약 한 페이지에 작은 이미지를 여러개 사용한다면 Data URI Scheme을 이용하는 방법이 더 좋다. `url-loader`는 Data URI Scheme 즉, 이미지를 Base64
    로 인코딩하여 문자열 형태로 소스코드에 넣는 것을 자동을 해준다.

    ```js
    module.exports = {
        test: /\.png$/,
        use: {
            loader: 'url-loader',
            options: {
                publicPath: './dist/',
                name: '[name].[ext]?[hash]',
                limit: 5000, // 5kb
            },
        },
    };
    ```

    위와 같은 방식으로 5kb 미만인 파일을 Data URI Scheme으로 변경할 수 있다.

-   #### Plugins

    웹펙 자체는 웹팩 configuration 에서 정하는 플러그인 시스템으로 동작되며 `Loaders`가 파일 단위로 처리했다면, 번들된 파일들을 처리하기 위해 존재한다.

    번들된 자바스크립트를 난독화하거나 특정 텍스트를 추추하는 용도로 사용할 수 있다.

    웹팩 플러그인은 `apply` 메소드를 가진 자바스크립트 객체이다. 여기서 `apply` 메소드는 웹팩 컴파일러가 실행하는데, 이를 통해 전체 컴파일 라이프 사이클을 사용할 수 있도록 해준다.

    ```js
    const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

    module.exports = class ConsoleLogOnBuildWebpackPlugin {
        apply(compiler) {
            compiler.hooks.run.tap(pluginName, (compilation) => {
                console.log('The Webpack build process is starting!');
            });
        }
    };
    ```

    보통 웹팩에서 제공하는 플러그인을 사용하거나 써드 파티 플러그인을 사용한다.

    BannerPlugin을 사용하면 웹팩 컴파일 타임에 얻을 수 있는 정보, 빌드 시간이나 커밋 정보를 전달할 수 있다.

    DefinePlugin을 사용하면 코드의 작동 환경에 따라 다르게 작용하는, 환경 의존적인 정보를 관리할 때 사용하면 좋다. 예를 들어 API 주 같은 것들.

    `process.env.NODE_ENV`의 값이 기본적으로 플러그인의 인자로 들어간다. 웹팩 설정의 `mode`에서 설정한 값이 여기에 할당된다.

    이외에도 빌드 타임에 결정될 여러 환경 변수들을 설정하는 것이 가능하다.

-   #### 이미지 스프라이트 & Data URL

    브라우저가 이미지를 로드할 때, 하나 하나의 이미지를 받기 위해 각각 네트워크를 사용하는 요청을 보내는, 만약 이때 다운 받는 이미지가 많을 경 일일이 요청을 보내야 하기 때문에 오래걸릴 수가 있다.

    이미지 스프라이트는 이를 위해 여러 개의 이미지를 한 개의 파일에 합쳐 그 하나의 파일만 한번에 다운로드 받도록 하는 기법을 말한다.

    하지만 기존의 이미지 스프라이트에 새로운 이미지를 추가한다거나 아니면 이미지를 업데이트하는 경우, `background -position`을 전부 업데이트 해야 하는 불편함이 있을 수도 있고 애초에 이미지 스프라이트를 만드는 것도 공수가 들 수도 있다.

    Data URL도 이미지 스프라이트와 마찬가지로 요청 횟수를 줄일 수가 있고, HTML
    파일 안에서 코드로 관리 가능하다는 점에서 편리하다.

    하지만 디스크 캐싱이 아니기 때문에 항상 요청하여 가져와야 한다는 단점이 있고, 기존의 바이너리 형태의 데이터보다 사이즈가 더 커진다는 단점이 있다.

-   #### Transpiling

    트랜스파일링은 한 언어로 작성된 소스 코드를 비슷한 수준의 추상화를 가진 다른 언어로 변환하는 것을 말한다. 예를 들어, `Typescript` => `Javascript`

    이외에도 최신 브라우저는 대부분 ES6 사양을 지원하고 있지만 아직 미비한 기능들이 있는 상황이고, IE
    같은 경우에는 거의 미비한 수준의 지원을 하기 때문에 최신 사양의 소스 코드로 개발했다면 그 소스 코드를 브라우저가 해석할 수 있도록 ES5 이하의 수준으로 트랜스파일링할 필요가 있다.

    때문에 사용하는 것이 Babel과 같은 트랜스파일러이다. Babel
    을 사용하면 최신 사양의 소스 코드로 개발해도 낮은 사양의 소스 코드로 트랜스파일해 줄 수 있다.

-   #### Source Map

    트랜스파일링과 번들링을 통해 하나의 자바스크립트 파일로 합쳐지게 되면 어떠한 부분에서 에러가 발생했을 때, 디버깅하기가 매우 까다로워진다. 이를 위해 소스 코드와 매핑을 해주는 것이 Source Map이다.

    `devtool` 프로퍼티의 값을 통해 여러 옵션을 지정할 수 있다.

-   #### Hot Module Replacement

    HMR은 어플리케이션이 작동하는 과정에서 전체를 리로드하는 것이 아니라 특정 모듈만 추가, 삭제, 교환하면서 효율성을 높이는 기술이다.

    전체를 리로드하지 않으면서 어플리케이션의 상태를 유지시킬 수 있고, CSS/JS
    에 변화가 생긴 부분만 브라우저에 업데이트 시키면서 속도에도 이점이 있다.

    전체적인 진행 과정은 다음과 같다.

    1. 어플리케이션이 HMR 런타임에 변경 사항을 검사하도록 한다.
    2. 런타임은 비동기적으로 변경 사항을 다운로드 받은 뒤에 어플리케이션에 알린다.
    3. 어플리케이션은 런타임에 업데이트를 적용할 것을 확인한다.
    4. 런타임에서 동기적으로 업데이트를 반영한다.
    5. HMR을 자동으로 실행되도록 할 수도 있고, 업데이트가 반영되도록 사용자의 상호 응답을 요구할 수 있도록 만드는 것도 가능하다.
