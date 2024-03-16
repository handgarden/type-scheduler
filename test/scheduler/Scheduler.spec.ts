import { JobHandler } from "../../src/handler/JobHandler";
import { JobHandlerManager } from "../../src/handler/JobHandlerManager";
import { ScheduleRunner } from "../../src/scheduler/ScheduleRunner";
import { Scheduler } from "../../src/scheduler/Scheduler";
import { SchedulerOptions } from "../../src/scheduler/SchedulerOptions";

describe(Scheduler, () => {
  let jobHandlerManager: JobHandlerManager;
  let scheduler: Scheduler;
  let options: SchedulerOptions;

  beforeEach(() => {
    const handlers: JobHandler[] = [];
    jobHandlerManager = {
      handlers,
      addHandlers: jest
        .fn()
        .mockImplementation((...newHandlers) => handlers.push(...newHandlers)),
      getHandlers: jest.fn().mockReturnValue(handlers),
    } as unknown as JobHandlerManager;

    options = createMockOptions(true, { schedule: jest.fn() });

    scheduler = new Scheduler(options, jobHandlerManager);
  });

  describe("start", () => {
    it("should start the scheduler", () => {
      jobHandlerManager.addHandlers({
        constructor: {
          name: "MockedJobHandler",
        },
        handle: jest.fn(),
        cronExpression: "0 0 * * *",
      } as JobHandler);

      scheduler.start();

      expect(options.getRunner().schedule).toHaveBeenCalled();
    });

    it("should not start the scheduler if it is disabled", () => {
      scheduler.start();

      expect(options.getRunner().schedule).not.toHaveBeenCalled();
    });
  });

  function createMockOptions(enabled: boolean, runner: ScheduleRunner) {
    return {
      enabled,
      runner,
      getRunner: () => runner,
      isEnabled: () => enabled,
    } as unknown as SchedulerOptions;
  }
});
