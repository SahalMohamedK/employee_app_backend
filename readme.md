# File System
### Read file (Async)
```JS
const fs = require('fs');

let path = "file_path"

fs.readFile(path, (err, content) => {
    if(err){
        console.log("Reading error!");
    }else{
        console.log(content.toString());
    }
})
```
### Read file (Sync)
```JS
const fs = require('fs');

let path = "file_path"
try{
    let data = fs.readFileSync(path)
    console.log(data.toString())
}catch(err){
    console.log("Read error!")
}
```

### Write file (Async)
```JS
const fs = require('fs');

let path = "file_path"
let content = "hello world"

fs.writeFile(path, content, err => {
    if (err) {
        console.log("Write error!")
    }
})

```

# Version
### x.y.z
* x: major version
* y: minor version
* z: patch 

### ^x.y.z and ~x.y.z
* ^ : minor version supports
* ~ : only patch support