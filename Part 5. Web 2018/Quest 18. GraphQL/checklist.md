# Quest 17. GraphQL

## Topics

-   REST
-   GraphQL
    -   Schema
    -   Resolver
    -   DataLoader

## Checklist

-   REST 기반의 API는 무엇인가요? 어떤 장점과 단점을 가지고 있을까요?
-   GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?
-   GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?
    -   node.js 상에서 GraphQL 서버를 실행하고 스키마를 정의하려면 어떻게 해야 하나요?
-   GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?
    -   GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?
-   클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?
    -   Apollo Client의 장점은 무엇일까요?
    -   Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

## RESTful API

REpresentational State Transfer의 줄임말로, 어떠한 Resource에 대해 그것을 나타내는 URI를 엔드포인트로 정하고, 어떤 Action을 취할 것인지는 http method를 이용해 나타내는 방식이다.

처음 등장한 것은 HTTP의 저자 중 한 사람인 Roy Fielding의 2000년 박사 학위 논문이다. 모덴 웹 아키텍쳐에 대해 이야기하면서 HTTP 1.1과 병행하면서 REST라는 네트워크 아키텍처 원리의 모음을 정의했다.

REST는 엄격한 의미로 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반을 말하는데, 지금은 조금 더 넓은 의미로 웹상에서 사용되는 여러 리소스를 HTTP URI로 표현하고, 그 리소스에 대한 행위를 HTTP Method로 정의하는 것을 말한다.

HTTP URI란, Uniform Resource Identifier, 즉, 해당 사이트의 특정 자원의 위치를 나타내는 유일한 주소. 예를 들어, `https://finance.naver.com/marketindex`를 의미한다.

두번째로 HTTP Method란 HTTP request가 의도하는 action을 정의한것. 예를 들어, POST, GET 등등...

마지막으로 payload를 전달하게 되는데, 여기서 payload는 자원 혹은 자원의 상태를 말하며 주로 JSON, XML 형식이다.

REST는 6 가지의 제한 조건을 가진다.  
첫째로 클라이언트 / 서버 구조를 가져야 한다. 클라이언트가 사용자의 경험과 컨텍스트에 집중하고, 서버는 데이터 처리와 비스니스 로직을 담당하면서 서로 독립적으로 존재할 수 있도록 하는 구조이다.  
두번째로 클라이언트의 상태가 서버에 저장되어서는 안 된다.  
세번째로 클라이언트는 서버로부터의 응답을 캐싱할 수 있어야 한다. 효율적인 캐싱을 통해 서버와의 상호 작용을 최소화하여 확장성과 성능을 향상시킬 수 있다.  
네번째로 클라이언트와 서버의 계층화이다. 클라이언트는 서버에 직접 연결되어 있는지, Nginx와 같은 리버스 프록시를 통한 것인지 알 수 없어야 하고, 이러한 특징을 활용해 로드 벨런싱, 공유 캐시 등 시스템 규모 확장성을 향상 시킬 수 있다.  
다섯번째로 필요에 따라 서버는 클라이언트에 필요한 자바스크립트 코드와 같은 소스 코드, 로직을 전달해 기능을 확장할 수 있다.  
마지막으로 아키텍처를 단순화하고 작은 단위로 나누어 클라이언트 / 서버의 각 단위가 독립적으로 개선될 수 있도록 한다.

REST를 사용했을 때의 장점은 몇 가지가 있는데, 먼저 HTTP 위에서 작동하기 때문에 별도의 인프라를 구축할 필요도 없고, HTTP를 따르는 모든 플렛폼에서 사용할 수 있기 때문에 범용성이 좋다. 두번째로는 REST를 잘 설계했을 경우, 직관적으로 어떠한 자원에 대한 어떤 액션을 취하는지 알 수 있기 때문에 클라이언트와 서버가 모두 의도하는 바를 파악하기 쉬워 진다.

