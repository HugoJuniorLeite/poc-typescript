export type Auth = {
name?: string,
email: string,
password: string
}

export type Ids ={
    id?: number,
    bookId?: number
}

export type Header={
    authorization: string

}

export type Book={
    name: string,
    author: string
}
export type Error={
    name: string,
    message: string,
    email?: string
}