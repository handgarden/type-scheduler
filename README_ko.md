# TypeScheduler

- [Github](https://github.com/handgarden/type-scheduler)

**TypeScheduler**는 반복 작업(스케줄)을 관리하기 위한 라이브러리입니다.

스케줄을 두 가지 방법으로 사용할 수 있습니다. 첫 번째는 데코레이터를 사용해 명시적이고 정적으로 특정 시간에 대한 작업을 등록하는 것이고, 두 번째는 동적으로 registry에 작업을 등록하고 제거하는 것입니다. 추가로, Cron 표현식을 객체로 표현할 수 있으며 문자열로 작성하면 파싱 및 검증하는 기능을 제공합니다. DI 컨테이너를 사용하면 컨테이너로부터 생성된 객체를 스케줄러에 등록할 수 있습니다.

내부적으로 반복 작업을 동작시키기 위해 [cron 패키지](https://www.npmjs.com/package/cron)를 사용합니다. TypeScheduler는 [TypeGraphQL](https://typegraphql.com/), [TypeORM](https://typeorm.io/), [TypeDI](https://github.com/typestack/typedi)와 같은 타입스크립트 기반 객체 지향 프레임워크의 영향을 받아 만들어졌습니다.

## 설치

1. TypeScheduler와 cron을 설치합니다:
   ```sh
   npm install type-scheduler cron
   ```

**TypeScript 환경 설정**

- Typescript 3.3 버전 이상에서 `tsconfig.json`을 아래 두 옵션을 활성화해 데코레이터 사용을 활성화합니다.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## 사용

### 정적 반복 작업 생성

**@Job**

- `@Job` 데코레이터는 해당 클래스가 반복 작업임을 나타내며, 어느 주기로 반복할 것인지에 대한 Cron 표현식을 인자로 받습니다.
- 작성된 Cron 문자열 표현식은 실행 시 객체로 해석되고 검증 후 스케줄러에 등록됩니다.

```ts
@Job("* * * * *")
class ExampleJob implements JobHandler {
  async handle() {
    console.log("Hello TypeScheduler");
  }
}
```

- 만약 크론 표현식에 익숙하지 않다면 `CronExpression` 빌더 객체를 사용해 반복 주기를 생성할 수 있습니다. 아래 예제의 객체는 `"* 12 * * *"`로 해석되며 매일 12시에 실행되도록 예약됩니다. 빌더의 각 표현 구간(minute, hour, dayOfMonth, month, dayOfWeek)의 기본 값은 `'*'`로 every는 생략할 수 있습니다.

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

- `name` 옵션을 추가하면 작업에 대한 이름을 별도로 정의할 수 있습니다.

```ts
@Job("* 12 * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob implements JobHandler {
  async handle() {
    console.log("Good afternoon");
  }
}
```

- **JobHandler** 인터페이스는 작업 등록에 필요한 `handle` 메서드를 구현하라는 지침으로 `handle` 메서드만 있다면 인터페이스를 상속하지 않아도 괜찮습니다. (인터페이스 상속은 `handle` 메서드 구현을 강제하기 때문에 사용하는 것을 추천합니다.)

```ts
@Job("* 12 * * *", { name: "Good afternoon schedule" })
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

### 반복 작업 동적 관리

- 어플리케이션 실행 중에 반복 작업을 실행하고 관리하려면 scheduler의 registry를 통해 관리할 수 있습니다.

- **등록**

```ts
const registry = scheduler.getRegistry();

const everyDayAtNoonJob = new CronJob("* 12 * * *", () => {
  console.log("Good afternoon");
});
everyDayAtNoonJob.start();

registry.addCron("everyDayAtNoonJob", everyDayAtNoonJob);
```

- **조회**

```ts
const registeredJob = registry.getCron("everyDayAtNoonJob");
console.log(registeredJob?.running);
```

- **제거**

```ts
const deletedJob = registry.removeCron("everyDayAtNoonJob");
deletedJob?.stop();
console.log(deletedJob?.running);
```

## DI 컨테이너 조합

- DI 컨테이너를 같이 사용한다면 다음과 같은 이점을 얻을 수 있습니다.

  1. 작업 객체에 의존성 주입 가능
  2. 작업 자동 등록

- 아래의 예제는 [TypeDI](https://github.com/typestack/typedi)를 사용했습니다. 다른 DI 컨테이너 사용 시 해당 컨테이너 방식에 맞게 코드를 수정하면 동일하게 사용 가능합니다.

### 예시

- 우선 다음과 같은 Repository 객체가 있다고 가정해보겠습니다. Repository 객체는 `@Service`로 컨테이너에 등록된 상태입니다.

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
class UpdatePassedUsersStatus implements JobHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async handle() {
    const passUsers = await this.userRepository.findAllUserMoreThanGivenScore(
      80
    );
    for (const passUser of passUsers) {
      passUser.passed = true;
      await this.userRepository.save(passUser);
    }
  }
}
```

- 기존과 동일하게 Container와 job을 스케줄러에 등록하면 끝입니다.

```ts
import { Container } from "typedi";
import { Scheduler } from "type-scheduler";

function main() {
  const scheduler = new Scheduler({
    container: Container,
    jobs: [UpdatePassedUsersStatus],
  });

  scheduler.start();
}

main();
```

- 끝입니다. TypeScheduler는 알아서 `Job` 데코레이터가 있는 작업 인스턴스를 컨테이너에서 꺼내고 스케줄러 구현체에 등록할 것입니다.

### 토큰

- 타입스크립트의 interface는 js로 트랜스파일링 되기 전에만 존재하기 때문에 런타임에는 interface 기반의 의존성 주입이 불가능합니다. 따라서 대부분의 타입스크립트 기반 DI 컨테이너(ex: TypeDI, InversifyJS)는 token을 사용해서 등록하도록 안내하고 있습니다. 만약 토큰을 사용해서 Job을 컨테이너에 등록했다면 `@Job` 데코레이터 옵션에 해당 토큰을 명시해야 합니다.

```ts
@Job("* 12 * * *", { name: "update passed user", token: UpdatePassedUserToken })
class UpdatePassedUser {
  constructor(private readonly userRepository: UserRepository) {}

  async handle() {
    const passUsers = await this.userRepository.findAllUserMoreThanGivenScore(
      80
    );
    for (const passUser of passUsers) {
      passUser.passed = true;
      await this.userRepository.save(passUser);
    }
  }
}
```

### 사용 예시

- `express`, `body-parser`, `type-scheduler`, `cron`, `typedi`를 설치합니다.

```sh
npm install express body-parser type-scheduler cron typedi
```

- 간단하게 실행하기 위해 `ts-node`가 없다면 설치합니다.

```sh
npm install -g ts-node
```

- 우선 반복 작업의 동작을 확인할 라우트를 하나 생성해둡니다.

```ts
import { Router } from "express";

const NotificationRoute = Router();

NotificationRoute.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("Notification received");
});

export default NotificationRoute;
```

- 정적 반복 작업을 생성합니다.

```ts
// service/job/DefaultNotification.job.ts
import { CronExpression, Job, JobHandler } from "type-scheduler";
import { Service } from "typedi";

@Service()
@Job(
  new CronExpression()
    .dayOfWeek((day) => day.range(1, 5))
    .hour((h) => h.value(9)),
  {
    name: "default-notification-job",
  }
)
export class DefaultNotificationJob implements JobHandler {
  async handle(): Promise<void> {
    await fetch("http://localhost:3000/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
```

- 스케줄러를 생성하고 정적 반복 작업을 등록합니다. 동적 작업 등록 시 scheduler가 필요하므로 Container에 등록해줍니다.

```ts
// createScheduler.ts
import { Scheduler } from "type-scheduler";
import Container from "typedi";
import { DefaultNotificationJob } from "./service/job/DefaultNotification.job";

export function createScheduler() {
  const scheduler = new Scheduler({
    container: Container,
    jobs: [DefaultNotificationJob],
  });

  // Scheduler Container 등록
  Container.set(Scheduler, scheduler);

  // 정적 작업 시작
  scheduler.start();

  return scheduler;
}
```

- 동적 작업 등록을 위한 서비스 객체를 생성합니다.

```ts
// service/notification.service.ts
import { CronJob } from "cron";
import { Scheduler } from "type-scheduler";
import { Service } from "typedi";

@Service()
export class NotificationService {
  constructor(private readonly scheduler: Scheduler) {}

  getSchedules() {
    const registry = this.scheduler.getRegistry();
    const timeouts = registry.getTimeouts();
    const intervals = registry.getIntervals();
    const crons = registry.getCrons();

    return {
      timeouts,
      intervals,
      crons,
    };
  }

  notifyEveryMinute(userId: number, message: string) {
    const registry = this.scheduler.getRegistry();
    const job = new CronJob("* * * * *", this.sendMessage(userId, message));
    job.start();
    registry.addCron(`${this.notifyEveryMinute.name}:${userId}`, job);
    return true;
  }

  cancelEveryMinuteNotification(userId: number) {
    const registry = this.scheduler.getRegistry();
    const job = registry.removeCron(`${this.notifyEveryMinute.name}:${userId}`);
    job?.stop();
    return true;
  }

  private sendMessage(userId: number, message: string) {
    return async () => {
      const messageBody = {
        userId,
        message,
      };
      try {
        await fetch("http://localhost:3000/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageBody),
        });
      } catch (e) {
        console.error(e);
      }
    };
  }
}
```

- 동적 작업 요청을 처리할 라우트를 만들어 줍니다.

```ts
// routes/schedule.route.ts
import { Router } from "express";
import Container from "typedi";
import { NotificationService } from "../service/notification.service";

const ScheduleRoute = Router();

ScheduleRoute.get("/", (req, res) => {
  const service = Container.get(NotificationService);
  const schedules = service.getSchedules();

  res.status(200).json(schedules);
});

ScheduleRoute.post("/every", (req, res) => {
  const { userId, message } = req.body;

  const service = Container.get(NotificationService);

  service.notifyEveryMinute(userId, message);

  res.status(200).json({
    message: "Notification scheduled",
  });
});

ScheduleRoute.delete("/every", (req, res) => {
  const { userId } = req.body;

  const service = Container.get(NotificationService);

  service.cancelEveryMinuteNotification(userId);

  res.status(200).json({
    message: "Notification cancelled",
  });
});

export default ScheduleRoute;
```

- 작성한 파일을 모아 서버로 실행하는 index 파일을 작성합니다.

```ts
// index.ts
import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import NotificationRoute from "./routes/notification.route";
import ScheduleRoute from "./routes/schedule.route";
import { createScheduler } from "./createScheduler";

function bootstrap() {
  createScheduler();
  const server = express();

  server.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
  server.use("/notifications", NotificationRoute);
  server.use("/schedules", ScheduleRoute);

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

bootstrap();
```

- 터미널에 아래 커맨드를 실행해 서버를 실행합니다.

  ```sh
  ts-node index.ts
  ```

- 동작을 확인해봅시다. 우선 등록된 작업을 조회하려면 아래의 커맨드를 실행합니다.

  ```sh
  curl -X GET http://localhost:3000/schedules
  ```

- 다음과 같이 정적 작업이 등록된 것을 확인할 수 있습니다.

  ```json
  { "timeouts": [], "intervals": [], "crons": ["default-notification-job"] }
  ```

- 다음으로 동적으로 작업을 등록해봅시다.

  ```sh
  curl -X POST http://localhost:3000/schedules/every \
       -H "Content-Type: application/json" \
       -d '{"userId": 1, "message": "hello world"}'
  ```

- 서버를 실행한 콘솔을 확인해보면

  ```json
  { "userId": 1, "message": "hello world" }
  ```

  위와 같이 반복 작업이 실행되는 것을 확인할 수 있습니다.

- 등록된 작업을 다시 조회해보면

  ```sh
  curl -X GET http://localhost:3000/schedules
  ```

  ```json
  {
    "timeouts": [],
    "intervals": [],
    "crons": ["default-notification-job", "notifyEveryMinute:1"]
  }
  ```

- 작업이 잘 등록된 것을 알 수 있습니다.

- 등록한 작업을 제거해봅시다.

  ```sh
  curl -X DELETE http://localhost:3000/schedules/every \
       -H "Content-Type: application/json" \
       -d '{"userId": 1}'
  ```

- 서버를 실행한 콘솔을 확인해보면 더 이상 로그가 찍히지 않는 것을 확인할 수 있습니다. 등록된 작업을 조회해보면

  ```sh
  curl -X GET http://localhost:3000/schedules
  ```

  ```json
  { "timeouts": [], "intervals": [], "crons": ["default-notification-job"] }
  ```

- 작업이 제거된 것을 확인할 수 있습니다.