REST도 장점만 있는 것은 아니다. 먼저 RESTful에 대한 명확한 표준이 존재하지 않는다. 그래서 어떻게 사용하는가가 사용처마다 조금씩 다를 수 있다. 두번째로는 사용할 수 있는 메소드가 제한적이고, 이에 맞추어 RDBMS를 사용하기에 조금 까다로울 수도 있다. 마지막으로 정해져 있는 ENDPOINT 때문에 payload에 대한 기준을 세우기 어렵다. 작은 단위로 API를 구성하게 되면 클라이언트에서는 필요한 자원을 위해 많은 수의 요청을 하게 되는 현상(underfetching)이 일어나게 되고, 그 반대로 필요없는 데이터까지 한번의 ENDPOINT로 받게 되는 (overfetching)이 일어날 수도 있다. 더 나아가 payload의 데이터 구조를 직접 응답을 받기 전까지는 모를 수 있기 때문에 이를 파악하는 것이 더 까다로워질 수 있다.

한마디로 RESTful API로는 다양한 기종에서, 다양한 상황들에 대해 필요한 데이터를 효율적으로 받는 것이 힘들 수 있다. 이에 반해서, 등장한 것이 위와 같은 문제에 편히 대응할 수 있도록 한 Query Language, GraphQL이다.

## GraphQL

GraphQL은 SQL과 같은 쿼리 언어이다. 하지만 SQL은 데이터베이스 시스템에 저장된 데이터를 가져오는 언어라면, gql은 주로 클라이언트가 서버로부터 효율적으로 데이터를 호출하기 위해 사용되는 언어이다.

gql도 REST와 마찬가지로 HTTP를 사용하는 모든 플렛폼에서 사용이 가능하다. 또한 네트워크 방식에도 종속적이지 않아서, 일반적으로는 HTTP POST 메소드와 웹소켓 프로토콜을 활용하지만 필요에 따라서 TCP/UDP 활용하거나 심지어는 이더넷 프레임을 활용할 수도 있다.

REST는 HTTP Method와 URL을 활용한 다양한 ENDPOINT가 존재하지만, gql은 하나의 ENDPOINT를 가진다. 또한 REST는 ENDPOINT마다 다른 sql 쿼리를 가진다면, gql은 스키마 타입에 따라 여러가지 sql 쿼리 조합이 달라진다.

-   ### Schema

    gql 스키마를 작성할 때는 type과 field로 작성하면 된다. 각 type에 각 field에 대해 함수를 만들 수도 있다.

    ```graphql
    type User {
        id: ID
        name: String!
    }

    type Query {
    	self: User
    }

    function Query_self(request) {
    	return request.auth.user;
    }

    function User_name(user) {
    	return user.getName();
    }
    ```

    GraphQL이 쿼리 요청을 받게 되면 이를 실행하는데 먼저 받은 쿼리가 타입, 필드로 정의되어 있는지 확인하고, 제공된 함수에 따라 결과를 반환하게 된다.

    ```graphql
    {
        self {
            name
        }
    }
    ```

    ```json
    {
        "self": {
            "name": "Neo"
        }
    }
    ```

    GraphQL은 query / mutation 두 가지의 요청 방식이 존재한다. 이 둘의 응답 내용의 구조는 직관적이며 거의 유사하다. 다만, 쿼리는 주로 READ에 사용되고 뮤테이션은 주로 CREATE, UPDATE, DELETE에 사용된다는 개념적인 차이가 있다.

    GraphQL은 쿼리할 때 인자를 건낼 수도 있다.

    ```graphql
    {
    	human(id: '123') {
    		name
    		age
    	}
    }
    ```

    ```json
    {
        "data": {
            "human": {
                "name": "Neo",
                "age": 33
            }
        }
    }
    ```

    REST에서 처럼 하나의 인자를 건낼 수도 있다. 하지만 GraphQL은 모든 필드와 이에 nested 객체에 인자를 부여할 수 있어서 여러 번의 API 호출을 줄여준다.

    GraphQL은 반복적인 쿼리가 있을 경우에 사용할 수 있는 `fragments`라는 유닛이 있다. 이를 사용하면 일종의 field 세트를 만들어 재사용할 수 있다.

    ```graphql
    {
    	theOne: human(id: '123') {
    		...comparisonFields
    	}
    	matrix: machine(id: '1') {
    		...comparisonFields
    	}
    }

    fragment comparisonFields on Character {
    	name
    	roll
    }
    ```

    ```json
    {
    	"data": {
    		"theOne": {
    			"name": "Neo",
    			"roll": "hero"
    		},
    		matrix": {
    			"name": "Smith",
    			"roll": "anti hero"
    		}
    	}
    }
    ```

    쿼리에 인자를 건낼 수 있듯이 `fragment`에도 인자를 건낼 수 있다.

    위와 같은 방식으로 쿼리를 작성할 수도 있지만 지속적인 반복과 실제 앱에서 사용하기 위해서는 오퍼레이션 네임 쿼리를 만드는 것이 더 좋다.

    ```graphql
    type Human {
        id: ID!
        name: String!
    	roll: String!
    }

    type Query {
        getHumanNameAndRoll(humanId: ID!): Human
    }

    query getHumanNameAndRoll(humanId: $humanId) {
        name
        roll
    }
    ```

    이처럼 일종의 쿼리용 함수를 만들어서 기존의 REST 방식에서 백앤드 프로그래머가 작성해 놓은 API 문서에 의존해야하는 것에서 벗어나 Client가 직접 (일종의)프로시져를 작성하고 관리할 수 있다.

        타입은 scalar 타입을 사용한다
        !는 필수 값을 의미
        []는 배열을 의미

