import { JobRegistry, SchedulerOptions } from "../../src";
import { Container } from "../../src/common";

describe(SchedulerOptions, () => {
  describe("constructor", () => {
    it("should set runner and container", () => {
      const container: Container = {
        get: jest.fn(),
      };
      const registry: JobRegistry = {
        getTimeouts: jest.fn(),
        getIntervals: jest.fn(),
        getCrons: jest.fn(),
        getTimeout: jest.fn(),
        getInterval: jest.fn(),
        getCron: jest.fn(),
        addInterval: jest.fn(),
        addTimeout: jest.fn(),
        addCron: jest.fn(),
        removeInterval: jest.fn(),
        removeTimeout: jest.fn(),
        removeCron: jest.fn(),
      };
      const options = new SchedulerOptions({
        container,
        registry,
      });
      expect(options.container).toBe(container);
      expect(options.registry).toBe(registry);
    });
  });
});

