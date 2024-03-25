import { JobHandlerMetadataArgs } from "../../src";
import { MetadataHandlerNotFoundException } from "../../src/error/MetadataHandlerNotFoundException";
import { MetadataBasedJobHandlerProxy } from "../../src/metadata/MetadataBasedJobHandlerProxy";

describe(MetadataBasedJobHandlerProxy, () => {
  class TargetClass {
    handle = jest.fn();
  }
  const target = new TargetClass();
  let metadata: JobHandlerMetadataArgs;
  let proxy: MetadataBasedJobHandlerProxy;
  beforeEach(() => {
    metadata = {
      target: TargetClass,
      cronExpression: "* * * * *",
      name: "test",
      token: "token",
      instantiateTarget: jest.fn().mockReturnValue(target),
      isClassType: jest.fn(),
    } as any as JobHandlerMetadataArgs;
  });

  describe("constructor", () => {
    it("should return a new instance of MetadataBasedJobHandlerProxy", () => {
      proxy = new MetadataBasedJobHandlerProxy(metadata);
      expect(proxy).toBeInstanceOf(MetadataBasedJobHandlerProxy);
    });

    it("should call metadata instantiateTarget", () => {
      proxy = new MetadataBasedJobHandlerProxy(metadata);
      expect(metadata.instantiateTarget).toHaveBeenCalled();
    });

    it("should throw an error if instantiateTarget return null", () => {
      metadata.instantiateTarget = jest.fn().mockReturnValue(null);
      try {
        proxy = new MetadataBasedJobHandlerProxy(metadata);
      } catch (e) {
        expect(e).toBeInstanceOf(MetadataHandlerNotFoundException);
      }
    });
  });

  describe("handle", () => {
    it("should call target handle", () => {
      proxy.handle();
      expect(target.handle).toHaveBeenCalled();
    });
  });
});
