// crud operation on the user Data
import express from "express"
import { fileURLToPath } from "url"
import path from "path"
import fs from "fs"

const app = express()

// parser middleware
app.use(express.json())


// gives the absolute url of the current file path
const __filename = fileURLToPath(import.meta.url) 

// gives the absolute url of the current directory(folder)
const __dirname = path.dirname(__filename) 

// appending current folder path with the data file name
const DATA_PATH = path.join(__dirname, "MOCK_DATA.json") 


// Read JSON file
const readData = () => {
    const file = fs.readFileSync(DATA_PATH, "utf-8")
    if (!file) {
        throw Error("Users not found")
    }
    const data = JSON.parse(file)
    return data;
}

// Write Into JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data), (err) => {
        console.log("Error Occured while saving data: ", err)
    })
}

// Base end point
app.get("/", (req, res) => {
    res.send("Server Running fine!")
})

// GET /api/users
app.get("/api/users", (req, res) => {
    try {
        const data = readData()

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching users",
            error
        })
    }
})

//  GET /api/users/:id
app.get("/api/users/:id", (req, res) => {
    try {
        const data = readData();
        const { id } = req.params;

        const user = data.find(item => item.id == id);  

        if(!user || user.length === 0){
            res.status(200).json({
                success: true,
                message: `User with id ${id} not found`
            })
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching user",
            error
        })
    }
})

// POST /api/users
app.post("/api/users", (req, res) => {
    try {
        const { first_name, last_name, email, gender } = req.body;

        if(!first_name || !last_name || !email || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!!!"
            })
        }

        const data = readData();

        const user = {
            id: data[data.length - 1].id + 1,
            first_name,
            last_name,
            email,
            gender
        }

        data.push(user);

        writeData(data)

        return res.status(201).json({
            success: true,
            message: "Created Success",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating user",
            error
        })
    }
})

// DELETE /api/users/:id
app.delete("/api/users/:id", (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Id required!!!"
            })
        }

        const data = readData()

        const newData = data.filter(item => item.id != id);

        writeData(newData)

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting user",
            error
        })
    }
})

// PATCH /api/users/:id
app.patch("/api/users/:id", (req, res) => {
    try {
        const { id } = req.params
        const { first_name, last_name } = req.body;
        const data = readData()

        const users = data.map(item => {
            if (item.id != id) return item;
            if(first_name)
                item.first_name = first_name;
            if(last_name)
                item.last_name = last_name;

            return item;
        })

        writeData(users)

        return res.status(200).json({
            success: true,
            message: "User Updated Successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating user",
            error
        })
    }
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})