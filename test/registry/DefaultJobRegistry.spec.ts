import { CronJob } from "cron";
import { DefaultJobRegistry } from "../../src/registry/DefaultJobRegistry";

describe(DefaultJobRegistry.name, () => {
  let timeoutMap: Map<string, NodeJS.Timeout>;
  let intervalMap: Map<string, NodeJS.Timeout>;
  let jobMap: Map<string, CronJob>;
  let registry: DefaultJobRegistry;

  beforeEach(() => {
    timeoutMap = new Map<string, NodeJS.Timeout>();
    intervalMap = new Map<string, NodeJS.Timeout>();
    jobMap = new Map<string, CronJob>();

    registry = new DefaultJobRegistry(timeoutMap, intervalMap, jobMap);
  });

  describe("getTimeouts", () => {
    it("should return an empty array", () => {
      expect(registry.getTimeouts()).toEqual([]);
    });

    it("should return an array with element", () => {
      const timeout = setTimeout(() => {}, 100000);
      timeoutMap.set("test", timeout);
      expect(registry.getTimeouts()).toEqual(["test"]);
      clearTimeout(timeout);
    });
  });

  describe("getIntervals", () => {
    it("should return an empty array", () => {
      expect(registry.getIntervals()).toEqual([]);
    });

    it("should return an array with element", () => {
      const interval = setInterval(() => {}, 100000);
      intervalMap.set("test", interval);
      expect(registry.getIntervals()).toEqual(["test"]);
      clearInterval(interval);
    });
  });

  describe("getJobs", () => {
    it("should return an empty array", () => {
      expect(registry.getCrons()).toEqual([]);
    });

    it("should return an array with element", () => {
      const job = new CronJob("* * * * * *", () => {});
      jobMap.set("test", job);
      const jobs = registry.getCrons();
      expect(jobs.length).toEqual(1);
      expect(jobs[0][0]).toBe("test");
      expect(jobs[0][1] instanceof CronJob).toBeTruthy();
    });
  });

  describe("addTimeout", () => {
    it("should add a timeout", () => {
      const timeout = setTimeout(() => {}, 100000);
      registry.addTimeout("test", timeout);
      expect(timeoutMap.get("test")).toBe(timeout);
      clearTimeout(timeout);
    });

    it("should throw an error if timeout already exists", () => {
      const timeout = setTimeout(() => {}, 100000);
      registry.addTimeout("test", timeout);
      try {
        registry.addTimeout("test", timeout);
      } catch (e: any) {
        expect(e.message).toBe("Timeout test already exists");
      } finally {
        clearTimeout(timeout);
      }
    });
  });

  describe("addInterval", () => {
    it("should add an interval", () => {
      const interval = setInterval(() => {}, 100000);
      registry.addInterval("test", interval);
      expect(intervalMap.get("test")).toBe(interval);
      clearInterval(interval);
    });

    it("should throw an error if interval already exists", () => {
      const interval = setInterval(() => {}, 100000);
      registry.addInterval("test", interval);
      try {
        registry.addInterval("test", interval);
      } catch (e: any) {
        expect(e.message).toBe("Interval test already exists");
      } finally {
        clearInterval(interval);
      }
    });
  });

  describe("addJob", () => {
    it("should add a job", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addCron("test", job);
      const added = jobMap.get("test");
      expect(added).not.toBeUndefined();
    });

    it("should throw an error if job already exists", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addCron("test", job);
      try {
        registry.addCron("test", job);
      } catch (e: any) {
        expect(e.message).toBe("Job test already exists");
      }
    });
  });

  describe("removeTimeout", () => {
    it("should remove a timeout", () => {
      const timeout = setTimeout(() => {}, 100000);
      registry.addTimeout("test", timeout);
      const deleted = registry.removeTimeout("test");
      expect(registry.getTimeouts()).toEqual([]);
      expect(deleted).toBe(timeout);
      clearTimeout(timeout);
    });

    it("should remove timeout from map", () => {
      const timeout = setTimeout(() => {}, 100000);
      registry.addTimeout("test", timeout);
      const deleted = registry.removeTimeout("test");
      expect(timeoutMap.get("test")).toBeUndefined();
      expect(deleted).toBe(timeout);
      clearTimeout(timeout);
    });
  });

  describe("removeInterval", () => {
    it("should remove an interval", () => {
      const interval = setInterval(() => {}, 100000);
      registry.addInterval("test", interval);
      const deleted = registry.removeInterval("test");
      expect(registry.getIntervals()).toEqual([]);
      expect(deleted).toBe(interval);
      clearInterval(interval);
    });

    it("should remove interval from map", () => {
      const interval = setInterval(() => {}, 100000);
      registry.addInterval("test", interval);
      const deleted = registry.removeInterval("test");
      expect(intervalMap.get("test")).toBeUndefined();
      expect(deleted).toBe(interval);
      clearInterval(interval);
    });
  });

  describe("removeJob", () => {
    it("should remove a job", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addCron("test", job);
      const deleted = registry.removeCron("test");
      expect(registry.getCrons()).toEqual([]);
      expect(deleted).toBe(job);
    });

    it("should remove job from map", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addCron("test", job);
      const deleted = registry.removeCron("test");
      expect(jobMap.get("test")).toBeUndefined();
      expect(deleted).toBe(job);
    });
  });
});
