let token = null

const blogs = [
    {
        id: "5a451df7571c224a31b5c8ce",
        title: "HTML on helppoa",
        author: "Jaakko",
        likes: 2,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Jaakko",
            name: "Jaakko Jaakkola"
        }
    },
    {
        id: "5a451e21e0b8b04a45638211",
        title: "Javascript on helppoa",
        author: "Pekka",
        likes: 23,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Pekka",
            name: "Pekka Puu"
        }
    },
    {
        id: "5a451e30b5ffd44a58fa79ab",
        title: "Kaikki on helppoa",
        author: "Jaska",
        likes: 6,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Jaska",
            name: "Jaska Jaska"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }