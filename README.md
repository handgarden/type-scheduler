# TypeScheduler

**TypeScheduler** is a library for managing recurring tasks (schedules).

You can use schedules in two ways: the first is by using decorators to explicitly and statically register tasks for specific times, and the second is by dynamically adding and removing tasks from the registry. Additionally, it provides the ability to represent Cron expressions as objects, which can be parsed and validated when written as strings. When using a DI container, you can register objects created from the container with the scheduler.

Internally, it uses the [cron package](https://www.npmjs.com/package/cron) to handle recurring tasks. TypeScheduler is influenced by TypeScript-based object-oriented frameworks like [TypeGraphQL](https://typegraphql.com/), [TypeORM](https://typeorm.io/), and [TypeDI](https://github.com/typestack/typedi).

## Installation

1. Install TypeScheduler and cron:
   ```sh
   npm install type-scheduler cron
   ```

**TypeScript Configuration**

- For TypeScript 3.3 or later, enable decorator usage by setting the following options in `tsconfig.json`:

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Usage

### Creating Static Recurring Tasks

**@Job**

- The `@Job` decorator indicates that the class is a recurring task and takes a Cron expression as an argument to specify the schedule.
- The written Cron string expression is parsed and validated at runtime before being registered with the scheduler.

```ts
@Job("* * * * *")
class ExampleJob implements JobHandler {
  async handle() {
    console.log("Hello TypeScheduler");
  }
}
```

- If you are not familiar with Cron expressions, you can use the `CronExpression` builder object to create the schedule. The following example object is interpreted as `"* 12 * * *"` and schedules the task to run every day at 12 PM. The builder's default values for each expression segment (minute, hour, dayOfMonth, month, dayOfWeek) are `'*'`, so `every` can be omitted.

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

- You can add a `name` option to define a custom name for the task.

```ts
@Job("* 12 * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob implements JobHandler {
  async handle() {
    console.log("Good afternoon");
  }
}
```

- The **JobHandler** interface guides you to implement the `handle` method required for task registration. You don't need to extend the interface as long as you implement the `handle` method, but using the interface is recommended to enforce the implementation.

```ts
@Job("* 12 * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob {
  async handle() {
    console.log("Good afternoon");
  }
}
```

### Registering Recurring Tasks

- Unfortunately, it is not possible for the scheduler to automatically read tasks created in other files or folders without a container.
- You need to add the tasks directly to the scheduler for them to be recognized and registered correctly.

```ts
const scheduler = new Scheduler({
  jobs: [ExampleJob, EveryDayAtNoonJob],
});
```

### Dynamic Management of Recurring Tasks

- To manage recurring tasks dynamically while the application is running, use the scheduler's registry.

- **Adding**

```ts
const registry = scheduler.getRegistry();

const everyDayAtNoonJob = new CronJob("* 12 * * *", () => {
  console.log("Good afternoon");
});
everyDayAtNoonJob.start();

registry.addCron("everyDayAtNoonJob", everyDayAtNoonJob);
```

- **Getting**

```ts
const registeredJob = registry.getCron("everyDayAtNoonJob");
console.log(registeredJob?.running);
```

- **Removing**

```ts
const deletedJob = registry.removeCron("everyDayAtNoonJob");
deletedJob?.stop();
console.log(deletedJob?.running);
```

## Using with DI Container

- If you use a DI container, you can enjoy the following benefits:

  1. Dependency injection into task objects.
  2. Automatic task registration.

- The following example uses [TypeDI](https://github.com/typestack/typedi). If you use another DI container, modify the code according to the container's usage guidelines for similar functionality.

### Example

- Let's assume you have a Repository object like the one below. The Repository object is registered with the container using `@Service`.

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

- Suppose you want to use this Repository in a Job.

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

- Register the container and job with the scheduler as usual.

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

- That's it. TypeScheduler will automatically retrieve instances of tasks with the `Job` decorator from the container and register them with the scheduler.

### Token

- Since TypeScript interfaces only exist before transpiling to JavaScript, dependency injection based on interfaces is impossible at runtime. Therefore, most TypeScript-based DI containers (e.g., TypeDI, InversifyJS) recommend using tokens for registration. If you registered a Job with the container using a token, you must specify the token in the `@Job` decorator options.

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

### Usage Example

- Install `express`, `body-parser`, `type-scheduler`, `cron`, and `typedi`.

```sh
npm install express body-parser type-scheduler cron typedi
```

- Install `ts-node` if you don't have it already for easy execution.

```sh
npm install -g ts-node
```

- First, create a route to verify the operation of the recurring task.

```ts
import { Router } from "express";

const NotificationRoute = Router();

NotificationRoute.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("Notification received");
});

export default NotificationRoute;
```

- Create a static recurring task.

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

- Create a scheduler and register the static recurring task. Also, register the scheduler in the Container as it will be needed for dynamic task registration.

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

  // Register Scheduler in Container
  Container.set(Scheduler, scheduler);

  // Start static tasks
  scheduler.start();

  return scheduler;
}
```

- Create a service object for dynamic task registration.

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

- Create a route to handle dynamic task requests.

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

- Combine the files to create a server in an index file.

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

- Run the server with the following command:

  ```sh
  ts-node index.ts
  ```

- Verify the operation. First, check the registered tasks with the following command:

  ```sh
  curl -X GET http://localhost:3000/schedules
  ```

- You will see that the static task is registered:

  ```json
  { "timeouts": [], "intervals": [], "crons": ["default-notification-job"] }
  ```

- Next, register a dynamic task:

  ```sh
  curl -X POST http://localhost:3000/schedules/every \
       -H "Content-Type: application/json" \
       -d '{"userId": 1, "message": "hello world"}'
  ```

- Check the server console to see the recurring task output:

  ```json
  { "userId": 1, "message": "hello world" }
  ```

- Check the registered tasks again:

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

- The task is registered correctly.

- Remove the registered task:

  ```sh
  curl -X DELETE http://localhost:3000/schedules/every \
       -H "Content-Type: application/json" \
       -d '{"userId": 1}'
  ```

- Check the server console to confirm the task is no longer running. Check the registered tasks again:

  ```sh
  curl -X GET http://localhost:3000/schedules
  ```

  ```json
  { "timeouts": [], "intervals": [], "crons": ["default-notification-job"] }
  ```

- The task is successfully removed.
