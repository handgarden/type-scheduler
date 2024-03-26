import { DefaultJobHandlerManager } from "../../src/handler/DefaultJobHandlerManager";
import { ScheduleRunner } from "../../src/scheduler/ScheduleRunner";
import { Scheduler } from "../../src/scheduler/Scheduler";
import { SchedulerOptions } from "../../src";
import { Container } from "../../src/common";
import { JobHandlerMetadataScanner } from "../../src/metadata/JobHandlerMetadataScanner";
import { DefaultJobHandler } from "../../src/handler";

describe(Scheduler, () => {
  let jobHandlerManager: DefaultJobHandlerManager;
  let scheduler: Scheduler;
  let runner: ScheduleRunner;
  let options: SchedulerOptions;
  let container: Container;
  let metadataScanner: JobHandlerMetadataScanner;

  beforeEach(() => {
    runner = {
      schedule: jest.fn(),
    } as unknown as ScheduleRunner;

    container = {
      get: jest.fn(),
    };

    jobHandlerManager = {
      addHandlers: jest.fn(),
      getHandlers: jest.fn().mockReturnValue([]),
    } as unknown as DefaultJobHandlerManager;

    metadataScanner = {
      autoScan: jest.fn(),
    } as unknown as JobHandlerMetadataScanner;

    options = {
      runner,
      container,
      manager: jobHandlerManager,
      metadataScanner,
    };

    scheduler = new Scheduler(options);
  });

  describe("start", () => {
    it("should call metadataScanner.autoScan", () => {
      scheduler.start();

      expect(metadataScanner.autoScan).toHaveBeenCalled();
    });

    it("should call jobHandlerManager.getHandlers", () => {
      scheduler.start();

      expect(jobHandlerManager.getHandlers).toHaveBeenCalled();
    });

    it("should call runner.schedule for each handler", () => {
      jobHandlerManager.getHandlers = jest.fn().mockReturnValue([
        {
          constructor: {
            name: "MockedJobHandler",
          },
          handle: jest.fn(),
          cronExpression: "0 0 * * *",
        } as unknown as DefaultJobHandler,
      ]);

      scheduler.start();

      expect(runner.schedule).toHaveBeenCalled();
    });
  });
});
