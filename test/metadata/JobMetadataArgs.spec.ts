import { JobHandler } from "../../src";
import { ClassType } from "../../src/common/ClassType";
import { ContainerRequiredError } from "../../src/error/ContainerRequiredError";
import { JobMetadataArgs } from "../../src/metadata/JobMetadataArgs";

describe(JobMetadataArgs, () => {
  let target: ClassType<JobHandler>;
  let cronExpression: string;
  let name: string;
  let token: string;

  beforeEach(() => {
    target = class implements JobHandler {
      handle = jest.fn();
    };
    cronExpression = "* * * * *";
    name = "test";
    token = "token";
  });
  it("should return job metadata args", () => {
    const args = new JobMetadataArgs({
      target,
      cronExpression,
      name,
      token,
    });
    expect(args.target).toBe(target);
    expect(args.name).toBe(name);
    expect(args.cronExpression).toBe(cronExpression);
    expect(args.token).toBe(token);
  });

  describe("instantiateTarget", () => {
    it("should return instance of target", () => {
      const args = new JobMetadataArgs({
        target,
        cronExpression,
      });
      const instance = args.instantiateTarget();
      expect(instance).toBeInstanceOf(target);
    });

    it("should return instance of target from container", () => {
      const container = {
        get: jest.fn(),
      };
      const args = new JobMetadataArgs({
        target,
        cronExpression,
        token,
      });
      args.instantiateTarget(container);
      expect(container.get).toHaveBeenCalledWith(token);
    });

    it("should throw an error if the container is undefined and the token is present.", () => {
      const args = new JobMetadataArgs({
        target,
        cronExpression,
        token,
      });
      try {
        args.instantiateTarget();
      } catch (e) {
        expect(e).toBeInstanceOf(ContainerRequiredError);
      }
    });
  });
});