-   ### Resolver

    리졸버는 데이터를 가져오는 구체적인 과정을 구현하는 것을 담당한다. 데이터베이스에서 데이터를 가져오거나, 파일에서 데이터를 가져오거나, 다른 네트워크 프로토콜을 활용해서 원격 데이터를 가져오는 것도 가능하다. 그렇기 때문에 legacy 시스템이 있더라도 gql 기반으로 바꿀 수 있도록 해준다.

    gql에서 Query는 각각의 필드마다 일종의 함수가 하나씩 존재한다. 그리고 이 함수를 통해 해당 타입을 반혼한다. 이때의 함수를 리졸버라고 한다. 만약 필드가 함수가 아닌 경우, 실행이 종료된다.

    기본적으로 리졸버 호출은 깊이 탐색 방식으로 작동한다. 따라서 하나의 타입에 대해 재귀적으로 호출하고 그 다음 타입으로 넘어가는 방식이다.

    GraphQL에서 엔트리 포인트는 Root 타입, Query 타입이다.

    ```graphql
    Query: {
    	human(parentObj, args, context, info) {
    		return context.db.loadHumanById(args.id).then(userData => new Human(userData))
    	}
    }
    ```

    다음과 같은 리졸버가 있다고 가정할 때,

    1.  이 리졸버는 context에서 데이터베이스 정보를 가져와 해당 데이터 베이스에 접근해
    2.  gql 쿼리 필드로부터 받은 args의 id를 이용해 `loadHumanByID`라는 메소드를 호출한 뒤,
    3.  userData를 가져와 이를 활용해 Human객체를 생성하고 반환한다.

