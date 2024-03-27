# TypeScheduler

**TypeScheduler**는 NodeJs의 Cron 표현식 기반 스케줄러를 유연하게 사용할 수 있는 추상 레이어입니다.

데코레이터를 사용해 반복할 작업을 스케줄러에 등록할 수 있으며 Cron 표현식을 객체로 표현할 수 있고 문자열로 작성하면 파싱 및 검증하는 기능을 제공합니다. 추가로 DI 컨테이너를 같이 사용한다면 작업 객체에 의존성 주입이 가능하고 작업이 자동으로 등록됩니다.

실제 반복할 작업의 실행을 위해서는 [node-cron](https://www.npmjs.com/package/node-cron)과 같이 작업을 일정 시간마다 실행해주는 기능을 구현한 패키지를 주입해야합니다.

Type-Scheduler는 [TypeGraphQL](https://typegraphql.com/), [TypeORM](https://typeorm.io/), [TypeDI](https://github.com/typestack/typedi)와 같은 타입스크립트 기반 객체 지향 프레임워크의 영향을 받아 만들어졌습니다.

## 설치

1. TypeScheduler를 설치합니다.  
   `npm install type-scheduler`
2. 스케줄 구현체를 선택해 설치합니다. 예시로 node-cron을 설치했습니다.
   `npm install node-cron`

**TypeScript 환경 설정**

- Typescript 3.3 버전 이상에서 tsconfig.json을 아래 두 옵션을 활성화해 데코레이터 사용을 활성화합니다.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## 사용

### 반복 작업 생성

반복할 작업을 아래와 같이 객체로 생성합니다.

**@Job**

- `@Job` 데코레이터는 해당 클래스가 반복 작업임을 나타내며 어느 주기로 반복할 것인지에 대한 Cron 표현식을 인자로 받습니다.
- 작성된 Cron 문자열 표현식은 실행 시 객체로 해석되고 검증 후 스케줄러에 등록됩니다.

```ts
@Job("* * * * *")
class ExampleJob implements JobHandler {
  async handle() {
    console.log("Hello TypeScheduler");
  }
}
```

- 만약 크론 표현식에 익숙하지 않다면 `CronExpression` 빌더 객체를 사용해 반복 주기를 생성할 수 있습니다.
- 아래 예제의 객체는 "\* 12 \* \* \*"로 해석되며 매일 12시에 실행되도록 예약됩니다.
- 빌더의 각 표현 구간(minute, hour, dayOfMonth, month, dayOfWeek)의 기본 값은 '\*'로 every는 생략할 수 있습니다.

```ts
@Job(
  new CronExpression()
    .minute((minute) => minute.every())
    .hour((hour) => hour.value(12))
    .dayOfMonth((dayOfMonth) => day.every())
    .month((month) => month.every())
    .dayOfWeek((dayOfWeek) => day.every())
)
class EveryDayAtNoonJob implements JobHandler {
  async handle() {
    console.log("Good afternoon");
  }
}
```

- `name 옵션`을 추가하면 작업에 대한 이름을 별도로 정의할 수 있습니다.

```ts
@Job("* * * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob implements JobHandler {
  async handle() {
    console.log("Good afternoon");
  }
}
```

- **JobHandler** interface는 작업 등록에 필요한 handle 메서드를 구현하라는 지침으로 handle 메서드만 있다면 interface를 상속하지 않아도 괜찮습니다. (인터페이스 상속은 handle 메서드 구현을 강제하기 때문에 사용하는 것을 추천합니다.)

```ts
@Job("* * * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob {
  async handle() {
    console.log("Good afternoon");
  }
}
```

### 반복 작업 등록

- 아쉽게도 다른 파일 혹은 폴더에 생성한 작업을 컨테이너 없이 스케줄러가 자동으로 읽어오는 것은 불가능합니다.
- 스케줄러에 직접 작업을 추가해야 정상적으로 인식하고 등록할 수 있습니다.

```ts
const scheduler = new Scheduler({
  jobs: [ExampleJob, EveryDayAtNoonJob],
});
```

### 스케줄러 구현체 등록

- 마지막으로 실제 반복 작업을 정해진 시간에 실행해줄 구현체를 등록해야 합니다.
- 구현체에 대한 인터페이스는 아래와 같습니다.

```ts
export interface ScheduleRunner {
  schedule(expression: string, job: () => void | Promise<void>): void;
}
```

- ScheduleRunner 인터페이스와 호환되는 구현체는 바로 사용 가능합니다. 만약 구현체의 작업 등록 방식이 다르다면 호환되도록 아래와 같이 어댑터를 만들어 등록할 수 있습니다.

```ts
export class ScheduleRunnerAdapter {
  constructor(private readonly schedulerRunner: any) {
    this.schedule = this.schedule.bind(this);
  }
  schedule(expression: string, job: () => void) {
    //실제 등록 방식에 맞춰서 수정해주세요.
    this.scheduleRunner.add(job, expression);
  }
}
```

- 아래는 node-cron을 사용한 예시입니다.

```ts
import cron from "node-cron";

function main() {
  const scheduler = new Scheduler({
    runner: cron,
    jobs: [ExampleJob, EveryDayAtNoonJob],
  });

  scheduler.start();
}

main();
```

## DI 컨테이너 조합

- DI 컨테이너를 같이 사용한다면 다음과 같은 이점을 얻을 수 있습니다.
  1. 작업 객체에 의존성 주입 가능
  2. 작업 자동 등록
- 아래의 예제는 [TypeDI](https://github.com/typestack/typedi) 를 사용했습니다. 다른 DI 컨테이너 사용 시 해당 컨테이너 방식에 맞게 코드를 수정하면 동일하게 사용 가능합니다.

### 예시

- 우선 다음과 같은 Repository 객체가 있다고 가정해보겠습니다.
- Repository 객체는 @Service로 컨테이너에 등록된 상태입니다.

```ts
@Service()
class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  findAllUserMoreThanGivenScore(score: number) {
    return this.find({
      where: {
        score: MoreThan(score),
      },
    });
  }
}
```

- Job에서 Repository를 주입받아서 사용한다고 가정해보겠습니다.

```ts
@Job("* 12 * * *", { name: "update passed user" })
@Service()
class UpdatePassedUser {
  constructor(private readonly userRepository: UserRepository) {}

  async handle() {
    const passedUsers = await this.userRepository.findAllUserMoreThanGivenScore(
      80
    );
    for (const passedUser of passedUsers) {
      passedUsers.passed = true;
      await this.userRepository.save(passedUser);
    }
  }
}
```

- 이제 해야할 일은 스케줄러에게 컨테이너를 알려주는 일만 남았습니다.

```ts
import cron from "node-cron";

function main() {
  const scheduler = new Scheduler({
    runner: cron,
    container: Container,
  });

  scheduler.start();
}

main();
```

- 끝 입니다. TypeScheduler는 알아서 Job 데코레이터가 있는 작업 인스턴스를 컨테이너에서 꺼내고 스케줄러 구현체에 등록할 것입니다.

### 토큰

- 타입스크립트의 interface는 js로 트랜스파일링 되기 전에만 존재하기 때문에 런타임에는 interface 기반의 의존성 주입이 불가능합니다. 따라서 대부분의 타입스크립트 기반 DI 컨테이너(ex: TypeDI, InversifyJS)는 token을 사용해서 등록하도록 안내하고 있습니다.
- 만약 토큰을 사용해서 Job을 컨테이너에 등록했다면 @Job 데코레이터 옵션에 해당 토큰을 명시해야합니다.

```ts
@Job("* 12 * * *", { name: "update passed user", token: UpdatePassedUserToken })
class UpdatePassedUser {
  constructor(private readonly userRepository: UserRepository) {}

  async handle() {
    const passedUsers =
    for (const passedUser of passedUsers) {
      passedUsers.passed = true;
      await this.userRepository.save(passedUser);
    }
  }
}
```
