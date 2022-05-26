import { AuthStack } from "~consts/screens"

export type AuthNavigatorParams = {
  [AuthStack.Breeds]: undefined,
  [AuthStack.Details]: {
    breed: string
  }
}
