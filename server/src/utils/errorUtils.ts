export class NoTokenError extends Error {
  constructor(message: string) {
    if (message != '') {
      super(message)
    } else {
      super('Invalid Token')
    }
    super(message)
    this.name = 'NoTokenError'
  }
}

export class NoUserFoundError extends Error {
  constructor(message: string) {
    if (message != '') {
      super(message)
    } else {
      super('Unauthorized User')
    }
    this.name = 'NoUserError'
  }
}

export class NoPetFoundError extends Error {
  constructor(message: string) {
    if (message != '') {
      super(message)
    } else {
      super('No pet found')
    }
    this.name = 'NoPetFoundError'
  }
}

export class NoFoodLeftError extends Error {
  constructor(message: string) {
    if (message != '') {
      super(message)
    } else {
      super('No food left!')
    }
    this.name = 'NoFoodLeftError'
  }
}
