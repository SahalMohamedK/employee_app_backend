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

# TypeScript
### variable decleration and assignment
```TS
let var_1: datatype;
let var_2: datatype = <value>;
```
### array decleration and assignment
```TS
let var_1: datatype[];
let var_1: datatype[] = [];
```

### object
```TS
let obj: {
    key_1: datatype,
    key_2: datatype
} = {
    key_1: value_1,
    key_2: value_2
}
```

### enum
Enums allow a developer to define a set of named constants. 

```TS
let DIRS {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

console.log(DIRS.RIGHT) // 1
```

```TS
let DIRS {
    LEFT = 5,
    RIGHT,
    UP,
    DOWN
}

console.log(DIRS.RIGHT) // 6
```


```TS
let DIRS {
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down'
}

console.log(DIRS.RIGHT) // right
```

> Only string and number will be provided to the enum

### Function

Normal function
```TS
function add(a: number, b: number): number {
    return a+b
}
```

Arrow function
```TS
const add = (a: number, b: number): number => {
    return a+b;
}
```

### Class

# access modifier
```TS
class Employee {
    constructor (
        readonly name: string, 
        private age: number
    ){}

    getAge(): number{
        return this.age
    }
}

const e: Employee = new Employee("Sahal", 25)
console.log(e.getAge())
```
> readonly: readonly property

> private: only access in base class

> protected: only access in base class and inheritant class

> public: access from everywhere


### Interface
```TS
interface Person {
    name: string,
    age: number
}

const p: Person = {
    name: "Sahal",
    age: 25
}
```

### Type alias
```TS
type Car = {
    name: string,
    year: number
}

const c: Car = {
    name: 'zen',
    year: 2000
}
```

# REST API
