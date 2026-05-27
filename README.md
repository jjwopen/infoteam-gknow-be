<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🎓 교수 및 학과 관리 시스템 (Professor & Department Management API)

Prisma와 NestJS를 기반으로 구축된 교수 정보, 담당 교과목, 소속 부서(학과) 및 이메일을 관리하는 백엔드 애플리케이션입니다.

---

## 🛠️ Tech Stack
* **Framework**: NestJS
* **Database ORM**: Prisma
* **Database**: PostgreSQL
* **Documentation**: Swagger (`@nestjs/swagger`)

---

## 📊 Database ERD 및 데이터 모델 관계

Prisma 스키마를 기반으로 한 모델 간의 주요 관계는 다음과 같습니다.

* **Professor (교수)** ↔ **Email (이메일)**: `1:N` 관계 (한 명의 교수는 여러 이메일을 가질 수 있음)
* **Department (부서/학과)** ↔ **Email (이메일)**: `1:N` 관계 (한 부서는 여러 이메일을 가질 수 있음)
* **Professor (교수)** ↔ **Course (교과목)**: `M:N` 관계 (Prisma 암시적 다대다 관계)
* **Professor (교수)** ↔ **Department (부서/학과)**: `ProfessorDepartment` 연결 모델을 통한 `M:N` 관계 (교수 고유 번호 포함)

---

## 🚀 API 엔드포인트 명세 (API Specifications)

모든 기본 엔드포인트는 `/professors`를 접두사로 사용합니다.

### 1. 교수(Professor) 관련 API
| HTTP Method | URL | Description |
| :--- | :--- | :--- |
| `POST` | `/professors` | 새로운 교수 정보 추가 (이메일 생성, 과목/부서 연결 지원) |
| `GET` | `/professors` | 전체 교수 목록 조회 |
| `GET` | `/professors/:id` | ID 기반 특정 교수 상세 조회 |
| `GET` | `/professors/search/name?name=...` | 이름 기반 교수 검색 |
| `GET` | `/professors/search/course?name=...` | 담당 교과목 이름 기반 담당 교수 검색 |
| `GET` | `/professors/search/department?name=...` | 소속 부서 이름 기반 교수 목록 검색 |
| `PATCH` | `/professors/:id` | 교수 정보 수정 (이메일 및 부서 갱신 포함) |
| `DELETE` | `/professors/:id` | 교수 정보 삭제 |

### 2. 교과목(Course) 관련 API
| HTTP Method | URL | Description |
| :--- | :--- | :--- |
| `POST` | `/professors/courses` | 새로운 과목 추가 (담당 교수 연결 지원) |
| `GET` | `/professors/courses` | 전체 교과목 목록 조회 |
| `GET` | `/professors/courses/:id` | ID 기반 특정 과목 조회 |
| `GET` | `/professors/courses/search?name=...` | 과목 이름 기반 검색 |
| `PATCH` | `/professors/courses/:id` | 과목 정보 수정 (담당 교수 변경 등) |
| `DELETE` | `/professors/courses/:id` | 과목 삭제 |

### 3. 부서/학과(Department) 관련 API
| HTTP Method | URL | Description |
| :--- | :--- | :--- |
| `POST` | `/professors/departments` | 새로운 부서 추가 (소속 교수 및 이메일 연결 지원) |
| `GET` | `/professors/departments` | 전체 부서 목록 조회 |
| `GET` | `/professors/departments/:id` | ID 기반 특정 부서 조회 |
| `GET` | `/professors/departments/search?name=...` | 부서 이름 기반 검색 |
| `PATCH` | `/professors/departments/:id` | 부서 정보 수정 (소속 교수 리스트 및 이메일 갱신) |
| `DELETE` | `/professors/departments/:id` | 부서 삭제 |

---

## 💡 주요 구현 특징

* **예외 처리 (Exception Handling)**: 존재하지 않는 ID나 이름으로 데이터 조회/수정/삭제 시 `NotFoundException`이 발생하며, 유저 친화적인 에러 메시지를 반환합니다.
* **레이어드 아키텍처 (Layered Architecture)**: `Controller -> Service -> Repository -> Prisma` 구조로 계층이 완벽히 분리되어 있어 유지보수와 확장성이 뛰어납니다.
* **트랜잭션 안전성**: `Update` 관련 API 호출 시 기존에 연결되어 있던 관계 데이터(`emails`, `departments`)를 `deleteMany` 후 새롭게 `create` 하여 데이터 무결성을 보장합니다.

---

## 🏃‍♂️ 시작하기 (Getting Started)

### 1. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 데이터베이스 연결 정보를 입력합니다.
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
