import { DefaultJobHandlerManager } from "../../src/handler/DefaultJobHandlerManager";
import { ScheduleRunner } from "../../src/scheduler/ScheduleRunner";
import { Scheduler } from "../../src/scheduler/Scheduler";
import { SchedulerOptions } from "../../src";
import { Container } from "../../src/common";
import { JobHandlerMetadataScanner } from "../../src/metadata/JobHandlerMetadataScanner";
import { DefaultJobHandler } from "../../src/handler";

let jobHandlerManager: DefaultJobHandlerManager = {
  addHandlers: jest.fn(),
  getHandlers: jest.fn().mockReturnValue([]),
} as unknown as DefaultJobHandlerManager;

jest.mock("../../src/handler/DefaultJobHandlerManager", () => {
  return {
    DefaultJobHandlerManager: jest.fn().mockImplementation(() => {
      return jobHandlerManager;
    }),
  };
});

let metadataScanner: JobHandlerMetadataScanner = {
  autoScan: jest.fn(),
} as unknown as JobHandlerMetadataScanner;

jest.mock("../../src/metadata/JobHandlerMetadataScanner", () => {
  return {
    JobHandlerMetadataScanner: jest.fn().mockImplementation(() => {
      return metadataScanner;
    }),
  };
});

describe(Scheduler, () => {
  let scheduler: Scheduler;
  let runner: ScheduleRunner;
  let options: SchedulerOptions;
  let container: Container;

  beforeEach(() => {
    runner = {
      schedule: jest.fn(),
    } as unknown as ScheduleRunner;

    container = {
      get: jest.fn(),
    };

    metadataScanner = {
      autoScan: jest.fn(),
    } as unknown as JobHandlerMetadataScanner;

    const handlers: DefaultJobHandler[] = [];
    jobHandlerManager = {
      addHandlers: jest.fn((...args) => {
        handlers.push(...args);
      }),
      getHandlers: jest.fn().mockReturnValue(handlers),
    } as unknown as DefaultJobHandlerManager;

    options = {
      runner,
      container,
    } as unknown as SchedulerOptions;

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
