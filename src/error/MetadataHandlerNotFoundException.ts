export class MetadataHandlerNotFoundException extends Error {
  constructor(target: any) {
    super(`Metadata handler not found for ${target}`);
  }
}
