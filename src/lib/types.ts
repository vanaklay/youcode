export type User =
  | ({
      name?: string | null | undefined
      email?: string | null | undefined
      image?: string | null | undefined
    } & {
      id?: string | undefined
    })
  | undefined
