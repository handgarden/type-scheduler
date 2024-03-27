# TypeScheduler

Language:

- [English](https://github.com/handgarden/type-scheduler/blob/main/README.md)
- [Korean](https://github.com/handgarden/type-scheduler/blob/main/README_ko.md)

**TypeScheduler** is an abstract layer that allows flexible usage of a Node.js scheduler based on Cron expression.

You can register repetitive tasks with decorators, represent Cron expressions as objects, and provide parsing and validation functionalities for strings. Additionally, when used with a DI container, dependency injection can be applied to task objects, and tasks are automatically registered.

To execute actual recurring tasks, you need to inject a package that implements functionality to execute tasks at specified intervals, such as [node-cron](https://www.npmjs.com/package/node-cron).

Type-Scheduler was influenced by TypeScript-based object-oriented frameworks such as [TypeGraphQL](https://typegraphql.com/), [TypeORM](https://typeorm.io/), [TypeDI](https://github.com/typestack/typedi).

## Installation

1. Install TypeScheduler.  
   `npm install type-scheduler`
2. Choose a scheduling implementation and install it. For example, we installed node-cron as an example.  
   `npm install node-cron`

**TypeScript Configuration**

- Enable decorators usage by activating the following two options in your tsconfig.json, starting from Typescript version 3.3 and above.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Usage

### Creating Repetitive Tasks

**@Job**

- The `@Job` decorator indicates that the class is a repetitive task and receives a Cron expression specifying the frequency of repetition.
- The written Cron string representation is interpreted and verified as an object during execution, and then registered with the scheduler.

```ts
@Job("* * * * *")
class ExampleJob implements JobHandler {
  async handle() {
    console.log("Hello TypeScheduler");
  }
}
```

- If you are unfamiliar with Cron expressions, you can use the CronExpression builder object to create a repetition interval.
- The object in the example below is interpreted as "\* 12 \* \* \*", scheduling execution every day at 12 o'clock.
- The default value of each expression segment (minute, hour, dayOfMonth, month, dayOfWeek) in the builder is '\*', and you can omit 'every'.

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

- By adding the `name` option, you can define a separate name for the job.

```ts
@Job("* 12 * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob implements JobHandler {
  async handle() {
    console.log("Good afternoon");
  }
}
```

- The **JobHandler** interface provides guidance to implement only the handle method required for job registration. You can omit interface inheritance if you have only the handle method, but it is recommended to use interface inheritance as it enforces the implementation of the handle method.

```ts
@Job("* 12 * * *", { name: "Good afternoon schedule" })
class EveryDayAtNoonJob {
  async handle() {
    console.log("Good afternoon");
  }
}
```

### Registering Repetitive Jobs

- Unfortunately, it is not possible to automatically read and register jobs from different files or folders without a container.
- You need to manually add jobs to the scheduler for them to be recognized and registered properly.

```ts
const scheduler = new Scheduler({
  jobs: [ExampleJob, EveryDayAtNoonJob],
});
```

### Registering Scheduler Implementations

- Finally, you need to register an implementation that will actually execute the repetitive tasks at the specified times.
- The interface for the implementation is as follows:

```ts
export interface ScheduleRunner {
  schedule(expression: string, job: () => void | Promise<void>): void;
}
```

- If the implementation is compatible with the ScheduleRunner interface, you can use it directly. If the registration method of the implementation is different, you can create an adapter to make it compatible and then register it.

```ts
export class ScheduleRunnerAdapter {
  constructor(private readonly schedulerRunner: any) {
    this.schedule = this.schedule.bind(this);
  }
  schedule(expression: string, job: () => void) {
    // Modify according to the actual registration method.
    this.scheduleRunner.add(job, expression);
  }
}
```

- Below is an example using node-cron:

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

## DI Container Integration

- If you use a DI container, you can benefit from the following:
  1. Dependency injection into job objects
  2. Automatic job registration
- Below is an example using [TypeDI](https://github.com/typestack/typedi). It can be adapted to other DI containers by modifying the code according to the container's usage.

### Example

- Let's assume you have the following Repository object.
- The Repository object is registered with the container as @Service.

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

- Assuming we want to inject the UserRepository into a job:

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

- Now, all we need to do is to inform the scheduler about the container:

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

- That's it. TypeScheduler will automatically retrieve job instances decorated with @Job from the container and register them with the scheduler.

### Token

- TypeScript interfaces exist only at compile-time, not at runtime. Therefore, runtime dependency injection based on interfaces is not possible. Most TypeScript-based DI containers (e.g., TypeDI, InversifyJS) advise using tokens for registration.
- If you have registered a job with a token in the container, you need to specify that token in the options of the @Job decorator.

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
