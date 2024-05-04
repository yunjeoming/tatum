# Tatum 과제

## 폴더 구조

```
src
├── app        // 라우터
├── components // 재사용 컴포넌트
├── pages      // 클라이언트 페이지 컴포넌트
└── types      // 컴포넌트 타입 정의
```

## 설치 및 실행

1. 모듈 설치

   > npm install

2. 실행
   > npm run dev

## 주요 변수 설명

### nodeData: 트리뷰 데이터

`TreeNode` 타입을 가진 `nodeData`로 트리뷰에 모든 데이터를 보여주거나, 검색한 데이터를 보여줍니다.

### checkedKeys: 테이블 리스트 데이터

policyId의 집합으로 테이블 리스트에 보여줄 항목들입니다. 또한, 트리뷰에서 체크 여부를 판별하기 위해 사용됩니다.

### checkedNodes: 태그 데이터

태그 데이터는 `nodeData` 중 최상위에서 완전 체크된 노드이기 때문에 `nodeData`와 `checkedKeys`를 기반으로 현재 노드가 checkedKeys를 모두 포함할 경우 현재 노드를 반환합니다.

### columns: 테이블 head 데이터

테이블 head에 넘겨줄 `Column[]` 타입의 state입니다.

### rows: 테이블 body 데이터

테이블 body에 넘겨줄 `Row[]` 타입의 state로 `checkedKeys`를 변환시켰습니다.

### mapData: policyId를 key로 갖는 객체

mapData는 policyId를 key로 갖고 대분류, 중분류, 소분류, 이름의 key를 가진 객체를 value로 갖고 있습니다. checkedKeys를 테이블의 row data로 변환시키기 위해 사용됩니다.

### originNode

csv의 응답데이터를 변환시켜 얻은 최초의 original node입니다.

## 동작 방식 설명

1. csv 응답 데이터를 `mapData`, `originNode`, `columns`, `nodeData`로 변환시킵니다.

2. nodeData로 트리뷰에 옵션들을 그려줍니다.

3. 체크박스를 클릭하면 해당 node의 정보를 얻게되고, 체크 여부에 따라 node가 갖고 있는 하위키들을 checkedKeys에 추가/또는 삭제합니다.

4. checkedKeys가 변경되면 테이블 데이터 rows와 태그 데이터 checkedNodes를 새로 얻어냅니다.

이후 3-4 과정을 반복합니다.

### 검색을 하게 될 경우

1. originNode로부터 자신을 포함하여 자식의 name에 검색어가 있는지 확인하고, 검색어가 있는 노드만 반환되어 새로운 노드가 setNodeData로 변경됩니다.

2. 검색어를 지우거나, 검색 후 우측의 x 버튼을 클릭할 경우 originNode가 다시 setNodeData로 대체됩니다.

## Test case

1. 트리뷰의 최상단 노드인 `Identity & Crypto`를 체크

   1. 테이블 리스트에 총 23개의 항목이 출력됩니다.
   2. 선택된 옵션에서 총 23개의 항목이 선택되어있고, 온전한 "v" 표시의 최상단 노드인 `Identity & Crypto`가 all 문구와 함께 태그로 출력됩니다.

2. 검색창에 `kms` 검색

3. `Identity & Crypto > KMS > 고객 관리형 정책의 KMS 키 복호화 및 재암호화 작업 제한` & `Identity & Crypto > KMS > 고객 인라인 정책의 KMS 키 복호화 및 재암호화 작업 제한` 항목 체크 해제

   1. 테이블 리스트에서 위 2개 항목이 제거됩니다.
   2. 선택된 옵션에서 선택 갯수가 감소합니다.
   3. 선택된 옵션에서 `Identity & Crypto:all`이 하위 카테고리로 쪼개집니다.
      1. 모두 선택된 `Certificate Manager` & `IAM`은 all 문구와 함께 태그로 출력됩니다.
      2. KMS의 하위 카테고리 중 선택된 나머지 항목들은 각각 하나씩 태그로 출력됩니다.

4. 검색어 kms를 지우고 `Identity & Crypto`의 펼치기 버튼을 클릭

5. 선택된 옵션에서 `Identity & Crypto > IAM:all ` 태그를 삭제
   1. 트리뷰에서 `IAM`의 체크박스가 해제됩니다.
   2. 테이블 리스트에서 `Identity & Crypto > IAM` 카테고리를 가진 항목들이 제거됩니다.
   3. 선택된 옵션의 선택 갯수가 감소합니다.

## 기타 참고 사항

### 검색

- 상위 카테고리 검색시 하위 카테고리들도 같이 검색됩니다.
- 선택된 옵션의 최상위 태그는 검색 결과와 무관하게 `선택 갯수/모든 옵션 갯수`입니다.
