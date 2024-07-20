import { CronJob } from "cron";
import { DefaultJobRegistry } from "../../src/registry/DefaultJobRegistry";

describe(DefaultJobRegistry.name, () => {
  let timeoutMap = new Map<string, number>();
  let intervalMap = new Map<string, number>();
  let jobMap = new Map<string, CronJob>();
  let registry: DefaultJobRegistry;
  beforeEach(() => {
    registry = new DefaultJobRegistry(timeoutMap, intervalMap, jobMap);
    CronJob.prototype.stop = jest.fn();
  });

  describe("getTimeouts", () => {
    it("should return an empty array", () => {
      expect(registry.getTimeouts()).toEqual([]);
    });

    it("should return an array with element", () => {
      timeoutMap.set("test", 1000);
      expect(registry.getTimeouts()).toEqual(["test", 1000]);
    });
  });

  describe("getIntervals", () => {
    it("should return an empty array", () => {
      expect(registry.getIntervals()).toEqual([]);
    });

    it("should return an array with element", () => {
      intervalMap.set("test", 1000);
      expect(registry.getIntervals()).toEqual(["test", 1000]);
    });
  });

  describe("getJobs", () => {
    it("should return an empty array", () => {
      expect(registry.getJobs()).toEqual([]);
    });

    it("should return an array with element", () => {
      const job = new CronJob("* * * * * *", () => {});
      jobMap.set("test", job);
      const jobs = registry.getJobs();
      expect(jobs.length).toEqual(1);
      expect(jobs[0][0]).toBe("test");
      expect(jobs[0][1] instanceof CronJob).toBeTruthy();
    });
  });

  describe("addTimeout", () => {
    it("should add a timeout", () => {
      registry.addTimeout("test", 1000);
      expect(registry.getTimeouts()).toEqual(["test", 1000]);
    });

    it("should add timeout to map", () => {
      registry.addTimeout("test", 1000);
      expect(timeoutMap.get("test")).toBe(1000);
    });

    it("should throw an error if timeout already exists", () => {
      registry.addTimeout("test", 1000);
      try {
        registry.addTimeout("test", 1000);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("Timeout test already exists");
      }
    });
  });

  describe("addInterval", () => {
    it("should add an interval", () => {
      registry.addInterval("test", 1000);
      expect(registry.getIntervals()).toEqual(["test", 1000]);
    });

    it("should add interval to map", () => {
      registry.addInterval("test", 1000);
      expect(intervalMap.get("test")).toBe(1000);
    });

    it("should throw an error if interval already exists", () => {
      registry.addInterval("test", 1000);
      try {
        registry.addInterval("test", 1000);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("Interval test already exists");
      }
    });
  });

  describe("addJob", () => {
    it("should add a job", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addJob("test", job);
      expect(registry.getJobs()).toEqual(["test", job]);
    });

    it("should add jobs to map", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addJob("test", job);
      expect(jobMap.get("test")).toBe(job);
    });

    it("should throw an error if job already exists", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addJob("test", job);
      try {
        registry.addJob("test", job);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("Job test already exists");
      }
    });
  });

  describe("removeTimeout", () => {
    it("should remove a timeout", () => {
      registry.addTimeout("test", 1000);
      registry.removeTimeout("test");
      expect(registry.getTimeouts()).toEqual([]);
    });

    it("should remove timeout from map", () => {
      registry.addTimeout("test", 1000);
      registry.removeTimeout("test");
      expect(timeoutMap.get("test")).toBeUndefined();
    });

    it("should clear timeout", () => {
      registry.addTimeout("test", 1000);
      registry.removeTimeout("test");
      expect(clearTimeout).toHaveBeenCalled();
    });
  });

  describe("removeInterval", () => {
    it("should remove an interval", () => {
      registry.addInterval("test", 1000);
      registry.removeInterval("test");
      expect(registry.getIntervals()).toEqual([]);
    });

    it("should remove interval from map", () => {
      registry.addInterval("test", 1000);
      registry.removeInterval("test");
      expect(intervalMap.get("test")).toBeUndefined();
    });

    it("should clear interval", () => {
      registry.addInterval("test", 1000);
      registry.removeInterval("test");
      expect(clearInterval).toHaveBeenCalled();
    });
  });

  describe("removeJob", () => {
    it("should remove a job", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addJob("test", job);
      registry.removeJob("test");
      expect(registry.getJobs()).toEqual([]);
    });

    it("should remove job from map", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addJob("test", job);
      registry.removeJob("test");
      expect(jobMap.get("test")).toBeUndefined();
    });

    it("should stop job", () => {
      const job = new CronJob("* * * * * *", () => {});
      registry.addJob("test", job);
      registry.removeJob("test");
      expect(job.stop).toHaveBeenCalled();
    });
  });
});
