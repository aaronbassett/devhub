export class LinkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LinkError"
  }
}

export class ExternalLinkValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ExternalLinkValidationError"
  }
}

export class InternalLinkValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InternalLinkValidationError"
  }
}
