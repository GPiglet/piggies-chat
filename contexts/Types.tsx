export type UserType = {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string
}

export type MessageType = {
  sender: string,
  receiver: string,
  message: string,
  createDate: Date
}