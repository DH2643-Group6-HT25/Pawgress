export interface BasicResponse {
  content: object
  error?: string | null
  status: number
}

export interface ErrorResponse {
  content?: object | null
  error: string
  status: number
}
