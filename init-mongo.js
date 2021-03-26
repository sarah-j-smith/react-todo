db.createUser(
    {
        user: "todo-app",
        pwd: "jtA3GH51bNNFdUHf",
        roles: [
            {
                role: "readWrite",
                db: "todo-db"
            }
        ]
    }
)