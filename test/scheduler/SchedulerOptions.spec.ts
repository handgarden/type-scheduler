import { SchedulerOptions } from "../../src/scheduler/SchedulerOptions";

describe(SchedulerOptions, () => {
  describe("isEnabled", () => {
    it("should return true if the scheduler is enabled", () => {
      const options = new SchedulerOptions({
        enabled: true,
        runner: { schedule: () => {} },
      });
      expect(options.isEnabled()).toBeTruthy();
    });
    it("should return false if the scheduler is disabled", () => {
      const options = new SchedulerOptions({
        enabled: false,
        runner: { schedule: () => {} },
      });
      expect(options.isEnabled()).toBeFalsy();
    });
  });

  describe("getRunner", () => {
    it("should return the runner", () => {
      const runner = { schedule: () => {} };
      const options = new SchedulerOptions({
        enabled: true,
        runner,
      });
      expect(options.getRunner()).toBe(runner);
    });
  });
});
