export class RegisterNannyResponse {
    constructor(
      public id: number,
      public readonly name: string,
      public readonly createdAt: string,
      public readonly createdBy: number
    ) {}
  }