*   ### Dataloader

    GraphQL에서는 ORM을 사용할 때처럼 N + 1 문제가 발생할 수 있다. 일반적인 ORM에서의 N + 1 문제는 다음과 같다.

    예를 들어 `Post` 엔터티와 `Comment` 엔터티가 있다고 가정할 때, 이 둘 사이의 관계는 `1:N`이다. 만약 Post 목록과 해당 Post에 해당하는 Comments를 조회하려고 한다면 각각의 comments + post, 즉 N + 1만큼 쿼리가 실행된다. 이를 해결하기 위해서 미리 JOIN 연산을 사용할 수 있다.

    GraphQL에서도 비슷한 방식으로 N+1이 발생한다.

    ```graphql
    type Post {
    	id: Int!
    	title: String!
    	content: String!
    	comments: [Comment!]!
    }
    type Comment {
    	id: Int!
    	content: String!
    }
    type Query {
    	posts: [Post!]!
    }

    query {
    	posts {
    		id
    		title
    		content
    		comments {
    			id
    			...
    		}
    	}
    }
    ```

    ```graphql
    const resolver = {
    	Query: {
    		posts: async () => {
    			return await Post.find()
    		}
    	},
    	Post: {
    		comments: async (root) => {
    			return Comment.find({ where: { postId: root.id } })
    		}
    	}
    }
    ```

    보통 위와 같은 방식으로 resolver를 구성하게 되는데, posts에서 post에 대한 쿼리 1번, comments에 대한 쿼리 N번을 실행하게 된다. 조금 더 구체적인 예시로,

    ```graphql
    {
        developers {
            name
            project {
                name
            }
        }
    }
    ```

    위와 같은 쿼리의 실제 sql 쿼리문은 다음과 같다.

    ```sql
    SELECT d.id, d.name, d.role FROM developer d  - undefined
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":1}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":2}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":3}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":4}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":5}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":6}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":7}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":8}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":9}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":10}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":11}
    SELECT a.projectId, p.name, p.description FROM assignments a LEFT JOIN project p ON (p.id = a.projectId) WHERE a.developerId = $id - {"$id":12}
    ```

    엄청난 쿼리문의 양인데, developer와 project가 1:N 관계이기 때문에 발생하는 것이다.

    이를 DataLoader를 사용하게 되면,

    ```sql
    SELECT d.id, d.name, d.role FROM developer d  - undefined
    SELECT d.id, p.id as projectId, p.name, p.description
    FROM developer d
    LEFT JOIN assignments a
    ON (d.id = a.developerId)
    LEFT JOIN project p
    ON (p.id = a.projectId)
    WHERE d.id IN (?,?,?,?,?,?,?,?,?,?,?,?) - ["1","2","3","4","5","6","7","8","9","10","11","12"]
    ```

    DataLoader는 이와 같이 N+1 문제를 batch를 통해 1+1로 변환해주는 라이브러리이다. 주로 gql에서 많이 사용되지만 어떤 의존성을 갖고 있지는 않다.

    DataLoader는 자바스크립트의 event-loop을 이용한다. 주요 기능으로 batching을 사용하는데, 이것은 event-loop에서 하나의 tick에서 실행된 데이터 fetch에 대한 요청을 하나의 요청으로 모아서 실행하고, 그 결과를 다시 분배하는 역할을 한다.

    다시 위에서 Post와 Comment에 대한 DataLoader를 구현해보자면 post id를 한번씩 쿼리하는 것이 아니라 배열 형태로 캐싱해두고 있다가 한번에 batch 함수에 건낸다.

    ```js
    const batchLoadFn = async (postIds) => {
        const posts = await Post.findAll();

        return postIds.map((id) => posts.find((post) => post.id === id));
    };

    const commentsLoader = new DataLoader(batchLoadFn);
    ```

    ```graphql
    Post: {
    	comments: async (post) => commentsLoader.load(post.id)
    }
    ```

-   ### Apollo Client

    GraphQL도 HTTP 프로토콜 기반으로 동작하기 때문에 간단하게 fetch 함수로도 충분히 gql 요청을 보낼 수 있다.

    ```js
    const endpoint = 'https://localhost.com/graphql';
    const query = `{
    		developers {
    			name,
    			project {
    				name
    			}
    		}
    	}`;

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });
    ```

    이처럼 gql도 http의 post 메소드를 사용해서 query를 body에 담아 보내면 언제나 응답을 받을 수 있다. 하지만 이럴 경우 한 가지 단점은 브라우저는 자동을 GET에 대해서 static하고 변화가 잦지 않은 데이터에 대해서는 캐싱해두어 불필요한 네트워크 지원 손실을 막는다.

    하지만 gql의 경우 항상 POST 방식의 메소드를 사용하기 때문에 클라이언트 측에서 자동으로 응답을 캐싱하기가 어렵다. 이에 Apollo-Client 같은 GraphQL 라이브러리를 사용하면 각각의 요청 별로 캐싱해둘 수 있다는 장점이 생긴다.
