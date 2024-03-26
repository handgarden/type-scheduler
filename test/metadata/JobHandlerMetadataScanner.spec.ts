import { JobHandlerMetadataArgs } from "../../src";
import { Container } from "../../src/common";
import { DefaultJobHandlerManager, JobHandler } from "../../src/handler";
import { JobHandlerMetadataScanner } from "../../src/metadata/JobHandlerMetadataScanner";
import { MetadataUtils } from "../../src/utils/MetadataUtils";

describe(JobHandlerMetadataScanner, () => {
  let scanner: JobHandlerMetadataScanner;
  let manager: DefaultJobHandlerManager;
  let container: Container;
  let metadataArgs: JobHandlerMetadataArgs[];
  let instance: JobHandler;

  class TargetClass implements JobHandler {
    handle = jest.fn();
  }

  beforeEach(() => {
    instance = new TargetClass();
    metadataArgs = [createMockedMetadataArgs()];

    mockMetadataUtils();

    mockHandlerManager();

    mockContainer();

    scanner = new JobHandlerMetadataScanner({
      manager,
      container,
    });
  });

  describe("autoScan", () => {
    it("should call manager addHandlers", () => {
      scanner.autoScan();
      expect(manager.addHandlers).toHaveBeenCalled();
    });
  });

  function createMockedMetadataArgs(): JobHandlerMetadataArgs {
    return {
      target: TargetClass,
      cronExpression: "* * * * *",
      name: "test",
      token: "token",
      instantiateTarget: jest.fn().mockReturnValue(new TargetClass()),
      isClassType: jest.fn().mockReturnValue(true),
    } as any as JobHandlerMetadataArgs;
  }

  function mockMetadataUtils() {
    MetadataUtils.getMetadataStorage().getMetadataArgs = jest
      .fn()
      .mockReturnValue(metadataArgs);
  }

  function mockHandlerManager() {
    const handlersStorage: JobHandler[] = [];
    manager = {
      handlers: handlersStorage,
      addHandlers: jest.fn().mockImplementation((...handlers) => {
        handlersStorage.push(...handlers);
      }),
      getHandlers: jest.fn().mockReturnValue(handlersStorage),
    } as any as DefaultJobHandlerManager;
  }

  function mockContainer() {
    container = {
      get: jest.fn().mockReturnValue(instance),
    };
  }
});
