const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs-extra");

const path = require("path");

const app = express();

const PORT = 3000;

const folderPath = path.join(__dirname, "Text");

//check the file is available..?

if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath)
};

//function to remove the colon from filename

function getFormattedFileName(){
    return new Date().toISOString().replace(/:/g, "-");
}

//Endpoint to create a text file contains current-timestamp...

app.post("/createFile", async (req, res)=>{
    try {
        await fs.ensureDir(folderPath);
        const time = getFormattedFileName();
        const fileName = `${time}.txt`;
        const filePath = path.join(folderPath, fileName);
        await fs.writeFile(filePath, time);
        res.send("File Created Successfully...!")
    } catch (error) {
        res.status(500).send("Error writing a file -", error);
    }    
});

//Endpoint to retrieve all text files

app.get("/getFile", async (req, res)=>{
    try {
        await fs.ensureDir(folderPath);
        const files = await fs.readdir(folderPath);
        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.json(textFiles)
    } catch (error) {
        res.status(500).send("Error Reading a folder -", error);
    }
})

app.listen(PORT, () => {
console.log(`server is running on the port ${PORT}`);
});