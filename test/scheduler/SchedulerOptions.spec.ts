import { SchedulerOptions, ScheduleRunner } from "../../src";
import { Container } from "../../src/common";

describe(SchedulerOptions, () => {
  describe("constructor", () => {
    it("should set runner and container", () => {
      const runner: ScheduleRunner = {
        schedule: jest.fn(),
      };
      const container: Container = {
        get: jest.fn(),
      };
      const options = new SchedulerOptions(runner, container);
      expect(options.runner).toBe(runner);
      expect(options.container).toBe(container);
    });

    it("should create manager and metadataScanner", () => {
      const runner: ScheduleRunner = {
        schedule: jest.fn(),
      };
      const container: Container = {
        get: jest.fn(),
      };
      const options = new SchedulerOptions(runner, container);
      expect(options.manager).toBeDefined();
      expect(options.metadataScanner).toBeDefined();
    });
  });
});
